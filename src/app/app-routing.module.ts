import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { MenuComponent } from './Menu/Menu.component';
import { AddProductComponentComponent } from './AddProductComponent/AddProductComponent.component';
import { ViewImagesComponentComponent } from './ViewImagesComponent/ViewImagesComponent.component';
import { GalleryComponent } from './Gallery/Gallery.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'reservation',
    component:ContactUsComponent,

  },
  {
    path:'menu',
    component:MenuComponent,

  },
  {
    path:'addproduct',
    component:AddProductComponentComponent,

  }
  ,{
    path:'images',
    component:ViewImagesComponentComponent,

  },
  {
    path:'gallery',
    component:GalleryComponent,

  },
  {
    path:'about',
    component:AboutusComponent,

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
