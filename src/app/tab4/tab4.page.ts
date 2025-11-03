import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';
import { FindhackathonsPage } from '../pages/findhackathons/findhackathons.page';
import { ExploreinternshipsPage } from '../pages/exploreinternships/exploreinternships.page';
import { HackathondetailsPage } from '../pages/hackathondetails/hackathondetails.page';
import { InternshipdetailsPage } from '../pages/internshipdetails/internshipdetails.page';

interface UserStats {
  hackathons: number;
  applications: number;
  wins: number;
  network: number;
}

interface Hackathon {
  id: string;
  title: string;
  host: string;
  participants: number;
  prize: number;
  description: string;
  startDate: string;
  duration: string;
  location: string;
  skills: string[];
  registered: boolean;
  featured: boolean;
}

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  duration: string;
  description: string;
  applyBy: string;
  type: string;
  requirements: string;
  skills: string[];
  applied: boolean;
  saved: boolean;
}

interface Hackathons {
  [key: string]: Hackathon;
}

interface Internships {
  [key: string]: Internship;
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FindhackathonsPage, ExploreinternshipsPage, HackathondetailsPage, InternshipdetailsPage]
})
export class Tab4Page implements AfterViewInit, OnDestroy {
  opportunitiesAnimations: Map<string, AnimationItem> = new Map();

  // Pseudo-backend data with proper typing
  userStats: UserStats = {
    hackathons: 8,
    applications: 12,
    wins: 3,
    network: 24
  };

  hackathons: Hackathons = {
    google: {
      id: 'google',
      title: 'Google Code Jam 2024',
      host: 'Google',
      participants: 2400,
      prize: 50000,
      description: 'Annual coding competition by Google. Solve complex algorithms and compete with developers worldwide.',
      startDate: 'Dec 15, 2024',
      duration: '48 Hours',
      location: 'Virtual',
      skills: ['Algorithms', 'Data Structures', 'Problem Solving'],
      registered: false,
      featured: true
    },
    meta: {
      id: 'meta',
      title: 'Meta Hacker Cup',
      host: 'Meta',
      participants: 1800,
      prize: 35000,
      description: 'Global programming competition focusing on innovation and creative problem-solving.',
      startDate: 'Jan 10, 2024',
      duration: '72 Hours',
      location: 'Hybrid',
      skills: ['Web Development', 'AI/ML', 'Innovation'],
      registered: false,
      featured: false
    }
  };

  internships: Internships = {
    microsoft: {
      id: 'microsoft',
      title: 'Software Engineering Intern',
      company: 'Microsoft',
      location: 'Redmond, WA',
      salary: 7200,
      duration: 'Summer 2024',
      description: 'Work on cutting-edge projects with Microsoft\'s engineering teams. Mentorship from senior developers.',
      applyBy: 'Dec 30, 2024',
      type: 'On-site',
      requirements: 'CS/IT Students',
      skills: ['C#', '.NET', 'Azure', 'SQL'],
      applied: false,
      saved: false
    },
    techstart: {
      id: 'techstart',
      title: 'Frontend Developer Intern',
      company: 'TechStart Inc',
      location: 'Remote',
      salary: 4500,
      duration: 'Flexible',
      description: 'Build responsive web applications using React and TypeScript. Great learning opportunity in fast-paced startup.',
      applyBy: 'Jan 15, 2024',
      type: 'Remote',
      requirements: 'Any Major',
      skills: ['React', 'TypeScript', 'CSS', 'UI/UX'],
      applied: false,
      saved: false
    }
  };

