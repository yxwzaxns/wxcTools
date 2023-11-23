declare namespace WxCloudSdk {
    namespace CloudDB {
        export class DataBase {
            queryBy<T>(): Promise<T[]>
        }
    }
}

export = WxCloudSdk