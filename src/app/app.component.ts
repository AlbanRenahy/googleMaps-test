import { HttpClient } from '@angular/common/http';
import { Component,ViewChild, ViewEncapsulation } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  apiLoaded: Observable<boolean>;
  declare google: any;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyB_6TBypoXHTNH9VASgD36d-KjoPweAebc', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }
  markerPositions: google.maps.LatLngLiteral[] = [];
  mapOptions: google.maps.MapOptions = {
  };

  marker1 = { position: { lat: 48.88883277929342, lng: 2.251860298310256 }, icon : 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png'  };
  marker2 = { position: { lat: 48.89276707297746, lng: 2.2364017769275213 }, icon : 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png'  };
  marker3 = { position: { lat: 48.880488080285296, lng: 2.284561337628295 }, icon : 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png'  };
  
  markers = [this.marker1, this.marker2, this.marker3];

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

ngAfterViewInit(){
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

addMarker(event: google.maps.MapMouseEvent) {
  this.markerPositions.push(event.latLng!.toJSON());
}
}