  // Lottie animations for opportunities
  opportunitiesAnimationConfigs: { [key: string]: string } = {
    pro: './assets/cat.json',
    webd: './assets/programming.json',
    applications: './assets/applications-sent.json',
    wins: './assets/trophy-wins.json',
    network: './assets/network-connections.json',
    findHackathons: './assets/find-hackathons.json',
    internships: './assets/internships-search.json',
    googleHackathon: './assets/webd.json',
    facebookHackathon: './assets/programming.json',
    microsoftInternship: './assets/webd.json',
    startupInternship: './assets/programming.json'
  };

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeOpportunitiesAnimations();
    }, 300);
  }

  ngOnDestroy() {
    this.opportunitiesAnimations.forEach((animation) => {
      animation.destroy();
    });
  }

  initializeOpportunitiesAnimations() {
    Object.keys(this.opportunitiesAnimationConfigs).forEach(animationId => {
      const container = document.getElementById(`${animationId}-animation`);
      if (container) {
        try {
          const animation = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: this.opportunitiesAnimationConfigs[animationId],
          });

          animation.addEventListener('data_failed', () => {
            this.showFallbackIcon(container, animationId);
          });

          this.opportunitiesAnimations.set(animationId, animation);
        } catch (error) {
          this.showFallbackIcon(container, animationId);
        }
      }
    });
  }

  showFallbackIcon(container: HTMLElement, animationId: string) {
    const icons: { [key: string]: string } = {
      profile: 'person',
      hackathons: 'rocket',
      applications: 'document',
      wins: 'trophy',
      network: 'people',
      findHackathons: 'search',
      internships: 'briefcase',
      googleHackathon: 'logo-google',
      facebookHackathon: 'logo-facebook',
      microsoftInternship: 'laptop',
      startupInternship: 'business'
    };
    
    const iconName = icons[animationId] || 'help';
    container.innerHTML = `<ion-icon name="${iconName}" class="fallback-icon"></ion-icon>`;
  }

  async findHackathons() {
    const modal = await this.modalCtrl.create({
      component: FindhackathonsPage,
      componentProps: {
        hackathons: this.hackathons,
        userStats: this.userStats
      },
      cssClass: 'find-hackathons-modal'
    });
    
    await modal.present();
  }

  async exploreInternships() {
    const modal = await this.modalCtrl.create({
      component: ExploreinternshipsPage,
      componentProps: {
        internships: this.internships,
        userStats: this.userStats
      },
      cssClass: 'explore-internships-modal'
    });
    
    await modal.present();
  }

  async registerHackathon(company: string) {
    const hackathon = this.hackathons[company];
    if (hackathon) {
      const modal = await this.modalCtrl.create({
        component: HackathondetailsPage,
        componentProps: {
          hackathon: hackathon,
          isRegistered: hackathon.registered
        },
        cssClass: 'hackathon-details-modal'
      });
      
      await modal.present();
      
      const { data } = await modal.onWillDismiss();
      if (data?.registered) {
        this.hackathons[company].registered = true;
        this.userStats.applications++;
      }
    }
  }

  async showHackathonDetails(company: string) {
    const hackathon = this.hackathons[company];
    if (hackathon) {
      const modal = await this.modalCtrl.create({
        component: HackathondetailsPage,
        componentProps: {
          hackathon: hackathon,
          isRegistered: hackathon.registered,
          viewOnly: true
        },
        cssClass: 'hackathon-details-modal'
      });
      
      await modal.present();
    }
  }

  async applyInternship(company: string) {
    const internship = this.internships[company];
    if (internship) {
      const modal = await this.modalCtrl.create({
        component: InternshipdetailsPage,
        componentProps: {
          internship: internship,
          isApplied: internship.applied,
          isSaved: internship.saved
        },
        cssClass: 'internship-details-modal'
      });
      
      await modal.present();
      
      const { data } = await modal.onWillDismiss();
      if (data?.applied) {
        this.internships[company].applied = true;
        this.userStats.applications++;
      }
      if (data?.saved !== undefined) {
        this.internships[company].saved = data.saved;
      }
    }
  }

  saveInternship(company: string) {
    const internship = this.internships[company];
    if (internship) {
      internship.saved = !internship.saved;
      console.log(`${internship.title} ${internship.saved ? 'saved' : 'unsaved'}`);
    }
  }
}