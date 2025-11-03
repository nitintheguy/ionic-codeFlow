import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import lottie, { AnimationItem } from 'lottie-web';
import { IonicModule,NavController,ModalController } from '@ionic/angular';
import { AddFriendModal } from '../modals/add-friend.modal';

interface Friend {
  id: number;
  name: string;
  level: string;
  status: 'online' | 'offline' | 'away';
}

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule, 
    FormsModule
  ]
})
export class Tab6Page implements AfterViewInit, OnDestroy {

  constructor(private navCtrl: NavController,private modalCtrl: ModalController) {} // Correct usage

  goBack() {
    this.navCtrl.back(); // This should work
  }
  profileAnimations: Map<string, AnimationItem> = new Map();
  
  darkMode: boolean = false;
  studyReminders: boolean = true;

  friends: Friend[] = [
    { id: 1, name: 'Orange Cat', level: 'Level 12', status: 'online' },
    { id: 2, name: 'Sleepy Cat', level: 'Level 14', status: 'away' },
    { id: 3, name: 'Lazy Cat', level: 'Level 10', status: 'online' },
    { id: 4, name: 'Energetic Cat', level: 'Level 16', status: 'offline' },
    { id: 5, name: 'Mischievous Cat', level: 'Level 11', status: 'online' },
    { id: 6, name: 'Larry', level: 'Level 13', status: 'away' }
  ];

  profileAnimationConfigs = {
    profileAvatar: './assets/cat.json',
    level: './assets/level-badge.json',
    badge1: './assets/pro-coder.json',
    badge2: './assets/fast-learner.json',
    badge3: './assets/bug-hunter.json',
    editProfile: './assets/edit-profile.json',
    notifications: './assets/notifications.json',
    privacy: './assets/privacy-security.json',
    subscription: './assets/Pro.json',
    activity1: './assets/course-complete.json',
    activity2: './assets/win-trophy.json',
    activity3: './assets/level-up.json',
    help: './assets/help-support.json',
    about: './assets/about-app.json'
  };

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeProfileAnimations();
      this.initializeFriendAnimations();
    }, 300);
  }

  ngOnDestroy() {
    this.profileAnimations.forEach((animation) => {
      animation.destroy();
    });
  }

  initializeProfileAnimations() {
    Object.keys(this.profileAnimationConfigs).forEach(animationId => {
      const container = document.getElementById(`${animationId}-animation`);
      if (container) {
        try {
          const animation = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: (this.profileAnimationConfigs as any)[animationId],
          });

          animation.addEventListener('data_failed', () => {
            console.error(`Failed to load animation for ${animationId}`);
            this.showFallbackIcon(container, animationId);
          });

          this.profileAnimations.set(animationId, animation);
        } catch (error) {
          console.error(`Error loading animation for ${animationId}:`, error);
          this.showFallbackIcon(container, animationId);
        }
      }
    });
  }

  initializeFriendAnimations() {
    this.friends.forEach(friend => {
      const container = document.getElementById(`friend-${friend.id}-animation`);
      if (container) {
        try {
          const animation = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './assets/friend-avatar.json',
          });

          animation.addEventListener('data_failed', () => {
            container.innerHTML = `<ion-icon name="person" class="fallback-icon"></ion-icon>`;
          });
        } catch (error) {
          container.innerHTML = `<ion-icon name="person" class="fallback-icon"></ion-icon>`;
        }
      }
    });
  }

  showFallbackIcon(container: HTMLElement, animationId: string) {
    const icons: { [key: string]: string } = {
      profileAvatar: 'person',
      level: 'trophy',
      badge1: 'star',
      badge2: 'flash',
      badge3: 'bug',
      editProfile: 'create',
      notifications: 'notifications',
      privacy: 'shield-checkmark',
      subscription: 'diamond',
      activity1: 'school',
      activity2: 'trophy',
      activity3: 'trending-up',
      help: 'help-circle',
      about: 'information-circle'
    };
    
    const iconName = icons[animationId] || 'help';
    container.innerHTML = `<ion-icon name="${iconName}" class="fallback-icon"></ion-icon>`;
  }

  // Navigation Methods
  async editProfile() {
    this.navCtrl.navigateForward('/edit-profile');
  }

  async notificationSettings() {
    this.navCtrl.navigateForward('/notification-settings');
  }

   async privacySettings() {
    this.navCtrl.navigateForward('/privacy-security');
  }

  manageSubscription() {
    console.log('Manage subscription...');
  }

 async upgradePlan() {
    this.navCtrl.navigateForward('/upgrade-plans');
  }

   async addFriend() {
    const modal = await this.modalCtrl.create({
      component: AddFriendModal,
      cssClass: 'add-friend-modal-class'
    });
    await modal.present();
  }

 async helpSupport() {
    // Create help modal similar to add-friend modal
    console.log('Help & support');
  }

  
  async aboutApp() {
    // Create about modal
    console.log('About app');
  }

  toggleDarkMode() {
    console.log('Dark mode:', this.darkMode);
  }

  toggleReminders() {
    console.log('Study reminders:', this.studyReminders);
  }

  async logout() {
    this.navCtrl.navigateForward('/logout-confirm');
  }
  
}