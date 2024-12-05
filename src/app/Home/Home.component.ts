import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { firebaseStoreService } from '../services/firestoreservice';
import { ProductList } from '../models/product';
import { Apputils } from '../services/AppUtils';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  pr:ProductList[] = [];
  constructor(public appUtil:Apputils, public fs:firebaseStoreService, @Inject(DOCUMENT) private document: Document) {
    this.document.body.id = "home";
    this.fs.getProducts().then(e=>{
      console.log(e);
      this.pr = e;
      this.pr[0].category.catname
    });
  }

  ngOnInit() {
  }

}
