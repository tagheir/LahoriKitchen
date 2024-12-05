import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Home.component';
import { MenuComponent } from './Menu/Menu.component';
import { ContactUsComponent } from './ContactUs/ContactUs.component';
import { GalleryComponent } from './Gallery/Gallery.component';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AddProductComponentComponent } from './AddProductComponent/AddProductComponent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ViewImagesComponentComponent } from './ViewImagesComponent/ViewImagesComponent.component';
import { DialoghandlerModule } from './dialoghandler/dialoghandler.module';

import { AboutusComponent } from './aboutus/aboutus.component';
import { FootComponent } from './footer/footer.component';
import { MakereservationComponent } from './makereservation/makereservation.component';

@NgModule({
  declarations: [	
    AppComponent,
      HomeComponent,
      MenuComponent,
      ContactUsComponent,
      GalleryComponent,
      AddProductComponentComponent,
      ViewImagesComponentComponent,
      FootComponent,
      AboutusComponent,
      MakereservationComponent
   ],
  imports: [
    BrowserModule,
    DialoghandlerModule,
    AppRoutingModule,
    NgbModule,
    AngularFireFunctionsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    NgbModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]


})
export class AppModule { }
