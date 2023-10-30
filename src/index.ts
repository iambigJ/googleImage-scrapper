import { downloadImages } from "./scrap.imageSources";
import { saveBase64ImagesToFile } from './save.images.onFile';
import InsertImagesToDatabase from './insert.images.toDatabase';
import { resize } from "./resize.images";
import dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({ path: join(__dirname, '../env') });

const initial = async (): Promise<void> => {
    try {
        const searchQuery: string = process.env.SEARCH_QUERY || 'cutecats';
        const numberOfResults: number = parseInt(process.env.NUMBER_RESULT || '3', 10);
        const buffer: string[] = await downloadImages(searchQuery, numberOfResults);
        const originalImagePaths: string[] = await saveBase64ImagesToFile(buffer, 'cute');
        const resizedImagePaths: string[] = await resize(originalImagePaths, 'cutecats');
        await InsertImagesToDatabase(resizedImagePaths);
        console.log('Images downloaded, resized, and inserted into the database successfully.');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
};

initial();