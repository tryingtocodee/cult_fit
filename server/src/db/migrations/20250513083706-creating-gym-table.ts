
import { QueryInterface } from "sequelize";
import sequelize from "../models/sequelize";

export default {
  async up (queryInterface : QueryInterface) {
    await queryInterface.sequelize.query(`
        CREATE TABLE IF NOT EXISTS Gym(
        gymId INT AUTO_INCREMENT PRIMARY KEY,
        owner INT,
        gym_name  VARCHAR(255),
        gym_address  VARCHAR(255) UNIQUE,
        open_time TIME NOT NULL ,
        close_time TIME NOT NULL,
        banned_users JSON DEFAULT('[]'),
        holidays JSON DEFAULT('[]') ,
        assets JSON DEFAULT('[]'),
        dates_open JSON DEFAULT ('[]'),
        dates_close JSON DEFAULT ('[]'),
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (owner) REFERENCES User(id)
    )`)
  },

  async down (queryInterface : QueryInterface) {
    
  }
};
