import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminCrudComponent } from './admin-crud/admin-crud.component';
import { CategoriesComponent } from './categories/categories.component';
import { CouponCodeComponent } from './coupon-code/coupon-code.component';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch:'full'},
  {path:'news',component:NewsComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'', component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'viewCouponCode', component:CouponCodeComponent,canActivate: [AuthGuardService]},
  {path:'admin-crud',component:AdminCrudComponent,canActivate: [AuthGuardService]},
  {path:'admin/editCoupon/:id', component: EditCouponComponent,canActivate: [AuthGuardService]},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
