import { Component } from '@angular/core';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
// import { SecondPageComponent } from './second-page/second-page.component';

@Component({
  selector: 'app-main',
  imports: [FirstPageComponent, SecondPageComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
