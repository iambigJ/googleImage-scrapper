import sharp from 'sharp';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'

const dataDirectory = join(__dirname, '../data/resize');
if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
}


export const resize = async (inputImagePaths: string[], name: string): Promise<string[]> => {
    const resizePromises: Promise<string>[] = inputImagePaths.map(async (inputPath) => {
        const randomUuid = uuidv4();
        const filename :string = join(dataDirectory, `${name}-${randomUuid}.jpg`);
        await sharp(inputPath)
            .resize({ width: 200, height: 200 })
            .toFile(filename);
        console.log(`Image resized and saved to ${filename}`);
        return filename;
    });

    try {
        const resizedImagePaths: string[] = await Promise.all(resizePromises);
        return resizedImagePaths;
    } catch (error) {
        console.error('Error resizing images:', error);
        throw error;
    }
};