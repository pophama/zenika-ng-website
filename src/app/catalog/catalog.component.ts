import { Component, Inject, OnInit } from '@angular/core';
import { BasketItem } from '../basket/basket.types';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  protected products: Product[] = [];

  protected get basketItems(): BasketItem[] {
    return this.basketService.items;
  }

  constructor(
    @Inject('WELCOME_MSG') protected welcomeMsg: string,
    private apiService: ApiService,
    private basketService: BasketService,
  ) {
    this.apiService.getProducts().subscribe((products) => (this.products = products));
  }

  ngOnInit(): void {
    this.basketService.fetch().subscribe(); // <-- trigger the data fetching
  }

  protected get basketTotal(): number {
    return this.basketService.total;
  }

  protected addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe(() => {
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    product.stock -= 1;
  }

  protected isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  protected get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }
}
