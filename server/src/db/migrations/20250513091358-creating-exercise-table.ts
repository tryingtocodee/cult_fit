import { QueryInterface } from "sequelize";


export default {
  async up (queryInterface : QueryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS Exercise (
        exercise INT AUTO_INCREMENT PRIMARY KEY ,
        classId INT,
        gymId INT ,
        exercise_name VARCHAR(255) NOT NULL ,
        description VARCHAR(255) NOT NULL,
        difficult ENUM('easy' , 'medium' , 'difficult'),
        video_assets JSON DEFAULT('[]'),
        FOREIGN KEY (classId) REFERENCES Class(classId),
        FOREIGN KEY (gymId) REFERENCES Gym(gymId)
      )
      `)
  },

  async down (queryInterface: QueryInterface) {

  }
};
