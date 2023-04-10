
const { MongoClient, ServerApiVersion } = require('mongodb');
const url = process.env.DATABASE_URL;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect();

export const user_collection= async() => {
    const db = await client.db("portfolio")
    const collection = db.collection("users")
    return collection;
}






