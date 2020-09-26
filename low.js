const low = require("lowdb");

// 동기식 방법
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ topic: [], author: [] }).write();

// Add a author
/*
db.get("author").push({ id: 1, name: "abc", profile: "desc" }).write();

db.get("topic")
    .push({ id: 1, title: "lowdb", description: "lowdb is ...." })
    .write();
*/

console.log(db.get("topic").find({ title: "lowdb" }).value());

db.get("topic").find({ id: 1 }).assign({ title: "lowdb" }).write();

db.get("topic").remove({ id: 2 });

const shortid = require("shortid");

db.get("topic")
    .push({ id: shortid.generate(), title: "short id generate!" })
    .write();

// 비동기식 방법
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");
low(adapter).then((db) => {
    // Set some defaults (required if your JSON file is empty)
    db.defaults({
        topic: [],
        author: [],
    }).write();

    const sid = shortid.generate();

    db.get("author")
        .push({
            id: sid,
            name: "duru",
            profile: "db admin",
        })
        .write()
        .then(() => {
            console.log("add author");
        });

    db.get("topic")
        .push({
            id: shortid.generate(),
            title: "MSSQL",
            description: "MSSQL is ...",
            author: sid,
        })
        .write()
        .then(() => {
            console.log("add topic");
        });
});
