type Res = {
    code: number
    data: unknown
}

declare class WecomBot {
    send(text: string, toAll?: boolean): Promise<Res>
    sendTextNotice(text: string, toAll?: boolean): Promise<Res>
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