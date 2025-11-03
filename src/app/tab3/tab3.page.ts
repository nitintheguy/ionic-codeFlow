import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular'; // Add ModalController import
import { CommonModule } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';
import { MatchPage } from '../pages/match/match.page';
import { ContinuePage } from '../pages/continue/continue.page';
import { PracticePage } from '../pages/practice/practice.page';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,MatchPage,ContinuePage,PracticePage ]
})
export class Tab3Page implements AfterViewInit, OnDestroy {
  challengeAnimations: Map<string, AnimationItem> = new Map();

  // Lottie animations for challenges
  challengeAnimationConfigs = {
    profile: './assets/cat.json',
    elo: './assets/elo-rating.json',
    winrate: './assets/winrate.json',
    streak: './assets/win-streak.json',
    problems: './assets/problems-solved.json',
    search: './assets/battle.json',
    practice: './assets/Brain.json',
    playerYou: './assets/cat.json',
    playerOpponent: './assets/cat2.json',
    top1: './assets/cat.json',
    top:'./assets/cat2.json',
    top2: './assets/locked.json',
    top3: './assets/locked.json',
    bronze: './assets/bronze.json',
    silver: './assets/Silver.json',
    gold: './assets/Coin.json',
    platinum: './assets/Platinum.json',
    diamond: './assets/Diamond.json',
    master: './assets/Premium.json'
  };

  // Add ModalController to constructor
  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeChallengeAnimations();
    }, 300);
  }

  ngOnDestroy() {
    this.challengeAnimations.forEach((animation) => {
      animation.destroy();
    });
  }

  initializeChallengeAnimations() {
    Object.keys(this.challengeAnimationConfigs).forEach(animationId => {
      const container = document.getElementById(`${animationId}-animation`);
      if (container) {
        try {
          const animation = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: (this.challengeAnimationConfigs as any)[animationId],
          });

          animation.addEventListener('data_failed', () => {
            console.error(`Failed to load animation for ${animationId}`);
            this.showFallbackIcon(container, animationId);
          });

          this.challengeAnimations.set(animationId, animation);
        } catch (error) {
          console.error(`Error loading animation for ${animationId}:`, error);
          this.showFallbackIcon(container, animationId);
        }
      }
    });
  }

  showFallbackIcon(container: HTMLElement, animationId: string) {
    const icons: { [key: string]: string } = {
      profile: 'person',
      elo: 'trophy',
      winrate: 'stats-chart',
      streak: 'flame',
      problems: 'checkmark-done',
      search: 'search',
      practice: 'play',
      playerYou: 'person',
      playerOpponent: 'person',
      top1: 'trophy',
      top2: 'trophy',
      top3: 'trophy',
      bronze: 'medal',
      silver: 'medal',
      gold: 'medal',
      platinum: 'medal',
      diamond: 'diamond',
      master: 'sparkles'
    };
    
    const iconName = icons[animationId] || 'help';
    container.innerHTML = `<ion-icon name="${iconName}" class="fallback-icon"></ion-icon>`;
  }

  // Updated methods to use ModalController
  async findMatch() {
    const modal = await this.modalCtrl.create({
      component: MatchPage,
      cssClass: 'match-modal'
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Match modal dismissed with data:', data);
    }
  }

  async practiceAlone() {
    const modal = await this.modalCtrl.create({
      component: PracticePage,
      cssClass: 'practice-modal'
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Practice modal dismissed with data:', data);
    }
  }

  async continueBattle() {
    const modal = await this.modalCtrl.create({
      component: ContinuePage,
      cssClass: 'continue-modal'
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Continue modal dismissed with data:', data);
    }
  }
}