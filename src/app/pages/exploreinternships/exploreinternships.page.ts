import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import lottie from 'lottie-web';

@Component({
  selector: 'app-exploreinternships',
  templateUrl: './exploreinternships.page.html',
  styleUrls: ['./exploreinternships.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ExploreinternshipsPage implements OnInit, AfterViewInit {
  @Input() internships: any;
  @Input() userStats: any;

  selectedFilter: string = 'all';
  filteredInternships: any[] = [];

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
    if (this.internships) {
      Object.keys(this.internships).forEach(internshipId => {
        const container = document.getElementById(`internship-${internshipId}-animation`);
        if (container) {
          const animationPath = `./assets/${internshipId}-logo.json`;
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
    if (!this.internships) return;

    const allInternships = Object.values(this.internships);
    
    switch (this.selectedFilter) {
      case 'remote':
        this.filteredInternships = allInternships.filter((i: any) => i.type === 'Remote');
        break;
      case 'onsite':
        this.filteredInternships = allInternships.filter((i: any) => i.type === 'On-site');
        break;
      case 'saved':
        this.filteredInternships = allInternships.filter((i: any) => i.saved);
        break;
      default:
        this.filteredInternships = allInternships;
    }
  }

  applyInternship(internshipId: string) {
    this.modalCtrl.dismiss({ 
      action: 'apply',
      internshipId: internshipId 
    });
  }

  toggleSave(internshipId: string) {
    this.modalCtrl.dismiss({ 
      action: 'toggle-save',
      internshipId: internshipId 
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}