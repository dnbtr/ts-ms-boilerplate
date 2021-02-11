import * as request from 'supertest';
import * as Fixtures from 'node-mongodb-fixtures';
import { MongoClient } from 'mongodb';

import { app } from './app';

describe('General Tests', () => {
  let connection;
  let db;
  let server;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = connection.db();

    app.context.db = db;

    server = app.listen();
  });

  beforeAll(async () => {
    await server.close();
    await connection.close();
  });

  describe('Fixtured Tests', () => {
    beforeEach(async () => {
      const fixtures = new Fixtures({ mute: true });
      await fixtures.connect(process.env.MONGO_URL);
      await fixtures.unload();
      await fixtures.load();
      await fixtures.disconnect();
    });
  });
});
