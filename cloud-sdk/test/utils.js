const axios = require('axios').default
const utils = require('uni-utils')
const cloud = require('wx-server-sdk')

exports.loadDevEnv = async function () {
    const config = {
        csUrl: process.env['CS_URL'],
        csToken: process.env['CS_TOKEN'],
        appEnv: process.env['APP_ENV'],
        appToken: process.env['APP_TOKEN'],
        csKey: process.env['CS_KEY']
    }
    const timeStamp = utils.getTimeStamp()
    const {data:{data:envList}} = await axios.post(
        `https://${config.csUrl}/dev/env`,
        {
            keyId: config.csKey,
            token: config.appToken,
            env: config.appEnv
        },
        {
            headers: {
                'token': utils.hash.sha1(`${config.csToken}-u-${timeStamp}`) + ':' + timeStamp
            }
        },
    )

    if (!envList) throw Error('load env error')

    for (const key in envList) {
        process.env[key] = envList[key]
    }

    cloud.init({
        env: config.appEnv
    })
}