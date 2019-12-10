import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament) private readonly repo: Repository<Tournament>,
  ) {}

  async findAll(query: any) {
    const take: number = query.take || 20;
    const skip: number = query.skip || 0;
    const join: string[] = query.join || [];

    // Join by defualt
    join.push('platforms', 'game');
    const keyword: string = query.keyword || '';

    const [result, total] = await this.repo.findAndCount({
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
}
