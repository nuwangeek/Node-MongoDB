const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');


const url = 'mongodb://localhost:27017/';//url which mongodb server can access
const dbname = 'conFusion';//created db in mongodb server

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);//check to make sure that error is qual to null 

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    dboper.insertDocument(db, {name:"charith", description:"Test"},'dishes', (result) => {
        console.log('Insert Document:\n', result.ops);//ops tells that number of operations that has been carried out

        dboper.findDocuments(db,'dishes', (docs) => {
            console.log('Found Documents:\n', docs);

            dboper.updateDocument(db, {name:"charith"},{description:"Updated Test"}, 'dishes',(result) => {
                console.log('Updated Document:\n', result.result);

                dboper.findDocuments(db,'dishes', (docs) => {
                    console.log('Found Document:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Collection:', result);
                        client.close();
                    });
                });

            });
        });
    });
});