const { db } = require("../config/db"); 

const all = async () => {
    try {
      const SQLRequest = "SELECT * FROM usuarios"; 

      const { rows: response } = await db.query(SQLRequest); 
  
      return response;
    } catch (error) {
      throw error;
    }
};

module.exports = {
    all // Fixed the module export syntax
};
