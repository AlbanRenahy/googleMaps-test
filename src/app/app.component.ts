import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
declare const google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  map: any;
  @ViewChild('mapElement') mapElement: any;

  constructor() {

  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }

  ngOnInit(): void {

  }
}
