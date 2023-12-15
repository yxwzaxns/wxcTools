import { CloudDatabase } from "wx-cloud-sdk";

declare module "wx-cloud-sdk/cdb" {
    export = CloudDatabase
}