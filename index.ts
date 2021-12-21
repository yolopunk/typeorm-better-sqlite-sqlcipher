import { createConnection } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'
import { Post } from './entity/post'

const config: BetterSqlite3ConnectionOptions = {
  type: 'better-sqlite3',
  // key: 'secret-key',
  database: 'foobar.db',
  driver: require('better-sqlite3-multiple-ciphers'),
  entities: ['entity/*.ts'],
  logging: true,
  verbose: console.log,
  prepareDatabase: db => {
    db.pragma(`cipher='sqlcipher'`)
    db.pragma(`key='secret-key'`)
  }
}

const start = async () => {
  const conn = await createConnection(config)
  const posts = await conn.manager.find(Post)
  console.log(posts)
}

start()