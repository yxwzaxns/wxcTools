type Res = {
    code: number
    data: unknown
}

type TextNoticeOptions = {
    toAll: boolean
    removePreset: boolean
} | boolean


declare class WecomBot {
    send(text: string, options?: TextNoticeOptions): Promise<Res>
    sendTextNotice(text: string, options?: TextNoticeOptions): Promise<Res>
    sendImageNotice(image: {
        base64: string
        md5: string
    }): Promise<Res>
}

declare namespace WecomBot {
    function getInstance(options?: {
        webhook?: string
        key?: string
    }): WecomBot
}

export = WecomBot