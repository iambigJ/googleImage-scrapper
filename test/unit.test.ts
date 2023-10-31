// Import necessary dependencies and functions
import  InsertImagesToDatabase  from '../src/insert.images.toDatabase'; // Replace with the correct path to your function

// Mock Database class, Image model, and Service class
jest.mock('../src/insert.images.toDatabase', () => ({
    Database: {
        getInstance: jest.fn().mockResolvedValue({
            syncDatabase: jest.fn().mockResolvedValue(true)
        })
    },
    Image: jest.fn(),
    Service: jest.fn()
}));

describe('InsertImagesToDatabase', () => {
    it('inserts images to the database', async () => {
        // Arrange
        const imagePaths = ['/path/to/image1.jpg', '/path/to/image2.jpg'];
        const mockCreateImage = jest.fn().mockResolvedValue(true);
        const mockServiceInstance = {
            createImage: mockCreateImage
        };
        const mockService = jest.fn().mockImplementation(() => mockServiceInstance);
        const mockImageModelInstance = {
            someModelMethod: jest.fn()
        };
        const mockImageModel = jest.fn().mockImplementation(() => mockImageModelInstance);
        const mockDatabaseInstance = {
            syncDatabase: jest.fn().mockResolvedValue(true)
        };
        const mockDatabase = {
            getInstance: jest.fn().mockResolvedValue(mockDatabaseInstance)
        };

        // Act
        await InsertImagesToDatabase(imagePaths);

        // Assert
        expect(mockDatabase.getInstance).toHaveBeenCalled();
        expect(mockDatabaseInstance.syncDatabase).toHaveBeenCalledWith(true);
        expect(mockImageModel).toHaveBeenCalledWith(mockDatabaseInstance);
        expect(mockService).toHaveBeenCalledWith(mockImageModelInstance);
        expect(mockCreateImage).toHaveBeenCalledTimes(2);
        expect(mockCreateImage).toHaveBeenCalledWith(imagePaths[0]);
        expect(mockCreateImage).toHaveBeenCalledWith(imagePaths[1]);
    });

    it('handles errors during image insertion', async () => {
        // Arrange
        const imagePaths = ['/path/to/image1.jpg', '/path/to/image2.jpg'];
        const mockCreateImage = jest.fn()
            .mockResolvedValueOnce(true)
            .mockRejectedValueOnce(new Error('Image insertion failed'));
        const mockServiceInstance = {
            createImage: mockCreateImage
        };
        const mockService = jest.fn().mockImplementation(() => mockServiceInstance);
        const mockImageModelInstance = {
            someModelMethod: jest.fn()
        };
        const mockImageModel = jest.fn().mockImplementation(() => mockImageModelInstance);
        const mockDatabaseInstance = {
            syncDatabase: jest.fn().mockResolvedValue(true)
        };
        const mockDatabase = {
            getInstance: jest.fn().mockResolvedValue(mockDatabaseInstance)
        };

        // Act & Assert
        await expect(InsertImagesToDatabase(imagePaths)).rejects.toThrow('Image insertion failed');
    });
});