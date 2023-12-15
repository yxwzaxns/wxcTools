const axios = require('axios').default

const GET_AT_URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=#&secret=#`
const INVOKE_URL = 'https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=#&env=#&name=#'
let instance = null
let defaultInstance = null

class RemoteInvoke {
    constructor({appId,appSecret,env,funcName}={}){
        this.config = {
            appId,
            appSecret,
            env,
            funcName
        }
    }
    static getInstance(...args){
        if(!instance){
            instance = new this(...args)
        }
        return instance
    }
    
    static getDefaultInstance(){
        if(!defaultInstance){
            defaultInstance = new this()
        }
        return defaultInstance
    }

    _checkConfig(){
        if(Object.entries(this.config).filter(e=>!e[1]).length) throw Error('参数错误')
    }

    _setConfig(config){
        this.config = Object.assign(this.config, config)
    }
    
    async invoke(params={},options={}){
        this._setConfig(options)
        this._checkConfig()
        const getATUrl = GET_AT_URL.replace('#',this.config.appId)
                                .replace('#',this.config.appSecret)
        const {data:{access_token}} = await axios.get(getATUrl)
        const getInvokeUrl = INVOKE_URL.replace('#',access_token)
                                    .replace('#',this.config.env)
                                    .replace('#',this.config.funcName)
        const resp = await axios.post(getInvokeUrl,params)
        if(!resp.data.resp_data) throw Error(resp.data.err.msg)
        const remoteRes = JSON.parse(resp.data.resp_data)
        return remoteRes
    }
 
}

module.exports = RemoteInvoke

exports.default = RemoteInvoke.getDefaultInstance()