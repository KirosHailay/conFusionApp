import { Injectable } from '@angular/core';

import { LEADER } from '../shared/leaders';
import { Leader } from '../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeader(id: string): Promise<Leader> {

    return new Promise(resolve => {

      // simulate server latency
      setTimeout(() => resolve(LEADER.filter((leader) => (leader.id === id))[0]), 200);
    });

  }

  getLeaders(): Promise<Leader[]> {

    return new Promise(resolve => {

      // simulate server latency
      setTimeout(() => resolve(LEADER), 2000);
    });

  }

  getFeaturedLeader(): Promise<Leader> {

    return new Promise(resolve => {

      setTimeout(() => resolve(LEADER.filter((leader) => (leader.featured))[0]), 2000);
    });

  }
}
