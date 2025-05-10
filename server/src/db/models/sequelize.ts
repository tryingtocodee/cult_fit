import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    username: "root",
    password: "MubeeN11@",
    database: "cult_fit",
    host: "127.0.0.1",
    dialect: 'mysql',
})
export default sequelize