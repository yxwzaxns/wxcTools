const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env.test') })
const wxctools = require('../index')

const wecombot = new wxctools.combot({webhook:process.env.WECOM_BOT_URL})
wecombot.sendTextNotice('hello')