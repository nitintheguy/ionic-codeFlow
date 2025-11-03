import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  standalone: true,
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  imports: [IonicModule]
})
export class IntroComponent implements OnInit, OnDestroy {
  private navigationTimer: any;
  
  constructor(private router: Router) { }
ngOnInit() {
  const LAST_ANIMATION_START = 8300; // Last card (card-5) starts at 8.3s
  const ANIMATION_DURATION = 800;    // Each animation takes 0.8s
  const BUFFER = 500;               // Extra buffer for smooth transition
  
  // Total wait = last animation start + animation duration + buffer
  const TOTAL_WAIT = LAST_ANIMATION_START + ANIMATION_DURATION + BUFFER;
  
  // Set timer to navigate after all animations fully complete
  this.navigationTimer = setTimeout(async () => {
    await this.router.navigate(['/profile'], {
      replaceUrl: true // This will replace the intro page in history
    });
  }, TOTAL_WAIT); // 9.6 seconds total (8300 + 800 + 500)
}

  ngOnDestroy() {
    // Clean up timer if component is destroyed
    if (this.navigationTimer) {
      clearTimeout(this.navigationTimer);
    }
  }
}
