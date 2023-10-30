import { resize } from '../src/resize.images';
import  sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
// Mock the sharp library to avoid actual file operations
const mock_imp =  jest.fn().mockImplementation(()=>{return {id:123}})

// jest.mock('sharp', () => {
//     return {
//         default: jest.fn().mockReturnThis(),
//         resize: jest.fn().mockReturnThis(),
//         toFile: jest.fn().mockImplementation(async (filePath) => {
//             // Your custom implementation logic here
//             return filePath;
//         }),
//     };
// });
jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('mocked-uuid'),
}));

describe('resize', () => {
    it('resizes images and returns an array of resized image paths', async () => {
        // Arrange
        const inputImagePaths = ['/path/to/image1.jpg', '/path/to/image2.jpg'];
        const name = 'example';
        const expectedResizedPaths = ['/data/example-mocked-uuid.jpg', '/data/example-mocked-uuid.jpg'];

        // Act
        const resizedImagePaths = await resize(inputImagePaths, name);

        // Assert
        expect(sharp).toHaveBeenCalledWith('/path/to/image1.jpg');
        expect(sharp).toHaveBeenCalledWith('/path/to/image2.jpg');
        expect(resizedImagePaths).toEqual(expectedResizedPaths);
    });
    //
    // it('handles errors and throws an error', async () => {
    //     // Arrange
    //     const inputImagePaths = ['/path/to/image1.jpg'];
    //     const name = 'example';
    //     const expectedError = new Error('Mocked resize error');
    //     (sharp as jest.Mock).mockImplementationOnce(() => ({
    //         resize: jest.fn().mockReturnThis(),
    //         toFile: jest.fn().mockRejectedValue(expectedError),
    //     }));
    //
    //     // Act and Assert
    //     await expect(resize(inputImagePaths, name)).rejects.toThrowError(expectedError);
    // });
});




