import Image from "./Database/image.entity";
import Service from "./service";
import Database from "./Database/connection";


   const  InsertImagesToDatabase = async (imagePaths: string[]): Promise<void> => {

       const database = await Database.getInstance();
       const model = Image(database);
       const service = new Service(model);
       await Database.syncDatabase(true)
        const insertionPromises: Promise<any>[] = [];
        imagePaths.forEach(path => {
            const promise = service.createImage(path)
                .then(result => {
                    return
                })
                .catch(error => {
                    console.error(`Error inserting image from path ${path}: ${error.message}`);
                });

            insertionPromises.push(promise);
        });


        await Promise.all(insertionPromises);
    };


 export default InsertImagesToDatabase