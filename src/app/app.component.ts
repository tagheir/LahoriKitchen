import { Component, OnInit } from '@angular/core';
import { Apputils } from './services/AppUtils';
import { ActivatedRoute, Router, RouterModule, RoutesRecognized } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public AppUtil:Apputils,public router:Router,private activatedRoute: ActivatedRoute)
  {

  }

  activehome="";
  activemenu="";
  activegallery="";
  activecontactus="";
  activeabout="";

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(e=>{
      console.log(e);
    });
    console.log(this.router.url);
    // Call below anywhere within Init or Constructor etc
this.router.events.subscribe((event: any) => {
  if (event instanceof RoutesRecognized) {
    console.log(event.url); // WORKS
    if(event.url == "/")
    {
      this.activehome="active";
    }
    else if(event.url == "/menu")
    {
      this.activemenu="active";
    }
    else
    if(event.url == "/gallery")
    {
      this.activegallery="active";
    }
    else
    if(event.url == "/about")
    {
      this.activeabout ="active";
    }
    else{
      this.activecontactus="active";
    }
  }
  // NavigationStart // NavigationEnd // NavigationCancel // NavigationError // RoutesRecognized
});
  }
  title = 'LahoriCatering';
}
