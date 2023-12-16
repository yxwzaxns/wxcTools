# 微信云开发 SDK

## Install
```
npm i wx-cloud-sdk
```

## Usage
### 1. 云函数调用
```js
const { remoteInvoke } = require('wx-cloud-sdk')
remoteInvoke.getInstance({
    appId: '',
    appSecret: '',
    env: '',
    funcName: ''
}).invoke({

})
```

### 2. 云数据库调用
```js
const { Database, _ } = require('wx-cloud-sdk/cdb')
const db = new Database({ table: 'test' })
const res = db.queryOne({ value: _.eq(10) })

```