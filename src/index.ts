import {downloadImages} from "./scrap.imageSources";
import {saveBase64ImagesToFile} from './save.images.onFile'
import InsertImagesToDatabase from './insert.images.toDatabase'
import {resize} from "./resize.images";

const intial = async (): Promise<void> => {

    const buffer: string[]  = await  downloadImages('cutecats',100)
    const imagePathes = await saveBase64ImagesToFile(buffer,'cute')
   const a = await resize(imagePathes,'cutecats')
    // const x = await InsertImagesToDatabase(a)

}
intial()