import { QueryInterface } from "sequelize";
import sequelize from "../models/sequelize";


export default  {
  async up (queryInterface : QueryInterface) {
      await queryInterface.sequelize.query(`
        ALTER TABLE User
        ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY,
        ADD COLUMN username VARCHAR(255) NOT NULL,
        ADD COLUMN email VARCHAR(255) NOT NULL UNIQUE,
        ADD COLUMN password  INT NOT NULL,
        ADD COLUMN phonenumber INT DEFAULT NULL,
        ADD COLUMN strike_count INT DEFAULT NULL,
        ADD COLUMN no_show  INT DEFAULT NULL,
        ADD COLUMN number_of_no_shows_stricks INT DEFAULT NULL,
        ADD COLUMN banned_until DATE DEFAULT NULL,
        ADD COLUMN type ENUM('user' , 'admin')
        `)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS User
      `)
  }
};
