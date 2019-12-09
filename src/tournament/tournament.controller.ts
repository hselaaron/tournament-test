import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { TournamentService } from './tournament.service';
import { Tournament } from './entities/tournament.entity';

@Crud({
    model: {
      type: Tournament,
    },
    query: {
        join: {
            platforms: {
                eager: true,
            },
            game: {
                eager: true,
                exclude: ['createdAt', 'modifiedAt'],
            },
        },
    },
})
@Controller('tournament')
export class TournamentController implements CrudController<Tournament> {
    constructor(public service: TournamentService) {}
}
