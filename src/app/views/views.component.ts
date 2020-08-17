import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {

  public isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeIsCollpased($event) {
    this.isCollapsed = $event;
  }

}
