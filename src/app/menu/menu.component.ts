import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  protected get numberOfBasketItems(): number {
    return this.basketService.numberOfItems;
  }

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.fetch().subscribe(); // <-- trigger the data fetching
  }
}
