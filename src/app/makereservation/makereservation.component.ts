import { Component, OnInit } from '@angular/core';
import { Apputils } from '../services/AppUtils';

@Component({
  selector: 'app-makereservation',
  templateUrl: './makereservation.component.html',
  styleUrls: ['./makereservation.component.css']
})
export class MakereservationComponent implements OnInit {

  constructor(public appUtil:Apputils) { }

  ngOnInit() {
  }

}
