import { Controller, Get, Post, Query, Body, Put, Param, Delete } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDTO, UpdateTournamentDTO } from './dto';
import { Tournament } from './entities';

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

  @Put(':id')
  async update(@Param('id') tournamentId: string, @Body() tournament: UpdateTournamentDTO) {
    return this.service.updateOne(tournamentId, tournament);
  }

  @Delete(':id')
  async delete(@Param('id') tournamentId: string) {
    return this.service.deleteOne(tournamentId);
  }
}
