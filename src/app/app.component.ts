import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');

    if (hasSeenWelcome) {
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/welcome', { replaceUrl: true });
    }
  }
}
