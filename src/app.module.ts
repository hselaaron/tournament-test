import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TournamentModule } from './tournament/tournament.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConf } from './config/database.config';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TournamentModule,
    TypeOrmModule.forRoot(databaseConf),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
