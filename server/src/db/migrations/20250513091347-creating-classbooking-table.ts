import { QueryInterface } from "sequelize";


export default {
  async up (queryInterface : QueryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS Class_Booking (
        classBookingId INT AUTO_INCREMENT PRIMARY KEY ,
        classId INT, 
        userId INT,
        gymId INT ,
        confirmed JSON DEFAULT('[]'),
        waitlist JSON DEFAULT('[]'),
        FOREIGN KEY (classId) REFERENCES Class(classId),
        FOREIGN KEY (userId) REFERENCES User(id),
        FOREIGN KEY (gymId) REFERENCES Gym(gymId)
      )
      `)
  },

  async down (queryInterface: QueryInterface) {

  }
};
