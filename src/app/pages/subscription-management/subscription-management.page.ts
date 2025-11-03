import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-subscription-management',
  templateUrl: './subscription-management.page.html',
  styleUrls: ['./subscription-management.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SubscriptionManagementPage {

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  goBack() {
    this.navCtrl.back();
  }

  updatePayment() {
    console.log('Update payment method');
  }

  changeBillingCycle() {
    console.log('Change billing cycle');
  }

  upgradePlan() {
    console.log('Upgrade plan');
    // Navigate to upgrade page
  }

  cancelSubscription() {
    console.log('Cancel subscription');
  }
}