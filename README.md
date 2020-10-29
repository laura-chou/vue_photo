# 線上相簿 Online Photo Album API
## 登入前
### 資料欄位
- `account` 帳號
- `password` 密碼
### 登入
- 請求方式為 **POST**
- 路徑為 `/login`
- 只接受 `application/json` 格式
  ```js
  {
    "account": "",
    "password": "",
  }
  ```
  - 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### 登出
- 請求方式為 **DELETE**
- 路徑為 `/logout`
- 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### 註冊
- 請求方式為 **POST**
- 路徑為 `/users`
- 只接受 `application/json` 格式
  ```js
  {
    "account": "",
    "password": "",
    "verify": ""
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### svg圖形驗證
- 請求方式為 **GET**
- 路徑為 `/captcha`
- 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
    {
      "success": true,
      "svg": ""
    }
  ```
## 登入後
### 資料欄位
- `user` 使用者帳號
- `file` 檔案庫
  - `name` 資料夾名稱
  - `image` 相片庫
    - `name` 相片名稱
    - `description` 相片說明
### 查詢
- 請求方式為 **GET**
- 路徑為 `/album`，以 user account 判斷要查詢的項目
- 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": [
      "_id": "",
      "user": "",
      "file": [
        {
          "name": "",
          "image": [
            {
             "_id": "",
             "name": "",
             "description" : ""
            },
            // other image
          ]
        },
        // other file
      ]
    ]
  }
  ```
### 修改
- 請求方式為 **PATCH**
- 路徑為 `/file`，以 ID 判斷要修改的項目
### 新增資料夾
- 只接受 `application/json` 格式
- `filename` 資料夾名稱
  ```js
  {
    "do": "addfolder",
    "filename": ""
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### 刪除資料夾
- 只接受 `application/json` 格式
- `fileindex` 要刪除的資料夾 index
  ```js
  {
    "do": "delfolder",
    "fileindex": [Number]
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### 刪除相片
- 只接受 `application/json` 格式
- `fileindex` 目前資料夾 index，`imageindex` 要刪除的相片index
  ```js
  {
    "do": "delimage",
    "fileindex": [Number],
    "imageindex": Number
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### 修改相片說明
- 只接受 `application/json` 格式
- `fileindex` 目前資料夾 index，`imageindex` 要編輯的相片index，`description` 相片說明
  ```js
  {
    "do": "editimage",
    "fileindex": [Number],
    "imageindex": Number,
    "description": ""
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### 新增相片
- 只接受 `multipart/form-data` 格式
- `iamge` 是上傳的相片名稱，`description` 是相片說明，`filename` 資料夾名稱
```js
  "image": "",
  "description": "",
  "filename": ""
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
        "_id": "",
        "name": "",
        "description": ""
    }
  }
  ```