import { QueryInterface } from "sequelize";
import sequelize from "../models/sequelize";


export default  {
  async up (queryInterface : QueryInterface) {
      await queryInterface.sequelize.query(`
        CREATE TABLE IF NOT EXISTS User (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password  INT NOT NULL,
        phonenumber INT DEFAULT NULL,
        strike_count INT DEFAULT NULL,
        no_show  INT DEFAULT NULL,
        number_of_no_shows_stricks INT DEFAULT NULL,
        banned_until DATE DEFAULT NULL,
        type ENUM('user' , 'admin')
        )
        `)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS User
      `)
  }
};
