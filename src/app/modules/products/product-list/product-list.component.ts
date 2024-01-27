import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  dbProducts: Array<any> = [];
  initialProductList: Array<any> = [];
  searchProductList: Array<any> = [];

  constructor(private appService: AppServiceService, private router: Router) { }
  ngOnInit() {
    this.getAllProducts()
  }
  async getAllProducts() {
    await this.appService.getAllProducts().subscribe((res) => {
      this.dbProducts = res?.response;
      this.initialProductList = [...this.dbProducts]
      console.log("rrr", this.dbProducts)
    })

  }

  handleSearchInput(value: string) {
    if (value.length == 0) {
      this.initialProductList = [...this.dbProducts];
    } else {
      this.searchProductList = this.initialProductList.filter(product =>
        product.productCategory.productCategoryName.toLowerCase().includes(value.toLowerCase())
      );
      this.initialProductList = [...this.searchProductList];
    }
  }

  toNavigate() {
    this.router.navigate(['eshop/about'])

  }

}
