import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-confirm',
  templateUrl: './logout-confirm.page.html',
  styleUrls: ['./logout-confirm.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class LogoutConfirmPage {

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {}

  goBack() {
    this.navCtrl.back();
  }

  confirmLogout() {
    console.log('User logged out');
    // Implement actual logout logic
    this.router.navigate(['/profile']);
  }
}