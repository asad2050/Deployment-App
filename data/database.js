const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let mongodbUrl = 'mongodb://127.0.0.1:27017'; //new
if (process.env.MONGODB_URL) { //we as a deployer will define this env variable on our server so we can name it as we want.
  mongodbUrl = process.env.MONGODB_URL; 
}

let database;

async function initDatabase() {
  const client = await MongoClient.connect(mongodbUrl); //new
  database = client.db('deployment');
}

function getDb() {
  if (!database) {
    throw new Error('No database connected!');
  }

  return database;
}

module.exports = {
  initDatabase: initDatabase,
  getDb: getDb,
};