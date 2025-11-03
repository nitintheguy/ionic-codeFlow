import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-friend-modal',
  templateUrl: './add-friend.modal.html',
  styleUrls: ['./add-friend.modal.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddFriendModal {
  searchQuery = '';
  searchResults: any[] = [];
  suggestedFriends = [
    { id: 7, name: 'Curious Cat', mutualFriends: 3, requestSent: false },
    { id: 8, name: 'Playful Cat', mutualFriends: 2, requestSent: false },
    { id: 9, name: 'Adventurous Cat', mutualFriends: 1, requestSent: false }
  ];

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  searchFriends() {
    if (this.searchQuery.trim()) {
      // Simulate search
      this.searchResults = [
        { id: 10, name: 'Search Cat', title: 'Frontend Developer', requestSent: false },
        { id: 11, name: 'Another Cat', title: 'Backend Developer', requestSent: false }
      ].filter(user => 
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }

  sendFriendRequest(user: any) {
    user.requestSent = true;
    console.log('Friend request sent to:', user.name);
    // API call to send friend request
  }
}