import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PracticePage implements OnInit, AfterViewInit {
  selectedDifficulty: string = '';
  selectedCategory: string = 'arrays';
  timeLimit: string = '30';
  showHints: boolean = true;
  testCases: string = '5';

  difficulties = [
    { level: 'easy', name: 'Easy', description: 'Fundamental concepts', problems: 45 },
    { level: 'medium', name: 'Medium', description: 'Common interview questions', problems: 68 },
    { level: 'hard', name: 'Hard', description: 'Advanced algorithms', problems: 32 }
  ];

  categories = [
    { id: 'arrays', name: 'Arrays', description: 'Array manipulation', solved: 12, total: 25 },
    { id: 'strings', name: 'Strings', description: 'String operations', solved: 8, total: 18 },
    { id: 'trees', name: 'Trees', description: 'Tree data structures', solved: 5, total: 15 },
    { id: 'graphs', name: 'Graphs', description: 'Graph algorithms', solved: 3, total: 12 },
    { id: 'dp', name: 'Dynamic Programming', description: 'DP problems', solved: 6, total: 20 },
    { id: 'sorting', name: 'Sorting', description: 'Sort algorithms', solved: 10, total: 12 }
  ];

  private animations: Map<string, AnimationItem> = new Map();

  // Lottie animations
  private animationConfigs = {
    practiceHeader: './assets/practice.json',
    diffEasy: './assets/easy-difficulty.json',
    diffMedium: './assets/medium-difficulty.json',
    diffHard: './assets/hard-difficulty.json',
    categoryArrays: './assets/arrays-category.json',
    categoryStrings: './assets/strings-category.json',
    categoryTrees: './assets/trees-category.json',
    categoryGraphs: './assets/graphs-category.json',
    categoryDp: './assets/dp-category.json',
    categorySorting: './assets/sorting-category.json'
  };

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Set default selections
    this.selectedDifficulty = 'medium';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeAnimations();
    }, 100);
  }

  initializeAnimations() {
    Object.keys(this.animationConfigs).forEach(animationId => {
      const container = document.getElementById(`${animationId}-animation`);
      if (container) {
        try {
          const animation = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: (this.animationConfigs as any)[animationId],
          });

          this.animations.set(animationId, animation);
        } catch (error) {
          console.error(`Error loading animation for ${animationId}:`, error);
        }
      }
    });
  }

  selectDifficulty(level: string) {
    this.selectedDifficulty = level;
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  updateTimeLimit() {
    console.log('Time limit updated to:', this.timeLimit);
  }

  updateHints() {
    console.log('Hints setting updated to:', this.showHints);
  }

  updateTestCases() {
    console.log('Test cases updated to:', this.testCases);
  }

  getTimeLimitText(): string {
    return `${this.timeLimit} minutes`;
  }

  startPractice() {
    if (!this.selectedDifficulty) return;

    console.log('Starting practice session with settings:', {
      difficulty: this.selectedDifficulty,
      category: this.selectedCategory,
      timeLimit: this.timeLimit,
      showHints: this.showHints,
      testCases: this.testCases
    });

    // Navigate to coding interface with practice settings
    this.navCtrl.navigateForward('/coding-practice', {
      state: {
        mode: 'practice',
        difficulty: this.selectedDifficulty,
        category: this.selectedCategory,
        timeLimit: parseInt(this.timeLimit),
        showHints: this.showHints,
        testCases: parseInt(this.testCases)
      }
    });

    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}