const cloudRemoteInvoke = require('./remoteInvoke')
const cloudDatabase = require('./cdb')
module.exports = {
    CloudFunctionInvoke: cloudRemoteInvoke,
    CloudDatabase: cloudDatabase
}