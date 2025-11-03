import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-upgrade-plans',
  templateUrl: './upgrade-plans.page.html',
  styleUrls: ['./upgrade-plans.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpgradePlansPage {
  comparisonFeatures = [
    { name: 'Debugging Tokens', free: '50/month', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Code Explanations', free: true, pro: true, enterprise: true },
    { name: 'Career Guidance', free: true, pro: true, enterprise: true },
    { name: 'Priority Support', free: false, pro: true, enterprise: true },
    { name: 'Advanced Analytics', free: false, pro: true, enterprise: true },
    { name: 'Personal Roadmaps', free: false, pro: false, enterprise: true },
    { name: 'Team Features', free: false, pro: false, enterprise: true }
  ];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  goBack() {
    this.navCtrl.back();
  }

  selectPlan(plan: string) {
    console.log('Selected plan:', plan);
    // Handle plan selection
  }
}