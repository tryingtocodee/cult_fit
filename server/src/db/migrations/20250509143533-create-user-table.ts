
import { QueryInterface } from "sequelize";


export default  {
  async up (queryInterface : QueryInterface) {
      await queryInterface.sequelize.query(`
        CREATE TABLE IF NOT EXISTS User (
        id INT AUTO_INCREMENT PRIMARY KEY ,
        )
        `)
  },

  async down (queryInterface: QueryInterface) {
    
  }
};
