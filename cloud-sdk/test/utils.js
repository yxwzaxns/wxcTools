const { Ktcs } = require('ktcs')
const cloud = require('wx-server-sdk')

exports.loadDevEnv = async function () {
    const ktcs = new Ktcs()
    ktcs.setConfig({
        url: process.env['CS_URL'],
        token: process.env['CS_TOKEN']
    })
    const envList = await ktcs.getWxCfEnv(
        process.env['CS_KEY'],
        process.env['APP_ENV'],
        process.env['APP_TOKEN'],
        'cloud-sdk dev test')

    if (!envList) throw Error('load env error')

    for (const key in envList) {
        process.env[key] = envList[key]
    }

    cloud.init({
        env: process.env['APP_ENV']
    })
}