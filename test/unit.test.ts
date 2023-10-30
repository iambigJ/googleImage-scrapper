//--------------------------this section complited soon

// import InsertImagesToDatabase from '@/InsertImagesToDatabase';
// import Service from '@/Service'; // Adjust the import path based on your project structure
//
// jest.mock('@/Service');
//
// describe('InsertImagesToDatabase', () => {
//     it('should insert images into the database', async () => {
//         // Arrange
//         const imagePaths = ['/path/to/image1.jpg', '/path/to/image2.jpg'];
//         const mockCreateImage = jest.fn();
//         Service.prototype.createImage = mockCreateImage;
//
//         // Act
//         await InsertImagesToDatabase(imagePaths);
//
//         // Assert
//         expect(mockCreateImage).toHaveBeenCalledTimes(imagePaths.length);
//         // Add more assertions to validate the behavior, such as checking if the correct paths were passed to createImage
//     });
// });