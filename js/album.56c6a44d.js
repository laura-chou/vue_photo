(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["album"],{"057f":function(t,e,n){var r=n("fc6a"),i=n("241c").f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return i(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?c(t):i(r(t))}},"1dde":function(t,e,n){var r=n("d039"),i=n("b622"),o=n("2d00"),a=i("species");t.exports=function(t){return o>=51||!r((function(){var e=[],n=e.constructor={};return n[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},2532:function(t,e,n){"use strict";var r=n("23e7"),i=n("5a34"),o=n("1d80"),a=n("ab13");r({target:"String",proto:!0,forced:!a("includes")},{includes:function(t){return!!~String(o(this)).indexOf(i(t),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(t,e,n){var r=n("861d"),i=n("c6b6"),o=n("b622"),a=o("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==i(t))}},"5a34":function(t,e,n){var r=n("44e7");t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},"65f0":function(t,e,n){var r=n("861d"),i=n("e8b5"),o=n("b622"),a=o("species");t.exports=function(t,e){var n;return i(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?r(n)&&(n=n[a],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"746f":function(t,e,n){var r=n("428f"),i=n("5135"),o=n("e538"),a=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||a(e,t,{value:o.f(t)})}},8418:function(t,e,n){"use strict";var r=n("c04e"),i=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var a=r(e);a in t?i.f(t,a,o(0,n)):t[a]=n}},a434:function(t,e,n){"use strict";var r=n("23e7"),i=n("23cb"),o=n("a691"),a=n("50c4"),c=n("7b0b"),s=n("65f0"),u=n("8418"),f=n("1dde"),l=n("ae40"),d=f("splice"),p=l("splice",{ACCESSORS:!0,0:0,1:2}),b=Math.max,h=Math.min,v=9007199254740991,m="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!d||!p},{splice:function(t,e){var n,r,f,l,d,p,g=c(this),y=a(g.length),_=i(t,y),S=arguments.length;if(0===S?n=r=0:1===S?(n=0,r=y-_):(n=S-2,r=h(b(o(e),0),y-_)),y+n-r>v)throw TypeError(m);for(f=s(g,r),l=0;l<r;l++)d=_+l,d in g&&u(f,l,g[d]);if(f.length=r,n<r){for(l=_;l<y-r;l++)d=l+r,p=l+n,d in g?g[p]=g[d]:delete g[p];for(l=y;l>y-r+n;l--)delete g[l-1]}else if(n>r)for(l=y-r;l>_;l--)d=l+r-1,p=l+n-1,d in g?g[p]=g[d]:delete g[p];for(l=0;l<n;l++)g[l+_]=arguments[l+2];return g.length=y-r+n,f}})},a4d3:function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),o=n("d066"),a=n("c430"),c=n("83ab"),s=n("4930"),u=n("fdbf"),f=n("d039"),l=n("5135"),d=n("e8b5"),p=n("861d"),b=n("825a"),h=n("7b0b"),v=n("fc6a"),m=n("c04e"),g=n("5c6c"),y=n("7c73"),_=n("df75"),S=n("241c"),w=n("057f"),x=n("7418"),O=n("06cf"),E=n("9bf2"),A=n("d1e7"),P=n("9112"),j=n("6eeb"),N=n("5692"),U=n("f772"),R=n("d012"),k=n("90e3"),C=n("b622"),L=n("e538"),V=n("746f"),D=n("d44e"),B=n("69f3"),I=n("b727").forEach,T=U("hidden"),F="Symbol",$="prototype",J=C("toPrimitive"),M=B.set,z=B.getterFor(F),q=Object[$],Q=i.Symbol,W=o("JSON","stringify"),G=O.f,H=E.f,K=w.f,X=A.f,Y=N("symbols"),Z=N("op-symbols"),tt=N("string-to-symbol-registry"),et=N("symbol-to-string-registry"),nt=N("wks"),rt=i.QObject,it=!rt||!rt[$]||!rt[$].findChild,ot=c&&f((function(){return 7!=y(H({},"a",{get:function(){return H(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=G(q,e);r&&delete q[e],H(t,e,n),r&&t!==q&&H(q,e,r)}:H,at=function(t,e){var n=Y[t]=y(Q[$]);return M(n,{type:F,tag:t,description:e}),c||(n.description=e),n},ct=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof Q},st=function(t,e,n){t===q&&st(Z,e,n),b(t);var r=m(e,!0);return b(n),l(Y,r)?(n.enumerable?(l(t,T)&&t[T][r]&&(t[T][r]=!1),n=y(n,{enumerable:g(0,!1)})):(l(t,T)||H(t,T,g(1,{})),t[T][r]=!0),ot(t,r,n)):H(t,r,n)},ut=function(t,e){b(t);var n=v(e),r=_(n).concat(bt(n));return I(r,(function(e){c&&!lt.call(n,e)||st(t,e,n[e])})),t},ft=function(t,e){return void 0===e?y(t):ut(y(t),e)},lt=function(t){var e=m(t,!0),n=X.call(this,e);return!(this===q&&l(Y,e)&&!l(Z,e))&&(!(n||!l(this,e)||!l(Y,e)||l(this,T)&&this[T][e])||n)},dt=function(t,e){var n=v(t),r=m(e,!0);if(n!==q||!l(Y,r)||l(Z,r)){var i=G(n,r);return!i||!l(Y,r)||l(n,T)&&n[T][r]||(i.enumerable=!0),i}},pt=function(t){var e=K(v(t)),n=[];return I(e,(function(t){l(Y,t)||l(R,t)||n.push(t)})),n},bt=function(t){var e=t===q,n=K(e?Z:v(t)),r=[];return I(n,(function(t){!l(Y,t)||e&&!l(q,t)||r.push(Y[t])})),r};if(s||(Q=function(){if(this instanceof Q)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=k(t),n=function(t){this===q&&n.call(Z,t),l(this,T)&&l(this[T],e)&&(this[T][e]=!1),ot(this,e,g(1,t))};return c&&it&&ot(q,e,{configurable:!0,set:n}),at(e,t)},j(Q[$],"toString",(function(){return z(this).tag})),j(Q,"withoutSetter",(function(t){return at(k(t),t)})),A.f=lt,E.f=st,O.f=dt,S.f=w.f=pt,x.f=bt,L.f=function(t){return at(C(t),t)},c&&(H(Q[$],"description",{configurable:!0,get:function(){return z(this).description}}),a||j(q,"propertyIsEnumerable",lt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:Q}),I(_(nt),(function(t){V(t)})),r({target:F,stat:!0,forced:!s},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var n=Q(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!s,sham:!c},{create:ft,defineProperty:st,defineProperties:ut,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:pt,getOwnPropertySymbols:bt}),r({target:"Object",stat:!0,forced:f((function(){x.f(1)}))},{getOwnPropertySymbols:function(t){return x.f(h(t))}}),W){var ht=!s||f((function(){var t=Q();return"[null]"!=W([t])||"{}"!=W({a:t})||"{}"!=W(Object(t))}));r({target:"JSON",stat:!0,forced:ht},{stringify:function(t,e,n){var r,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(r=e,(p(e)||void 0!==t)&&!ct(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ct(e))return e}),i[1]=e,W.apply(null,i)}})}Q[$][J]||P(Q[$],J,Q[$].valueOf),D(Q,F),R[T]=!0},ab13:function(t,e,n){var r=n("b622"),i=r("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[i]=!1,"/./"[t](e)}catch(r){}}return!1}},ae40:function(t,e,n){var r=n("83ab"),i=n("d039"),o=n("5135"),a=Object.defineProperty,c={},s=function(t){throw t};t.exports=function(t,e){if(o(c,t))return c[t];e||(e={});var n=[][t],u=!!o(e,"ACCESSORS")&&e.ACCESSORS,f=o(e,0)?e[0]:s,l=o(e,1)?e[1]:void 0;return c[t]=!!n&&!i((function(){if(u&&!r)return!0;var t={length:-1};u?a(t,1,{enumerable:!0,get:s}):t[1]=1,n.call(t,f,l)}))}},b727:function(t,e,n){var r=n("0366"),i=n("44ad"),o=n("7b0b"),a=n("50c4"),c=n("65f0"),s=[].push,u=function(t){var e=1==t,n=2==t,u=3==t,f=4==t,l=6==t,d=5==t||l;return function(p,b,h,v){for(var m,g,y=o(p),_=i(y),S=r(b,h,3),w=a(_.length),x=0,O=v||c,E=e?O(p,w):n?O(p,0):void 0;w>x;x++)if((d||x in _)&&(m=_[x],g=S(m,x,y),t))if(e)E[x]=g;else if(g)switch(t){case 3:return!0;case 5:return m;case 6:return x;case 2:s.call(E,m)}else if(f)return!1;return l?-1:u||f?f:E}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},caad:function(t,e,n){"use strict";var r=n("23e7"),i=n("4d64").includes,o=n("44d2"),a=n("ae40"),c=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!c},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),o("includes")},d81d:function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").map,o=n("1dde"),a=n("ae40"),c=o("map"),s=a("map");r({target:"Array",proto:!0,forced:!c||!s},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},e01a:function(t,e,n){"use strict";var r=n("23e7"),i=n("83ab"),o=n("da84"),a=n("5135"),c=n("861d"),s=n("9bf2").f,u=n("e893"),f=o.Symbol;if(i&&"function"==typeof f&&(!("description"in f.prototype)||void 0!==f().description)){var l={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new f(t):void 0===t?f():f(t);return""===t&&(l[e]=!0),e};u(d,f);var p=d.prototype=f.prototype;p.constructor=d;var b=p.toString,h="Symbol(test)"==String(f("test")),v=/^Symbol\((.*)\)[^)]+$/;s(p,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=b.call(t);if(a(l,t))return"";var n=h?e.slice(7,-1):e.replace(v,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:d})}},e538:function(t,e,n){var r=n("b622");e.f=r},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},ee18:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"album"}},[n("h1",{staticClass:"text-center"},[t._v("我的相簿")]),n("hr"),n("h2",[t._v("檔案上傳")]),n("br"),n("b-form",{on:{submit:t.submit}},[n("b-form-file",{attrs:{state:t.state,placeholder:"選擇檔案或拖曳至此","drop-placeholder":"將檔案拖曳至此",required:"","browse-text":"瀏覽",accept:"image/*"},on:{input:t.validateFile},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}}),n("p",{staticClass:"text-danger"},[t._v("僅支援 1MB 以下的圖片")]),n("b-form-textarea",{attrs:{placeholder:"相片說明",rows:"3","max-rows":"6",maxlength:"200",state:t.textstate},on:{input:t.validateText},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}}),n("br"),n("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("上傳")])],1),n("hr"),n("Photoswipe",[n("b-row",t._l(t.images,(function(e,r){return n("b-col",{key:r,attrs:{cols:"12",md:"6",lg:"3"}},[n("b-card",[n("b-card-img",{directives:[{name:"pswp",rawName:"v-pswp",value:e,expression:"image"}],attrs:{src:e.src}}),n("b-card-body",[t._v(t._s(e.title)),n("br"),e.edit?n("b-btn",{attrs:{variant:"danger"},on:{click:function(n){return t.cancel(e)}}},[t._v("取消")]):n("b-btn",{attrs:{variant:"success"},on:{click:function(n){return t.edit(e)}}},[t._v("編輯")]),e.edit?n("b-btn",{attrs:{variant:"success"},on:{click:function(n){return t.update(e)}}},[t._v("更新")]):n("b-btn",{attrs:{variant:"danger"},on:{click:function(n){return t.del(e,r)}}},[t._v("刪除")]),n("hr"),e.edit?n("b-form-textarea",{model:{value:e.model,callback:function(n){t.$set(e,"model",n)},expression:"image.model"}}):n("pre",[t._v(t._s(e.title))])],1)],1)],1)})),1)],1)],1)},i=[],o=(n("a4d3"),n("e01a"),n("caad"),n("d81d"),n("a434"),n("b0c0"),n("2532"),{name:"album",data:function(){return{file:null,description:"",state:null,textstate:null,images:[]}},computed:{user:function(){return this.$store.getters.user}},methods:{validateFile:function(){null!=this.file&&(this.file.size>=1048576||!this.file.type.includes("image")?(this.state=!1,this.file=null):this.state=!0)},validateText:function(){this.description.length>200?this.textstate=!1:this.textstate=!0},submit:function(t){var e=this;if(t.preventDefault(),null===this.file||this.file.size>=1048576||!this.file.type.includes("image"))alert("檔案格式不符");else{var n=new FormData;n.append("image",this.file),n.append("description",this.description),this.axios.post(Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_APIURL+"/file",n,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){e.images.push({title:e.description,src:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_APIURL+"/file/"+t.data.name,_id:t.data._id,edit:!1,model:t.data.name}),e.file=null,e.description=""})).catch((function(t){alert(t.response.data.message)}))}},edit:function(t){t.edit=!0,t.model=t.title},update:function(t){this.axios.patch(Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_APIURL+"/file/"+t._id,{description:t.model}).then((function(e){t.edit=!1,t.title=t.model})).catch((function(){alert("發生錯誤")}))},cancel:function(t){t.edit=!1,t.model=t.title},del:function(t,e){var n=this;this.axios.delete(Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_APIURL+"/file/"+t._id).then((function(t){n.images.splice(e,1)})).catch((function(){alert("發生錯誤")}))}},mounted:function(){var t=this;this.axios.get(Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_APIURL+"/album/"+this.user).then((function(e){t.images=e.data.result.map((function(t){return{title:t.description,src:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_APIURL+"/file/"+t.name,_id:t._id,edit:!1,model:t.name}}))})).catch((function(){alert("發生錯誤")}))}}),a=o,c=n("2877"),s=Object(c["a"])(a,r,i,!1,null,null,null);e["default"]=s.exports}}]);
//# sourceMappingURL=album.56c6a44d.js.map