import { Injectable } from '@angular/core';

import { LEADER } from '../shared/leaders';
import { Leader } from '../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeader(id: string): Leader {

    return LEADER.filter((leader) => (leader.id === id))[0];
  }

  getLeaders(): Leader[] {
    return LEADER;
  }

  getFeaturedLeader(): Leader {
    return LEADER.filter((leader) => (leader.featured))[0];
  }
}
