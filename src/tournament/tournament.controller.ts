import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDTO } from './tournament.dto';
import { Tournament } from './entities/tournament.entity';

@Controller('tournament')
export class TournamentController {
  constructor(public service: TournamentService) {}

  @Get('/')
  async findAll(@Query() query) {
    return this.service.findAll(query);
  }

  @Post('/')
  async addOne(@Body() tournament: CreateTournamentDTO) {
    return this.service.insertOne(tournament);
  }
}
