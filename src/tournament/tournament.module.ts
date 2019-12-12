import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import * as Entity from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Entity.Tournament, Entity.Game])],
  exports: [],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
