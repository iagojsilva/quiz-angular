import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  data = new DataService().getQuizes();


  constructor() { }

  ngOnInit(): void {
    
  }

  

}
