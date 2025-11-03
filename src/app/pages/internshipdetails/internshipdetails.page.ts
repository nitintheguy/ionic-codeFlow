import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie from 'lottie-web';

@Component({
  selector: 'app-internshipdetails',
  templateUrl: './internshipdetails.page.html',
  styleUrls: ['./internshipdetails.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class InternshipdetailsPage implements OnInit, AfterViewInit {
  @Input() internship: any;
  @Input() isApplied: boolean = false;
  @Input() isSaved: boolean = false;

  processing: boolean = false;
  showCancelWarning: boolean = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadInternshipAnimation();
    }, 100);
  }

  loadInternshipAnimation() {
    const container = document.getElementById('internship-details-animation');
    if (container && this.internship) {
      const animationPath = `./assets/${this.internship.id}-logo.json`;
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath
      });
    }
  }

  toggleApplication() {
    if (this.isApplied) {
      this.showCancelWarning = true;
    } else {
      this.applyInternship();
    }
  }

  applyInternship() {
    this.processing = true;
    
    // Simulate API call
    setTimeout(() => {
      this.processing = false;
      this.isApplied = true;
      this.modalCtrl.dismiss({ applied: true, saved: this.isSaved });
    }, 1500);
  }

  toggleSave() {
    this.isSaved = !this.isSaved;
    this.modalCtrl.dismiss({ applied: this.isApplied, saved: this.isSaved });
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
      this.isApplied = false;
      this.modalCtrl.dismiss({ applied: false, saved: this.isSaved });
    }, 1500);
  }

  dismiss() {
    this.modalCtrl.dismiss({ applied: this.isApplied, saved: this.isSaved });
  }
}