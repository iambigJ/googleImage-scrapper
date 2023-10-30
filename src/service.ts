
 export default  class Service {
    constructor(private readonly Model) {}
    async createImage(image: string): Promise<void> {
        try {
            await this.Model.create({
                imageUrl: image,
            });
            console.log('Image created successfully.');
        } catch (error) {
            console.error('Error creating image:', error);
            throw error; // Rethrow the error if needed
        }
    }
}





