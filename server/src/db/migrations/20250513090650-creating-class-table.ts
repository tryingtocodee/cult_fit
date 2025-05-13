import { QueryInterface } from "sequelize";


export default {
  async up (queryInterface : QueryInterface) {
    await queryInterface.sequelize.query(`
        CREATE TABLE IF NOT EXISTS Class (
          classId INT AUTO_INCREMENT PRIMARY KEY,
          class_name VARCHAR(255) NOT NULL,
          gymId INT, 
          active JSON DEFAULT('[]'),
          FOREIGN KEY (gymId) REFERENCES Gym(gymId)
        )
      `)
  },

  async down (queryInterface: QueryInterface) {

  }
};
