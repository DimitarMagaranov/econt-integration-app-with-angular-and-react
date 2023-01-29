import { Component } from '@angular/core';
import { ICut } from 'src/shared/interfaces/cut';
import { IProduct } from 'src/shared/interfaces/product';
import { ISelectedProduct } from 'src/shared/interfaces/selectedProduct';
import {products} from '../assets/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {}
}
