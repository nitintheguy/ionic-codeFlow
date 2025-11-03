import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-security',
  templateUrl: './privacy-security.page.html',
  styleUrls: ['./privacy-security.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PrivacySecurityPage {
  privacy = {
    profilePublic: true,
    showActivity: true,
    allowFriendRequests: true,
    twoFactorEnabled: false
  };

  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back();
  }

  changePassword() {
    console.log('Change password');
  }

  twoFactorAuth() {
    console.log('Two factor auth');
  }

  toggleTwoFactor() {
    console.log('Two factor:', this.privacy.twoFactorEnabled);
  }

  loginActivity() {
    console.log('Login activity');
  }

  dataExport() {
    console.log('Data export');
  }

  clearHistory() {
    console.log('Clear history');
  }
}