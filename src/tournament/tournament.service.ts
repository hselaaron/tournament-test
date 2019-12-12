import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { Game } from './entities/game.entity';
import { CreateTournamentDTO, UpdateTournamentDTO } from './dto';
import { Platform } from './entities/platform.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepo: Repository<Tournament>,
    @InjectRepository(Game) private readonly gameRepo: Repository<Game>,
  ) {}

  async findAll(query: any) {
    // Defining page length and joins
    const take: number = parseInt(query.length, 0) || 10;
    const join: string[] = /*query.join || */ [];

    // Creating page skips
    let skip: number = 0;
    if (typeof query.page !== 'undefined') {
      skip = (query.page * take) - take;
    }

    // Join by defualt
    join.push('platforms', 'game');
    const keyword: string = query.keyword || '';

    const [result, total] = await this.tournamentRepo.findAndCount({
      relations: join,
      where: {
        name: Like('%' + keyword + '%'),
        order: { name: 'DESC' },
      },
      take,
      skip,
    });

    return {
      data: result,
      itemCount: result.length,
      total,
      page: parseInt(query.page, 0),
    };
  }

  async insertOne(tournament: CreateTournamentDTO) {
    const newTournament = new Tournament();

    newTournament.name = tournament.name;
    newTournament.fullName = tournament.fullName;
    newTournament.game = new Game();
    newTournament.game.gameId = tournament.gameId;
    const platforms: Platform[] = [];
    tournament.platformIds.forEach(e => {
      const p: Platform = new Platform();
      p.platformId = e;
      platforms.push(p);
    });
    newTournament.platforms = platforms;
    newTournament.status = tournament.status;
    newTournament.isPublic = tournament.isPublic;
    newTournament.startsAt = tournament.startsAt;
    newTournament.endsAt = tournament.endsAt;
    newTournament.registartionStartsAt = tournament.registrationStartsAt;
    newTournament.registartionEndsAt = tournament.registrationEndsAt;
    newTournament.description = tournament.description;
    newTournament.rules = tournament.rules;

    return this.tournamentRepo.save(newTournament);
  }

  async updateOne(tournamentId: string, updateData: UpdateTournamentDTO) {
    // Pull current data down
    const tournament = await this.tournamentRepo.findOne(tournamentId);
    if (tournament === undefined) {
      return {
        error: 'Not Found',
        statusCode: 404,
        message: `Cannot find resource with id ${tournamentId}`,
      };
    }

    // Add updated fields to object
    for (const k in updateData) {
      if (true) {
        tournament[k] = updateData[k];
      }
    }

    // Save
    const data: any = await this.tournamentRepo.save(tournament);
    return {
      data,
      count: 1,
    };
  }

  async deleteOne(tournamentId: string) {
    return this.tournamentRepo.softDelete(tournamentId);
  }
}
