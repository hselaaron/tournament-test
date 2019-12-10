import { Controller, Get, Query } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Tournament } from './entities/tournament.entity';

@Controller('tournament')
export class TournamentController {
  constructor(public service: TournamentService) {}

  @Get('/')
  async findAll(@Query() query) {
    return this.service.findAll(query);
  }
}
