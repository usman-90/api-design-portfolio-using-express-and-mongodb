
const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://siddiquiusman328:KkjMuEX6ks4ufMYp@cluster0.gkjhqpi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect();

export const user_collection= async() => {
    const db = await client.db("portfolio")
    const collection = db.collection("users")
    return collection;
}






