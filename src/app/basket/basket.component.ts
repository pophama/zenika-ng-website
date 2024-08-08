import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent implements OnInit {
  protected get basketItems(): BasketItem[] {
    return this.basketService.items;
  }

  protected customer: Customer = { name: '', address: '', creditCard: '' };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private basketService: BasketService,
  ) {}

  ngOnInit(): void {
    this.basketService.fetch().subscribe(); // <-- trigger the data fetching
  }

  protected get basketTotal(): number {
    return this.basketService.total;
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.customer).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
