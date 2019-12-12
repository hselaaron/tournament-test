import * as Tournament from '../tournament/entities';

export let databaseConf: any = {
  type: 'mysql',
  host: process.env.DBHOST || 'localhost',
  port: 3306,
  username: process.env.DBUSER || 'root',
  password: process.env.DBPASSWORD || 'password',
  database: 'tournament',
  entities: [
    Tournament.Tournament,
    Tournament.Platform,
    Tournament.Game,
  ],
  synchronize: true,
};
