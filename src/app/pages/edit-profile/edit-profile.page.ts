import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditProfilePage {
  profile = {
    name: 'Catto',
    email: 'catto@example.com',
    phone: '+1 234 567 8900',
    title: 'Full Stack Developer',
    bio: 'Passionate developer who loves coding and solving complex problems.',
    location: 'San Francisco, CA'
  };

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  goBack() {
    this.navCtrl.back();
  }

  saveProfile() {
    console.log('Saving profile:', this.profile);
    // Save logic here
    this.navCtrl.back();
  }

  changePhoto() {
    console.log('Change photo clicked');
  }

  deleteAccount() {
    console.log('Delete account clicked');
  }
}