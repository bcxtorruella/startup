const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('poetryMate');
const historyCollection = db.collection('history');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// async function addUser(userName) {
//     const result = await historyCollection.insertOne(
//         {
//             userName: userName,
//             words: []
//         }
//     );
//     return result;
// }

// async function addWord(userName, words) {
//     const result = await historyCollection.updateOne(
//         { userName: userName },
//         { $set: { 'words': words } }
//     );
//     return result;
// }

async function pushToHist(userName, words) {
    try {
        return await historyCollection.updateOne(
            { name: userName },
            { $set: {'words': words }},
            { upsert: true }
        )
    } catch (error) {
        return error
    }
}

// just replace all history
async function updateHistory (history) {
    // every user should have a document by this point
    history.forEach(userHistory => {
        pushToHist(userHistory.name, userHistory.words)
    });
    // return result;
}

async function getHistory() {
    // if it's empty for this user, initialize. If it's not empty, don't do anything
    // const count = await historyCollection.find({query:{userName:userName}}).count()
    // let result = 0;

    // if (count  == 0) {
    //     result = await pushToHist(userName, [])
    // }
    // result = 0;
    // return whole history. Def has user info now for frontend to extract
    const cursor = await historyCollection.find();
    return cursor.toArray();
}

module.exports = { updateHistory, getHistory };