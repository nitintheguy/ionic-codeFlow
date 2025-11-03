import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie from 'lottie-web';

@Component({
  selector: 'app-hackathondetails',
  templateUrl: './hackathondetails.page.html',
  styleUrls: ['./hackathondetails.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HackathondetailsPage implements OnInit, AfterViewInit {
  @Input() hackathon: any;
  @Input() isRegistered: boolean = false;
  @Input() viewOnly: boolean = false;

  processing: boolean = false;
  showCancelWarning: boolean = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadHackathonAnimation();
    }, 100);
  }

  loadHackathonAnimation() {
    const container = document.getElementById('hackathon-details-animation');
    if (container && this.hackathon) {
      const animationPath = `./assets/${this.hackathon.id}-logo.json`;
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath
      });
    }
  }

  toggleRegistration() {
    if (this.isRegistered) {
      this.showCancelWarning = true;
    } else {
      this.registerHackathon();
    }
  }

  registerHackathon() {
    this.processing = true;
    
    // Simulate API call
    setTimeout(() => {
      this.processing = false;
      this.isRegistered = true;
      this.modalCtrl.dismiss({ registered: true });
    }, 1500);
  }

  cancelCancellation() {
    this.showCancelWarning = false;
  }

  confirmCancellation() {
    this.processing = true;
    
    // Simulate API call
    setTimeout(() => {
      this.processing = false;
      this.showCancelWarning = false;
      this.isRegistered = false;
      this.modalCtrl.dismiss({ registered: false });
    }, 1500);
  }

  dismiss() {
    this.modalCtrl.dismiss({ registered: this.isRegistered });
  }
}