import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ArangoDbModule } from 'src/arangodb/arangodb.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';


import * as dotenv from 'dotenv';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
dotenv.config()


@Module({
  
  providers: [AuthService,LocalStrategy,JwtStrategy,RefreshJwtStrategy],
  controllers: [AuthController],
  imports: [ArangoDbModule,
    JwtModule.register({
    secret: process.env.jwt_secret,
    signOptions: { expiresIn: '3600s' },
  })]
})
export class AuthModule {}
