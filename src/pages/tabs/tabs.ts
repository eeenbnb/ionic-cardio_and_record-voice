import { Component } from '@angular/core';

import { ScanPage } from '../card-scan/scan';
import { RecPage } from '../rec/rec';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ScanPage;
  tab3Root = RecPage;

  constructor() {

  }
}
