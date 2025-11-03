import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-continue',
  templateUrl: './continue.page.html',
  styleUrls: ['./continue.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ContinuePage implements OnInit, AfterViewInit, OnDestroy {
  timeRemaining: number = 1320; // 22 minutes in seconds
  timeElapsed: number = 480; // 8 minutes in seconds
  yourProgress: number = 75;
  opponentProgress: number = 60;
  linesOfCode: number = 42;
  passedTests: number = 3;
  totalTests: number = 5;
  lastSaved: string = '2 minutes ago';

  battleEvents = [
    { time: '00:00', description: 'Battle started - Binary Tree Zigzag Level Order' },
    { time: '02:15', description: 'You passed first test case' },
    { time: '03:40', description: 'Opponent passed first test case' },
    { time: '05:20', description: 'You passed second test case' },
    { time: '06:50', description: 'You passed third test case' },
    { time: '07:30', description: 'Opponent passed second test case' }
  ];

  private timerInterval: any;
  private animations: Map<string, AnimationItem> = new Map();

  // Lottie animations
  private animationConfigs = {
    playerYou: './assets/player-avatar.json',
    opponent: './assets/player-avatar2.json'
  };

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.startTimer();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeAnimations();
    }, 100);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.animations.forEach(animation => animation.destroy());
  }

  initializeAnimations() {
    Object.keys(this.animationConfigs).forEach(animationId => {
      const container = document.getElementById(`${animationId}-animation`);
      if (container) {
        try {
          const animation = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: (this.animationConfigs as any)[animationId],
          });

          this.animations.set(animationId, animation);
        } catch (error) {
          console.error(`Error loading animation for ${animationId}:`, error);
        }
      }
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        this.timeElapsed++;
        
        // Simulate opponent progress
        if (this.timeElapsed % 30 === 0 && this.opponentProgress < 95) {
          this.opponentProgress += Math.floor(Math.random() * 5) + 1;
        }
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  continueCoding() {
    console.log('Continuing to coding interface...');
    this.navCtrl.navigateForward('/coding-battle');
    this.dismiss();
  }

  viewSolution() {
    console.log('Viewing solution...');
    // Show solution modal or navigate to solution page
  }

  surrenderBattle() {
    console.log('Surrendering battle...');
    // Implement surrender logic
    this.dismiss();
  }

  showBattleInfo() {
    console.log('Showing battle information...');
    // Show battle info modal
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}