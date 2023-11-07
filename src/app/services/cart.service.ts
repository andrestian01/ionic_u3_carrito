// cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Buy } from '../models/buy.model';

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
    public cartItems:Product[]=[];
    public favoriteItems:Product[]=[];
    public buys:Buy[] = [];
    public quantity: number = 1;
    public totalCartPrice: number = 0; 
    isEmpty(): boolean {
      return this.cartItems.length === 0;
    }
  
    addToCart(product: Product) {
        const existingProduct = this.cartItems.find((item) => item.name === product.name);
      
        if (existingProduct) {
          existingProduct.quantity += 1; 
        } else {
          product.quantity = 1; 
          this.cartItems.push(product);
        }
      
        this.totalCartPrice = this.calculateCartTotal();
    }
  
    removeFromCart(product: Product) {
        const index = this.cartItems.indexOf(product);
      
        if (index !== -1) {
          if (product.quantity > 1) {
            product.quantity -= 1;
          } else {

            this.cartItems.splice(index, 1);
          }
      

          this.totalCartPrice = this.calculateCartTotal();
        }
    }

    calculateCartTotal(): number {
        let total = 0;
        for (const product of this.cartItems) {
          total += product.price * product.quantity;
        }
        return total;
    }
  
    getCartItems() {
      return this.cartItems;
    }

    clearCart() {
      const newBuy: Buy = {
        products: [...this.cartItems], 
        total: this.totalCartPrice,
        date: new Date()
      };
      this.buys.push(newBuy); 
      this.cartItems = []; 
      return this.cartItems;
    }

    getBuys(){
      return this.buys;
    }

    addToFavorites(product: Product) {
      const existingProduct = this.favoriteItems.find((item) => item.name === product.name);
  
      if (!existingProduct) {
        this.favoriteItems.push(product);
        console.log('Producto agregado a favoritos:', product);
      }
    }

    getFavoriteItems() {
      return this.favoriteItems;
    }

    removeFromFavorites(product: Product) {
      const index = this.favoriteItems.indexOf(product);
      if (index !== -1) {
        this.favoriteItems.splice(index, 1);
      }
    }
    
    

  }
