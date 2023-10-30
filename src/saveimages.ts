import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

const dataDirectory = join(__dirname, '../data');

// Ensure the "data" directory exists, create it if it doesn't
if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
}

export const saveBase64ImagesToFile = (base64Data: string[], name: string): string[] => {
    const randomUuid = uuidv4();
    const filenames: string[] = [];

    base64Data.forEach((base64: string, index: number) : void => {
        const filename: string = join(dataDirectory, `${name}${randomUuid}_${index}.jpg`);
        const data: string = base64.replace(/^data:image\/\w+;base64,/, '');
        const buffer: Buffer = Buffer.from(data, 'base64');

        const writeStream  = fs.createWriteStream(filename);
        writeStream.write(buffer);
        writeStream.end();

        filenames.push(filename);
    });

    return filenames;
};