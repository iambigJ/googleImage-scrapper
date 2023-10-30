import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

const dataDirectory = join(__dirname, '../data');
const originalDirectory = join(dataDirectory, 'orginal');

if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
}

if (!fs.existsSync(originalDirectory)) {
    fs.mkdirSync(originalDirectory);
}

export const saveBase64ImagesToFile = async (base64Data: string[], name: string): Promise<string[]> => {
    const randomUuid = uuidv4();
    const promises: Promise<string>[] = [];
    let filenames : string[] = []
    base64Data.forEach((base64: string, index: number) : void => {
        const filename = join(originalDirectory, `${name}${randomUuid}_${index}.jpg`);
        const data = base64.replace(/^data:image\/\w+;base64,/, '');
        const buffer: Buffer = Buffer.from(data, 'base64');

        const writeFilePromise = new Promise<string>((resolve, reject) => {
            const writeStream = fs.createWriteStream(filename);
            writeStream.write(buffer);
            writeStream.end();

            writeStream.on('finish', () => resolve(filename));
            writeStream.on('error', (error) => reject(error));
        });
        promises.push(writeFilePromise);
        filenames.push(filename)
    });
    try {
        await Promise.all(promises);
        return filenames
    } catch (error) {
        console.log(`Error on save file :  ${error} `)
    }
};