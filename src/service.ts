import * as dotenv from "dotenv";
dotenv.config({path: '../.env'})
import Image from './Database/entity';
 class Service {
    constructor(private readonly imageModel: typeof Image) {}
    async createImage(image: string): Promise<void> {
        try {
            await this.imageModel.create({
                Image: image,
            });
            console.log('Image created successfully.');
        } catch (error) {
            console.error('Error creating image:', error);
            throw error; // Rethrow the error if needed
        }
    }
}

export const service = new Service(Image)



