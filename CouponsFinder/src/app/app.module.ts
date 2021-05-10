import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { CategoriesComponent } from './categories/categories.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';
import { CouponService } from 'src/services/coupon.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CouponCodeComponent } from './coupon-code/coupon-code.component';
import { AdminCrudComponent } from './admin-crud/admin-crud.component';
import { MyInterceptor } from 'src/services/MyInterceptor';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    CategoriesComponent,
    AboutusComponent,
    HomeComponent,
    CouponCodeComponent,
    AdminCrudComponent,
    EditCouponComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AdminService,UserService,CouponService,{ provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
