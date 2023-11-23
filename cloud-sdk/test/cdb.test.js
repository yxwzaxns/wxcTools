require('dotenv').config()
const utils = require('./utils')

;(async () => {
    await utils.loadDevEnv()
    const { _, DataBase } = require('../cdb')
    const cdb = new DataBase()
    await cdb.use('test').queryOne({
        v: _.all(['2'])
    }).then(console.log)
})()