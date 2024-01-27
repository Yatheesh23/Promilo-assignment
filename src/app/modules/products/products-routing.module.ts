import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'dashboard', component: ProductListComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
