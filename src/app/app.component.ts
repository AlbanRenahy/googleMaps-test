import { AfterViewInit, Component,ViewChild, ViewEncapsulation } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 },
    zoom: 14
  };
  @ViewChild(GoogleMap) map!: GoogleMap;
  declare google: any;
  transports = false;

  marker1 = { position: { lat: 48.88883277929342, lng: 2.251860298310256 }, icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png'  };
  marker2 = { position: { lat: 48.89276707297746, lng: 2.2364017769275213 }, icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png'  };
  marker3 = { position: { lat: 48.880488080285296, lng: 2.284561337628295 }, icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png'  };
  marker4 = { position: { lat: 48.89185608206696, lng: 2.2775591572364258 }, icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png'  };
  marker5 = { position: { lat: 48.87649251488108, lng: 2.2637689714940636 }, icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png'  };

  markers = [this.marker1, this.marker2, this.marker3, this.marker4, this.marker5];


ngAfterViewInit(){
  console.log(
    this.map
  )
  const bounds = this.getBounds(this.markers);
  this.map.googleMap!.fitBounds(bounds);
}

getBounds(markers: any){
  let north;
  let south;
  let east;
  let west;

  for (const marker of markers){
    // set the coordinates to marker's lat and lng on the first run.
    // if the coordinates exist, get max or min depends on the coordinates.
    north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
    south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
    east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
    west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
  };

  const bounds = { north, south, east, west };

  return bounds;
}
}