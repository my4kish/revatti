import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PacmanComponent } from './components/pacman/pacman.component';

export const routes: Routes = [
  {
    path: '', // specify the route path
    component: MainComponent // replace with your actual component
  },
  {
    path: 'pacman', // specify the route path
    component: PacmanComponent // replace with your actual component
  },
];
