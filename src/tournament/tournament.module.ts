import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { Tournament } from './entities/tournament.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tournament])],
    exports: [],
    controllers: [TournamentController],
    providers: [TournamentService],
})
export class TournamentModule {}
