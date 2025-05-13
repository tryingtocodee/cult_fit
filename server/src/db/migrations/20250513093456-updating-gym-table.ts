import { QueryInterface } from "sequelize";


export default {
  async up (queryInterface : QueryInterface) {
    await queryInterface.sequelize.query(`
        ALTER TABLE Gym
        CHANGE COLUMN created_at createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CHANGE COLUMN updated_at updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      `)
  },

  async down (queryInterface: QueryInterface) {

  }
};
