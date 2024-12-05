import { Component, OnInit } from '@angular/core';
import { picturesDto } from '../models/pictures';
import { firebaseStoreService } from '../services/firestoreservice';




@Component({
  selector: 'app-Gallery',
  templateUrl: './Gallery.component.html',
  styleUrls: ['./Gallery.component.css']
})
export class GalleryComponent implements OnInit {

  pd :picturesDto[]=[];
  constructor(public fs:firebaseStoreService) { }

  ngOnInit() {
    this.fs.getfiles().valueChanges().subscribe( e=>{
      this.pd = e;
    });
  }

}
