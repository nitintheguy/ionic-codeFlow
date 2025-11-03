import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import lottie from 'lottie-web';

@Component({
  selector: 'app-findhackathons',
  templateUrl: './findhackathons.page.html',
  styleUrls: ['./findhackathons.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FindhackathonsPage implements OnInit, AfterViewInit {
  @Input() hackathons: any;
  @Input() userStats: any;

  selectedFilter: string = 'all';
  filteredHackathons: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.applyFilters();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeAnimations();
    }, 100); 
  }

  initializeAnimations() {
    if (this.hackathons) {
      Object.keys(this.hackathons).forEach(hackathonId => {
        const container = document.getElementById(`hackathon-${hackathonId}-animation`);
        if (container) {
          // Load animation based on hackathon ID
          const animationPath = `./assets/${hackathonId}-logo.json`;
          lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animationPath
          });
        }
      });
    }
  }

  applyFilters() {
    if (!this.hackathons) return;

    const allHackathons = Object.values(this.hackathons);
    
    switch (this.selectedFilter) {
      case 'upcoming':
        this.filteredHackathons = allHackathons.filter((h: any) => !h.registered);
        break;
      case 'ongoing':
        this.filteredHackathons = allHackathons.filter((h: any) => h.registered);
        break;
      case 'featured':
        this.filteredHackathons = allHackathons.filter((h: any) => h.featured);
        break;
      default:
        this.filteredHackathons = allHackathons;
    }
  }

  registerHackathon(hackathonId: string) {
    this.modalCtrl.dismiss({ 
      action: 'register',
      hackathonId: hackathonId 
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}