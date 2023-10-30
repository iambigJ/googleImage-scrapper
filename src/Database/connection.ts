import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from "dotenv";
import { join } from "path";
dotenv.config({ path: join( __dirname ,'../../.env') });
class Database {
    private static instance: Sequelize | null = null;

    private constructor() {}

    static getInstance(): Sequelize {
        if (!Database.instance) {
            Database.instance = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
                host: 'localhost',
                dialect: 'postgres',
            });
        }
        return Database.instance;
    }
}

export default Database;