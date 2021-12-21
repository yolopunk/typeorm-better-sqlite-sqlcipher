const db = require('better-sqlite3-multiple-ciphers')('foobar.db', { verbose: console.log });

db.pragma(`cipher='sqlcipher'`)
db.pragma("key='secret-key'");
const stmt = db.prepare("SELECT * FROM post")
console.log(stmt.get());