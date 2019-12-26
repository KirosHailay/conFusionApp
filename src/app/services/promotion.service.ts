import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotion(): Promotion[] {
    return PROMOTIONS;
  }

  getPromotionId(id: string): Promotion {
    return PROMOTIONS.filter((promotion) => (promotion.id === id))[0];
  }

  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promotion) => (promotion.featured))[0];
  }
}
