import { Sequelize } from "sequelize";

const postgresClient = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

export default postgresClient