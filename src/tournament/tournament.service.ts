import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { Game } from './entities/game.entity';
import { CreateTournamentDTO } from './tournament.dto';
import { Platform } from './entities/platform.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepo: Repository<Tournament>,
    @InjectRepository(Game) private readonly gameRepo: Repository<Game>,
  ) {}

  async findAll(query: any) {
    const take: number = parseInt(query.take, 0) || 20;
    const skip: number = parseInt(query.skip, 0) || 0;
    const join: string[] = query.join || [];

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
      total,
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
}
