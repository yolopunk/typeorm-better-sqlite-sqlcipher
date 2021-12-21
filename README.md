# typeorm-better-sqlite-sqlcipher

> This is a minimum reproducible repo.

## Code

* The following method is in effect （using `better-sqlite3-multiple-ciphers`)

```js
// encrypt db
const db = require('better-sqlite3-multiple-ciphers')('foobar.db', { verbose: console.log })
db.pragma("cipher='sqlcipher'")
db.pragma(`rekey='secret-key'`)
db.prepare(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL)`).run()
const stmt = db.prepare('INSERT INTO post (title, text) VALUES (?, ?)')
const info = stmt.run('Joey', 'my homie')
db.close()

// decrypt db
const db = require('better-sqlite3-multiple-ciphers')('foobar.db', { verbose: console.log });

db.pragma(`cipher='sqlcipher'`)
db.pragma("key='secret-key'");
const stmt = db.prepare("SELECT * FROM post")
console.log(stmt.get()); // { id: 1, title: 'Joey', text: 'my homie' }
```
* The following method is not valid （using `typeorm`)

```typescript
import { createConnection } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'
import { Post } from './entity/post'

const config: BetterSqlite3ConnectionOptions = {
  type: 'better-sqlite3',
  key: 'secret-key',
  database: 'foobar.db',
  driver: require('better-sqlite3-multiple-ciphers'),
  entities: ['entity/*.ts'],
  logging: true,
  verbose: console.log,
  prepareDatabase: db => {
    db.pragma(`cipher='sqlcipher'`)
  }
}

const start = async () => {
  const conn = await createConnection(config)
  const posts = await conn.manager.find(Post)
  console.log(posts)
}

start()  // SqliteError: file is not a database
```

I don’t know what’s wrong with my options for `typeorm`. 


## Test for verif

```bash
npx ts-node encryptdb.ts
npx ts-node decryptdb.ts
npx ts-node index.ts
```