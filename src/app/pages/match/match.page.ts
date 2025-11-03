import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MatchPage implements OnInit, AfterViewInit, OnDestroy {
  currentElo: number = 1250;
  estimatedTime: number = 15;
  playersOnline: number = 342;
  matchFound: boolean = false;
  
  opponentName: string = 'CodeMaster';
  opponentElo: number = 1270;
  opponentWinRate: number = 72;
  problemDifficulty: string = 'Medium';

  private matchmakingInterval: any;
  private animations: Map<string, AnimationItem> = new Map();

  // Lottie animations
  private animationConfigs = {
    searching: './assets/search-match.json',
    playerYou: './assets/player-avatar.json',
    opponent: './assets/player-avatar2.json'
  };

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.startMatchmaking();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeAnimations();
    }, 100);
  }

  ngOnDestroy() {
    if (this.matchmakingInterval) {
      clearInterval(this.matchmakingInterval);
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

  startMatchmaking() {
    let timeElapsed = 0;
    
    this.matchmakingInterval = setInterval(() => {
      timeElapsed++;
      this.estimatedTime = Math.max(1, 15 - timeElapsed);
      
      // Simulate finding a match after 3-8 seconds
      if (timeElapsed >= 3 && timeElapsed <= 8 && Math.random() > 0.7) {
        this.foundMatch();
      }
      
      // Auto-find after 10 seconds
      if (timeElapsed >= 10) {
        this.foundMatch();
      }
    }, 1000);
  }

  foundMatch() {
    clearInterval(this.matchmakingInterval);
    this.matchFound = true;
    
    // Generate random opponent data
    const opponents = ['CodeMaster', 'AlgorithmPro', 'DebugKing', 'LogicQueen', 'SyntaxNinja'];
    this.opponentName = opponents[Math.floor(Math.random() * opponents.length)];
    this.opponentElo = this.currentElo + Math.floor(Math.random() * 50) - 25;
    this.opponentWinRate = 65 + Math.floor(Math.random() * 20);
    
    const difficulties = ['Easy', 'Medium', 'Hard'];
    this.problemDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  }

  acceptMatch() {
    console.log('Match accepted! Starting coding battle...');
    // Navigate to coding interface
    this.navCtrl.navigateForward('/coding-battle');
    this.dismiss();
  }

  declineMatch() {
    this.matchFound = false;
    this.startMatchmaking();
  }

  cancelMatchmaking() {
    if (this.matchmakingInterval) {
      clearInterval(this.matchmakingInterval);
    }
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}