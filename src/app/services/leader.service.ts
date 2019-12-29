import { Injectable } from '@angular/core';

import { LEADER } from '../shared/leaders';
import { Leader } from '../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeader(id: string): Promise<Leader> {

    return Promise.resolve(LEADER.filter((leader) => (leader.id === id))[0]);
  }

  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADER);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADER.filter((leader) => (leader.featured))[0]);
  }
}
