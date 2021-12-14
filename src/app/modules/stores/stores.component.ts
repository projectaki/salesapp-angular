import { Component, OnInit } from '@angular/core';
import { Store } from './store';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  public stores!: Store[];
  public subscribed = true;

  ngOnInit(): void {
    this.stores = [
      {
        id: '1',
        name: 'Elgiganten',
        logoUrl:
          'https://www.elgiganten.dk/assets_spa/svg/logo_b2c_header_dk.svg',
      },
    ];
  }
}
