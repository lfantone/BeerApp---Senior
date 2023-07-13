import Dexie, { Table } from 'dexie';
import { Beer } from '../types/beer';

const INITIAL_VERSION = 1;

export class DB extends Dexie {
  beers!: Table<Beer>;

  constructor() {
    super('offline-first-db');
    this.version(INITIAL_VERSION).stores({
      beers: '++id, favorite',
    });
  }

  async setBeer(beer: Beer) {
    const exists = await this.getBeer(beer.id);
    return exists || this.beers.put({ ...beer, favorite: false })
  }

  async getBeer(id?: string) {
    return id ? await this.beers.get(id) : undefined;
  }

  async isBeerFavorite(id?: string) {
    const beer = await this.getBeer(id);
    return beer?.favorite ?? false;
  }

  async toogleBeerFavorite(id?: string) {
    const beer = await this.getBeer(id);
    if (!beer) {
      throw new Error(`Beer with id ${id} not found`)
    }

    return this.beers.update(beer.id, { favorite: !beer.favorite });
  }
}

export const db = new DB();
