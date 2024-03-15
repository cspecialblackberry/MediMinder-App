const Sequelize = require('sequelize')
require('dotenv').config()

let sequelize;
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  }else{
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            port: process.env.DB_PORT,
            logging: false   
        }
    )
  }


//mysql://rgtxiub5b8zf62qa:sgfpmrf56cksqbxk@iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/tw0sqgp9t2ff2k8t
//first section dbuser
//second password up to @
//third db name up to us east
module.exports = sequelize