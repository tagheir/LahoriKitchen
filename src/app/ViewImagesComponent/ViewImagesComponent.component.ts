import { Component, OnInit } from '@angular/core';
import { firebaseStoreService } from '../services/firestoreservice';
import { picturesDto } from '../models/pictures';

@Component({
  selector: 'app-ViewImagesComponent',
  templateUrl: './ViewImagesComponent.component.html',
  styleUrls: ['./ViewImagesComponent.component.css']
})
export class ViewImagesComponentComponent implements OnInit {


  show = false;
  pc:picturesDto[]=[];
  m!:picturesDto;
  constructor(public fs:firebaseStoreService) { }

  ngOnInit() {
    this.fs.getfiles().valueChanges().subscribe(e=>{
debugger;

this.show = true;
      e.forEach(d=>{
this.pc.push(d);
this.m = this.pc[0];
      });

      this.add();
    });
  }

  add()
  {
debugger;
  }

}
