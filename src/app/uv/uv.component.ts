import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-uv',
  templateUrl: './uv.component.html',
  styleUrls: ['./uv.component.scss']
})
export class UvComponent implements OnInit {
  loc$: Observable<string>;
  loc!: string;
  currentWeather: any = <any>{};
  uv: any[] = [];
  msg!: string;
  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe((loc: string) => {
      this.loc = loc;
      this.searchWeather(loc);
    })
  }
  ngOnInit() {
  }
  searchWeather(loc: string) {
    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc)
      .subscribe((res: any) => {
        this.currentWeather = res;
      }, (err: any) => {
}, () => {
        this.searchUv(loc);
      })
  }
  searchUv(loc: string) {
    this.weatherService.getUv(this.currentWeather.coord.lat, this.currentWeather.coord.lon)
      .subscribe((res: any) => {
        this.uv = res;
      }, (err: any) => {
})
  }
  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}