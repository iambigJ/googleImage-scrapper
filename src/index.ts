import dotenv from "dotenv";
import { join } from "path";
import Service from './service'
import Database from './Database/connection'
import Image from "./Database/image.entity";
import { Sequelize } from 'sequelize-typescript'
import {downloadImages} from "./scrapImages";
import {saveBase64ImagesToFile} from './saveimages'

const intial = async (): Promise<void> => {
    const database = Database.getInstance()
    await database.sync({force: false})
    const model = Image(database)
    const service = new Service(model)
    const buffer: string[]  = await  downloadImages('cutecats',10)
    console.log(buffer.length)
    saveBase64ImagesToFile(buffer,'cute')


}
intial()