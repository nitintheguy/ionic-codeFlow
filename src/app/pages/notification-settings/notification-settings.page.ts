import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.page.html',
  styleUrls: ['./notification-settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NotificationSettingsPage {
  settings = {
    pushEnabled: true,
    studyReminders: true,
    achievements: true,
    friendActivity: true,
    challengeUpdates: true,
    newsletter: false,
    emailSummary: true,
    productUpdates: false
  };

  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back();
  }
}