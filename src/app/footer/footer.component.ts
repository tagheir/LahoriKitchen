import { Component, OnInit } from '@angular/core';
import { Apputils } from '../services/AppUtils';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FootComponent implements OnInit {

  constructor(public AppUtil:Apputils) { }

  ngOnInit() {
  }

}
