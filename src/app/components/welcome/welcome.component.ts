import { Component } from '@angular/core';
import { IonicModule,AnimationController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [IonicModule,RouterLink],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  goToTabs() {
    localStorage.setItem('hasSeenWelcome', 'true');
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }
}
