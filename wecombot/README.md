# 企业微信机器人 SDK

## install
npm i wecombot

## usage
```js
const Wecombot = require('wecombot')
// 1. use origin webhook url
const wecombot = new Wecombot({webhook: 'bot webhook url'})
// 2. use key (UUID 4 format)
const wecombot = new Wecombot({key: 'bot key'})
// 3. use env value 
// WECOMBOT_WEBHOOK_URL=origin-webhook-url
const wecombot = new Wecombot()

wecombot.send('msg test')

wecombot.sendImage({
    base64: 'image content base64',
    md5: 'image file md5'
})
```

## options

```js
/**
 * @removePreset boolean 移除预置的时间头信息
 * @toAll boolean @所有人
 */
```



