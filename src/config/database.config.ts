import { Tournament } from '../tournament/entities/tournament.entity';
import { Game } from '../tournament/entities/game.entity';
import { Platform } from '../tournament/entities/platform.entity';

export let databaseConf: any = {
  type: 'mysql',
  host: process.env.DBHOST || 'localhost',
  port: 3306,
  username: process.env.DBUSER || 'root',
  password: process.env.DBPASSWORD || 'password',
  database: 'tournament',
  entities: [Tournament, Platform, Game],
  synchronize: true,
};
