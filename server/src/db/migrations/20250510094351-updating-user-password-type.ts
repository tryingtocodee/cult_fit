import { QueryInterface } from "sequelize";
import sequelize from "../models/sequelize";


export default  {
  async up (queryInterface : QueryInterface) {
      await queryInterface.sequelize.query(`
        ALTER TABLE User
        MODIFY COLUMN password VARCHAR(255) NOT NULL
        `)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS User
      `)
  }
};
