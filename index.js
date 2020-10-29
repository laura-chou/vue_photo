import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import multer from 'multer'
import md5 from 'md5'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import FTPStorage from 'multer-ftp'
import svgCaptcha from 'svg-captcha'

import db from './db.js'

dotenv.config()

const MongoStore = connectMongo(session)

const app = express()
app.use(bodyParser.json())
app.use(cors({
  origin (origin, callback) {
    // 直接開網頁，不是 ajax 時，origin 是 undefined
    if (origin === undefined) {
      // 沒有允許圖片會撈不到
      callback(null, true)
    } else {
      if (process.env.ALLOW_CORS === 'true') {
        // 開發環境，允許
        callback(null, true)
      } else if (origin.includes('github')) {
        // 非開發環境，但是從 github 過來，允許
        callback(null, true)
      } else {
        // 不是開發也不是從 github 過來，拒絕
        callback(new Error('Not allowed'), false)
      }
    }
  },
  credentials: true
}))

const sess = {
  secret: 'album',
  // 將 session 存入 mongodb
  store: new MongoStore({
    // 使用 mongoose 的資料庫連接
    mongooseConnection: db.connection,
    // 設定存入的 collection
    collection: process.env.COLLECTION_SESSION
  }),
  // session 有效期間
  cookie: {
    sameSite: 'none',
    secure: true,
    // 1000 毫秒 = 一秒鐘
    // 1000 毫秒 * 60 = 一分鐘
    // 1000 毫秒 * 60 * 30 = 三十分鐘
    maxAge: 1000 * 60 * 30
  },
  // 是否保存未修改的 session
  saveUninitialized: false,
  // 是否每次重設過期時間
  rolling: true,
  resave: false
}
app.set('trust proxy', 1)
app.use(session(sess))

let storage
if (process.env.FTP === 'false') {
  // 開發環境將上傳檔案放本機
  storage = multer.diskStorage({
    destination (req, file, cb) {
      cb(null, 'images/')
    },
    filename (req, file, cb) {
      cb(null, 'vuephoto' + Date.now() + path.extname(file.originalname))
    }
  })
} else {
  // heroku 將上傳檔案放伺服器
  storage = new FTPStorage({
    // 上傳伺服器的路徑
    basepath: '/',
    // FTP 設定
    ftp: {
      host: process.env.FTP_HOST,
      secure: false,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD
    },
    destination (req, file, options, cb) {
      cb(null, options.basepath + 'vuephoto' + Date.now() + path.extname(file.originalname))
    }
  })
}

