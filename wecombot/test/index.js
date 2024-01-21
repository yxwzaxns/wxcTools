require('dotenv').config()
const WecomBot = require('../')

WecomBot.getInstance({
    key: process.env['WECOM_BOT_KEY']
}).send('test').then(console.log)

WecomBot.getInstance({
    key: process.env['WECOM_BOT_KEY']
}).send('toAll',{removePreset:true, toAll:true}).then(console.log)

const testImage = {
    base64: `iVBORw0KGgoAAAANSUhEUgAAADUAAAApCAIAAAAakPbHAAABSGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf87AzcDFIMCgyiCdmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsgsprcvk+u0pzx68Mb+6JJvX79gqkcBXCmpxclA+g8QpyUXFJUwMDCmANnK5SUFIHYHkC1SBHQUkD0HxE6HsDeA2EkQ9hGwmpAgZyD7BpAtkJyRCDSD8QWQrZOEJJ6OxIbaCwI8Lq4+PgqhRqaGFi4EnEs6KEmtKAHRzvkFlUWZ6RklCo7AUEpV8MxL1tNRMDIwMmZgAIU5RPXnIHBYMortQ4jlL2FgsPjGwMA8ESGWNIWBYXsbA4PELYSYyjwGBv4WBoZthwoSixLhDmD8xlKcZmwEYfPYMzCw3v3//7MGAwP7RAaGvxP///+9+P//v4uB5t9mYDhQCQCH92NsUUHQXAAAAGxlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAABIAAAAAQAAAEgAAAABAAKgAgAEAAAAAQAAADWgAwAEAAAAAQAAACkAAAAAMVqhjAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAFxJREFUWAnt0rENACAMBLHA/jMjhrgmhelfisydN6vfXX3djPvaB/Hj1wTaWn/8mkBb649fE2hr/fFrAm2tP35NoK31x68JtLX++DWBttYfvybQ1vrj1wTaent/H6G1AVDsLcV7AAAAAElFTkSuQmCC`,
    md5: '72c4c96eade303d5c8ac8a333f7a38b6'
}

WecomBot.getInstance({
    key: process.env['WECOM_BOT_KEY']
}).sendImageNotice(testImage).then(console.log)