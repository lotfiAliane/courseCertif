import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [


  {path:'home' ,component: HomeComponent},
  {path: 'menu', component:MenuComponent},
  {path:'contactus', component:ContactComponent},
  {path:'dishdetail/:id',component:DishdetailComponent},
  {path:'aboutus',component:AboutComponent},
  {path: '', redirectTo: '/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
