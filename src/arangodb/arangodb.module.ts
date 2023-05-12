import { Module } from '@nestjs/common';
import { Database } from 'arangojs';

@Module({
  providers: [
    {
      provide: 'ARANGODB',
      useFactory: async () => await new Database({
        url: process.env.ARANGO_URL,
        databaseName: process.env.ARANGO_DB,
        auth: { username: process.env.ARANGO_USER
        , password: process.env.ARANGO_PASSWORD
     },
      }),
    },
  ],
  exports: ['ARANGODB'],
})
export class ArangoDbModule {}