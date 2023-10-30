import Database from './connect'
import {DataTypes} from "sequelize";
const sequelize = Database.getInstance()
 const Image = sequelize.define('Image', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        modelName: 'Image',
        tableName: 'Image', // Optionally, you can specify the table name
        timestamps: true, // Automatically add createdAt and updatedAt timestamps
    });
 // const sync = async ()=>{
 //     try {
 //         sequelize.sync({force: false})
 //     }catch (err){
 //         console.log(err)
 //     }
 // }
export default  Image ;


