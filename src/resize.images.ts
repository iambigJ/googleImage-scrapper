import sharp from 'sharp';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'

const dataDirectory = join(__dirname, '../data/resize');
if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
}

export const resize = async (inputImagePaths: string[], name : string) => {
    const arr : string[] = []
    const resizePromises = inputImagePaths.map(async (inputPath) => {
        const randomUuid = uuidv4()
        const filename = join(dataDirectory, `${name}${randomUuid}.jpg`);
        await sharp(inputPath)
            .resize({ width: 200, height: 200 })
            .toFile(filename);
        console.log(`Image resized and saved to ${filename}`);
        arr.push(filename)
    });
    return arr

};