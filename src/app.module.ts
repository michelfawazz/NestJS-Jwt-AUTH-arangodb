import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ArangoDbModule } from './arangodb/arangodb.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [ArangoDbModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
