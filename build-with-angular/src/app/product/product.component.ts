import { Component } from '@angular/core';
import { ICut } from 'src/shared/interfaces/cut';
import { IProduct } from 'src/shared/interfaces/product';
import { ISelectedProduct } from 'src/shared/interfaces/selectedProduct';
import {products} from '../../assets/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  products!: IProduct[];
  product!: IProduct;
  selected!: ISelectedProduct;

  constructor() {
    this.products = products;
    this.product = this.products[0];
  }

  selectHandler(cut: ICut) {
    this.selected = {
      mark: this.product.mark,
      model: this.product.models[0].title,
      type: this.product.models[0].type,
      ml: cut.ml,
      price: cut.price,
      weight: cut.weight,
      imgUrl: this.product.models[0].img
    };
  }
}
