
const { MongoClient, ServerApiVersion } = require('mongodb'); //including the mongoDB package
let client = null;

async function connectDB() {
    try {
        const DBconnectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7kxhkop.mongodb.net/`
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        client = new MongoClient(DBconnectionString, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        await client.connect();
        console.log(`Connected to the database : ${process.env.DB_NAME}`);
    } catch (error) {
        console.error('Error connecting to the databases:', error);
    }
}

async function readDB(Collection, query, projection) { // Read Entry
    try {
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(Collection);
        const result = await collection.find(query).project(projection).toArray();

        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

module.exports = { connectDB, readDB };

module.exports = { connectDB, readDB };