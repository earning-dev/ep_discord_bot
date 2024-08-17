import { JSONFilePreset } from 'lowdb/node';
import { Low } from 'lowdb';
import { FILE_PATHS } from '@lib/constants.js';
import { formatDate } from './index.js';
import { User } from 'discord.js';

const pointsDb = await JSONFilePreset<UserPointsStore>(FILE_PATHS.USER_DB.json, { users: [] });

export interface IUser {
  id: string;
  username: string;
  points: number;
  createdAt: string;
  lastUpdatedAt: string;
}

export type UserPointsStore = {
  users: IUser[];
};

export class PointStoreDbManager {
  private db: Low<UserPointsStore>;

  constructor() {
    this.db = pointsDb;
  }

  public async updatePoints(user: User, points: number, method: 'add' | 'remove') {
    let dbUser = this.db.data.users.find((u) => u.id === user.id);

    const now = formatDate(new Date());

    if (!dbUser) {
      dbUser = {
        id: user.id,
        username: user.username,
        points: 0,
        createdAt: now,
        lastUpdatedAt: now,
      };

      this.db.data.users.push(dbUser);
    }

    switch (method) {
      case 'add':
        dbUser.points += points;
        break;
      case 'remove':
        dbUser.points -= points;
        break;
      default:
        console.warn('[Unreachable Reached]: Invalid method');
        break;
    }

    dbUser.lastUpdatedAt = now;

    await this.db.write();
    return dbUser;
  }

  public async getUser(user: User) {
    let dbUser = this.db.data.users.find((u) => u.id === user.id);
    const now = formatDate(new Date());

    if (!dbUser) {
      dbUser = {
        id: user.id,
        username: user.username,
        points: 0,
        createdAt: now,
        lastUpdatedAt: now,
      };

      this.db.data.users.push(dbUser);
    }

    await this.db.write();
    return dbUser;
  }

  public getDB() {
    return this.db.data.users;
  }
}

export default new PointStoreDbManager();
