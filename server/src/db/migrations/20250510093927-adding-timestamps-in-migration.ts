import { QueryInterface } from "sequelize";
import sequelize from "../models/sequelize";


export default  {
  async up (queryInterface : QueryInterface) {
      await queryInterface.sequelize.query(`
        ALTER TABLE User
        ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        `)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS User
      `)
  }
};