const upload = multer({
  storage,
  fileFilter (req, file, cb) {
    if (!file.mimetype.includes('image')) {
      // 觸發 multer 錯誤，不接受檔案
      // LIMIT_FORMAT 是自訂的錯誤 CODE，跟內建的錯誤 CODE 格式統一
      cb(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      cb(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

app.listen(process.env.PORT, () => {
  console.log('已啟動')
})
/* ---------------- register ----------------- */
app.post('/users', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  } else if (req.session.captcha !== req.body.verify) {
    res.status(400)
    res.send({ success: false, message: '驗證碼錯誤' })
    return
  }
  try {
    await db.users.create({
      account: req.body.account,
      password: md5(req.body.password)
    })
    await db.files.create(
      {
        user: req.body.account,
        file: []
      }
    )
    res.status(200)
    res.send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
/* ---------------- login ----------------- */
app.post('/login', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.users.find(
      {
        account: req.body.account,
        password: md5(req.body.password)
      }
    )
    if (result.length > 0) {
      req.session.user = result[0].account
      res.status(200)
      res.send({ success: true, message: '' })
    } else {
      res.status(404)
      res.send({ success: false, message: '帳號或密碼錯誤' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
/* ---------------- logout ----------------- */
app.delete('/logout', async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200)
      res.send({ success: true, message: '' })
    }
  })
})

/* ---------------- verify ----------------- */
app.get('/captcha', function (req, res) {
  const captcha = svgCaptcha.create({
    size: 4, // 驗證碼長度
    ignoreChars: 'o01il', // 忽略字符
    color: true, // 驗證碼的字符是否有顏色
    background: '#fff', // 驗證碼圖片背景顏色
    noise: 2 // 干擾線數量
    // width: 150, // 圖片寬
    // height: 50 // 圖片長
  })
  req.session.captcha = captcha.text
  res.type('svg')
  res.status(200)
  res.send({ success: true, svg: captcha.data })
})

/* ---------------- heartbeat ----------------- */
app.get('/heartbeat', async (req, res) => {
  let islogin = false
  if (req.session.user !== undefined) {
    islogin = true
  }
  res.status(200)
  res.send(islogin)
  // res.send(req.session.user !== undefined)
})

/* ---------------------- 讀取相片 --------------------- */
app.get('/file/:name', async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401)
    res.send({ success: false, message: '未登入' })
    return
  }
  if (process.env.FTP === 'false') {
    const path = process.cwd() + '/images/' + req.params.name
    const exists = fs.existsSync(path)
    if (exists) {
      res.status(200)
      res.sendFile(path)
    } else {
      res.status(404)
      res.send({ success: false, message: '找不到圖片' })
    }
  } else {
    res.redirect('http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.name)
  }
})
/* ---------------------- 查詢 --------------------- */
app.get('/album/:user', async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401)
    res.send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user !== req.params.user) {
    res.status(403)
    res.send({ success: false, message: '無權限' })
    return
  }

  try {
    const result = await db.files.find({ user: req.params.user })
    res.status(200)
    res.send({ success: true, message: '', result: result[0] })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '伺服器錯誤' })
  }
})
/* ---------------------- 修改 --------------------- */
app.patch('/file/:id', async (req, res) => {
  if (JSON.stringify(req.body) === '{}') {
    if (!req.headers['content-type'].includes('multipart/form-data')) {
      res.status(400)
      res.send({ success: false, message: '格式不符' })
      return
    }
    upload.single('image')(req, res, async error => {
      if (error instanceof multer.MulterError) {
        // 上傳錯誤
        let message = ''
        if (error.code === 'LIMIT_FILE_SIZE') {
          message = '檔案太大'
        } else {
          message = '格式不符'
        }
        res.status(400)
        res.send({ success: false, message })
      } else if (error) {
        res.status(500)
        res.send({ success: false, message: '伺服器錯誤' })
      } else {
        try {
          // 檢查相片擁有者是不是本人
          let result = await db.files.findById(req.params.id)
          if (result.user !== req.session.user) {
            res.status(403)
            res.send({ success: false, message: '無權限' })
            return
          }
          let name = ''
          if (process.env.FTP === 'true') {
            name = path.basename(req.file.path)
          } else {
            name = req.file.filename
          }
          let index = 0
          for (const i in result.file) {
            if (result.file[i].name === req.body.filename) {
              result.file[i].image.push({
                name: name,
                description: req.body.description
              })
              index = i
            }
          }
          result = await db.files.findByIdAndUpdate(req.params.id, { file: result.file }, { new: true })
          res.status(200)
          res.send({ success: true, message: '', result: result.file[index].image.pop() })
        } catch (error) {
          if (error.name === 'ValidationError') {
            // 資料格式錯誤
            const key = Object.keys(error.errors)[0]
            const message = error.errors[key].message
            res.status(400)
            res.send({ success: false, message })
          } else {
            console.log(error)
            // 伺服器錯誤
            res.status(500)
            res.send({ success: false, message: '伺服器錯誤' })
          }
        }
      }
    })
  } else {
    if (!req.headers['content-type'].includes('application/json')) {
      res.status(400)
      res.send({ success: false, message: '格式不符' })
      return
    }
    // 沒有登入
    if (!req.session.user) {
      res.status(401)
      res.send({ success: false, message: '無權限' })
      return
    }
    try {
      // 檢查相片擁有者是不是本人
      let result = await db.files.findById(req.params.id)
      if (result.user !== req.session.user) {
        res.status(403)
        res.send({ success: false, message: '無權限' })
        return
      }
      if (req.body.do === 'addfolder') {
        result.file.push({
          name: req.body.filename,
          image: []
        })
      } else if (req.body.do === 'delfolder') {
        for (const i of req.body.fileindex.reverse()) {
          result.file.splice(i, 1)
        }
      } else if (req.body.do === 'delimage') {
        result.file[req.body.fileindex].image.splice(req.body.imageindex, 1)
      } else {
        result.file[req.body.fileindex].image[req.body.imageindex].description = req.body.description
      }
      result = await db.files.findByIdAndUpdate(req.params.id, { file: result.file }, { new: true })
      res.status(200)
      res.send({ success: true, message: '' })
    } catch (error) {
      if (error.name === 'CastError') {
        // ID 格式不是 MongoDB 的格式
        res.status(400)
        res.send({ success: false, message: 'ID 格式錯誤' })
      } else if (error.name === 'ValidationError') {
        // 資料格式錯誤
        const key = Object.keys(error.errors)[0]
        const message = error.errors[key].message
        res.status(400)
        res.send({ success: false, message })
      } else {
        // 伺服器錯誤
        res.status(500)
        res.send({ success: false, message: '伺服器錯誤' })
      }
    }
  }
})