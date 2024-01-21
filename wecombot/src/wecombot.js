const crypto = require('crypto')
const cloud = require('wx-server-sdk')
const axios = require('axios').default
const BASE_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send'
let instance = null

class Base {
  static getInstance(...args){
    if(!instance){
      instance = new this(...args)
    }
    return instance
  }

  async downloadByCloudId(fileID){
    const res = await cloud.downloadFile({
      fileID: fileID,
    })
    const buffer = res.fileContent
    return {
      buffer,
      base64: buffer.toString('base64'),
      md5: crypto.createHash('md5').update(buffer).digest('hex')
    }
  }

  getTime(){
    const time = new Date(new Date().getTime()+28800000)
    const y = time.getUTCFullYear()
    const M = (time.getUTCMonth()+1).toString().padStart(2,0)
    const d = time.getUTCDate().toString().padStart(2,0)
    const h = time.getUTCHours().toString().padStart(2,0)
    const m = time.getUTCMinutes().toString().padStart(2,0)
    const s = time.getUTCSeconds().toString().padStart(2,0)
    return `${y}-${M}-${d} ${h}:${m}:${s}`
  }
}

class Wecombot extends Base {
  _webhookUrl = ''
  constructor(options){
    super()
    const { webhook, key } = options || {}
    if(!webhook && !key){
      this._webhookUrl = process.env['WECOMBOT_WEBHOOK_URL']
      if(!this._webhookUrl){
        throw Error('必须配置 webhook 信息')
      }
    }else{
      if(webhook){
        // 兼容传递 key 给 webhook 的场景
        if(webhook.length === 36){
          this._webhookUrl = `${BASE_URL}?key=${webhook}`
        }else{
          this._webhookUrl = webhook
        }
      }else{
        this._webhookUrl = `${BASE_URL}?key=${key}`
      }
    }
  }

  get send(){
    return this.sendTextNotice
  }

  get sendImage(){
    return this.sendImageNotice
  }

  async sendTextNotice(msg, options){
    let toAll = false
    let removePreset = false
    if(typeof options === 'boolean'){
      toAll = options
    }else if(typeof options === 'object'){
      toAll = options.toAll
      removePreset = options.removePreset
    }
    const time = this.getTime()
    const data = {
      msgtype: 'text',
      text: {
        mentioned_list: [],
        content: removePreset ? msg : (`时间: ${time}\n` + msg)
      }
    }
    if(toAll){
      data.text.mentioned_list.push('@all')
    }
    return this._sendWecomBotMsg(data)
  }

  async sendImageNotice(image){
    const data = {
      msgtype: 'image',
      image: {
        base64: image.base64,
        md5: image.md5
      }
    }
    return this._sendWecomBotMsg(data)
  }
  
  async _sendWecomBotMsg(params){
    const resp = { code:1 }
    try {
      const request_data = {
        ...params
      }
      const {data} = await axios.post(this._webhookUrl, request_data)
      if(data && data.errcode === 0){
        resp.code = 0
      }
      resp.data = data
    } catch (error) {
      console.log('bot err:', error);
      resp.data = error.message
    }
    return resp
  }
}

module.exports = Wecombot