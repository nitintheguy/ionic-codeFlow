import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';
import { LessonmodalPage } from '../lessonmodal/lessonmodal.page';
import { LessonPage } from '../lesson/lesson.page';

interface PathNode {
  id: number;
  type: 'lesson' | 'checkpoint' | 'locked';
  title: string;
  day?: number;
  completed: boolean;
  current?: boolean;
  animation?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, LessonmodalPage, LessonPage],
})
export class LoginPage implements AfterViewInit, OnDestroy {
  currentStreak = 2;
  nodeAnimations: Map<number, AnimationItem> = new Map();
  flameAnimation?: AnimationItem;

  // Pseudo-backend data
  nodeProgress = {
    completedLessons: [1, 2],
    currentLesson: 3,
    lockedLessons: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] 
  };

 
  nodeAnimationsById: { [key: number]: string } = {
    1: '/assets/code.json',
    2: '/assets/operator.json',
    3: '/assets/locked.json',
    4: '/assets/locked.json',
    5: '/assets/locked.json',
    6: '/assets/locked.json',
    7: '/assets/locked.json',
    8: '/assets/locked.json',
    9: '/assets/locked.json',
    10: '/assets/locked.json',
    11: '/assets/locked.json',
    12: '/assets/locked.json',
    13: '/assets/locked.json',
    14: '/assets/locked.json',
    15: '/assets/locked.json'
  };

  // Fallback animations by type
  lottieConfigs = {
    flame: '/assets/flame.json',
    defaultCompleted: 'https://assets1.lottiefiles.com/packages/lf20_u8jppxpw.json',
    defaultCurrent: 'https://assets1.lottiefiles.com/packages/lf20_kdxv6vqh.json',
    defaultCheckpoint: 'https://assets1.lottiefiles.com/packages/lf20_5hjqgrrq.json',
    defaultLocked: 'https://assets1.lottiefiles.com/packages/lf20_egf4mt7r.json',
  };

  pathNodes: PathNode[] = [
    { id: 1, type: 'lesson', title: 'Variables & Data Types', day: 1, completed: true },
    { id: 2, type: 'lesson', title: 'Operators', day: 2, completed: true },
    { id: 3, type: 'lesson', title: 'Conditionals', day: 3, completed: false, current: true },
    { id: 4, type: 'checkpoint', title: 'Unit 1 Review', completed: false },
    { id: 5, type: 'lesson', title: 'Loops', day: 4, completed: false },
    { id: 6, type: 'lesson', title: 'Functions', day: 5, completed: false },
    { id: 7, type: 'lesson', title: 'Arrays', day: 6, completed: false },
    { id: 8, type: 'lesson', title: 'Objects', day: 7, completed: false },
    { id: 9, type: 'checkpoint', title: 'Unit 2 Review', completed: false },
    { id: 10, type: 'locked', title: 'Classes', completed: false },
    { id: 11, type: 'locked', title: 'Async Programming', completed: false },
    { id: 12, type: 'locked', title: 'Error Handling', completed: false },
    { id: 13, type: 'checkpoint', title: 'Unit 3 Review', completed: false },
    { id: 14, type: 'locked', title: 'APIs & Fetch', completed: false },
    { id: 15, type: 'locked', title: 'Final Project', completed: false },
  ];

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeAnimations();
      this.updatePathToMatchNodes();
    }, 300);
  }

  ngOnDestroy() {
    this.flameAnimation?.destroy();
    this.nodeAnimations.forEach((a) => a.destroy());
  }

  // Pseudo-backend logic for node clicks
  async onNodeClick(node: PathNode, e: Event) {
    if (node.type === 'locked') {
      this.showLockedMessage();
      return;
    }

    // Check if node is completed
    if (this.nodeProgress.completedLessons.includes(node.id)) {
      await this.showLessonCompletedModal(node);
      return;
    }

    // Check if node is current lesson
    if (node.id === this.nodeProgress.currentLesson) {
      await this.openLessonPage(node);
      return;
    }

    // Check if previous lessons are completed
    if (this.nodeProgress.lockedLessons.includes(node.id)) {
      this.showPreviousLessonsIncomplete();
      return;
    }
  }

  async showLessonCompletedModal(node: PathNode) {
    const modal = await this.modalCtrl.create({
      component: LessonmodalPage,
      componentProps: {
        node: node,
        message: 'Lesson Completed!',
        animation: 'success'
      },
      cssClass: 'lesson-completed-modal'
    });
    
    await modal.present();
  }

 async openLessonPage(node: PathNode) {
  const modal = await this.modalCtrl.create({
    component: LessonPage,
    componentProps: {
      lesson: this.getLessonContent(node.id)
    },
    cssClass: 'lesson-page-modal themed-modal' // Add themed-modal class
  });
  
  await modal.present();
  
  // Handle lesson completion
  const { data } = await modal.onWillDismiss();
  if (data?.completed) {
    this.markLessonAsCompleted(node.id);
  }
}

  async showPreviousLessonsIncomplete() {
    const modal = await this.modalCtrl.create({
      component: LessonmodalPage,
      componentProps: {
        message: 'Previous lessons not completed yet!',
        subtitle: 'Complete the current lesson first.',
        animation: 'locked'
      },
      cssClass: 'lesson-locked-modal'
    });
    
    await modal.present();
  }

  showLockedMessage() {
    this.showPreviousLessonsIncomplete();
  }

  // Pseudo-backend methods
  private getLessonContent(lessonId: number): any {
    const lessons = {
      1: {
        title: 'Variables & Data Types',
        content: 'Learn about variables and different data types in programming. Variables are containers for storing data values. In JavaScript, you can declare variables using var, let, or const.',
        duration: '15 min',
        exercises: 5,
        concepts: [
          'Variable declaration (var, let, const)',
          'Primitive data types',
          'Type conversion',
          'Naming conventions'
        ]
      },
      2: {
        title: 'Operators',
        content: 'Understand arithmetic, comparison, and logical operators. Operators are used to perform operations on variables and values.',
        duration: '20 min',
        exercises: 7,
        concepts: [
          'Arithmetic operators (+, -, *, /)',
          'Comparison operators (==, ===, >, <)',
          'Logical operators (&&, ||, !)',
          'Assignment operators'
        ]
      },
      3: {
        title: 'Conditionals',
        content: 'Master if-else statements and conditional logic. Conditionals allow your code to make decisions and execute different code blocks based on conditions.',
        duration: '25 min',
        exercises: 8,
        concepts: [
          'If-else statements',
          'Switch statements',
          'Ternary operator',
          'Truthy and falsy values'
        ]
      }
    };
    
    return lessons[lessonId as keyof typeof lessons] || { 
      title: 'Lesson Not Found',
      content: 'This lesson content is not available.',
      duration: '0 min',
      exercises: 0,
      concepts: ['Content coming soon']
    };
  }

  private markLessonAsCompleted(lessonId: number) {
    // Update pseudo-backend
    this.nodeProgress.completedLessons.push(lessonId);
    this.nodeProgress.currentLesson = lessonId + 1;
    
    // Update local state
    const nodeIndex = this.pathNodes.findIndex(n => n.id === lessonId);
    if (nodeIndex !== -1) {
      this.pathNodes[nodeIndex].completed = true;
      if (this.pathNodes[nodeIndex + 1]) {
        this.pathNodes[nodeIndex + 1].current = true;
        this.pathNodes[nodeIndex].current = false;
      }
    }
    
    // Update animations and progress
    this.updatePathProgress();
    this.initializeNodeLotties();
  }

  // Rest of your existing methods remain the same...
  initializeAnimations() {
    try {
      const flameContainer = document.getElementById('flame-animation');
      if (flameContainer) {
        this.flameAnimation = lottie.loadAnimation({
          container: flameContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: this.lottieConfigs.flame,
        });
        
        this.flameAnimation.addEventListener('data_failed', () => {
          this.showFallbackFlame();
        });
      }
    } catch (error) {
      this.showFallbackFlame();
    }

    this.initializeNodeLotties();
  }

  showFallbackFlame() {
    const flameContainer = document.getElementById('flame-animation');
    if (flameContainer) {
      flameContainer.innerHTML = '🔥';
      flameContainer.style.fontSize = '48px';
      flameContainer.style.display = 'flex';
      flameContainer.style.alignItems = 'center';
      flameContainer.style.justifyContent = 'center';
    }
  }

  initializeNodeLotties() {
    setTimeout(() => {
      document.querySelectorAll('.lottie-node-animation').forEach((el) => {
        const id = Number((el as HTMLElement).dataset['nodeId']);
        const node = this.pathNodes.find((n) => n.id === id);
        if (!node) return;

        try {
          const anim = lottie.loadAnimation({
            container: el as HTMLElement,
            renderer: 'svg',
            loop: this.shouldLoopAnimation(node),
            autoplay: true,
            path: this.getNodeAnimationById(id, node),
          });

          anim.addEventListener('data_failed', () => {
            this.showFallbackNodeIcon(el as HTMLElement, node);
          });

          this.setupNodeAnimationEvents(anim, node);
          this.nodeAnimations.set(id, anim);
        } catch (error) {
          this.showFallbackNodeIcon(el as HTMLElement, node);
        }
      });
    }, 100);
  }

  getNodeAnimationById(nodeId: number, node: PathNode): string {
    const specificAnimation = this.nodeAnimationsById[nodeId];
    if (specificAnimation) {
      return specificAnimation;
    }
    return this.getFallbackAnimationByType(node);
  }

  getFallbackAnimationByType(node: PathNode): string {
    if (node.type === 'locked') return this.lottieConfigs.defaultLocked;
    if (node.type === 'checkpoint') return this.lottieConfigs.defaultCheckpoint;
    if (node.current) return this.lottieConfigs.defaultCurrent;
    if (node.completed) return this.lottieConfigs.defaultCompleted;
    return this.lottieConfigs.defaultLocked;
  }

  shouldLoopAnimation(node: PathNode): boolean {
    switch (node.type) {
      case 'checkpoint': return true;
      case 'locked': return false;
      case 'lesson':
        if (node.current) return true;
        if (node.completed) return false;
        return true;
      default: return true;
    }
  }

  setupNodeAnimationEvents(animation: AnimationItem, node: PathNode) {
    if (node.current) {
      animation.setSpeed(1.2);
    }
    if (node.type === 'checkpoint' && node.completed) {
      animation.addEventListener('complete', () => {
        animation.stop();
      });
    }
  }

  showFallbackNodeIcon(element: HTMLElement, node: PathNode) {
    const iconName = this.getNodeIcon(node);
    element.innerHTML = `<ion-icon name="${iconName}" class="fallback-icon"></ion-icon>`;
  }

  updatePathToMatchNodes() {
    const pathElement = document.getElementById('progress-path');
    if (!pathElement || !(pathElement instanceof SVGPathElement)) return;

    const nodeContainers = document.querySelectorAll('.node-container');
    if (nodeContainers.length === 0) return;

    let pathData = '';
    const nodeSpacing = 190;
    const startX = 200;

    for (let i = 0; i < nodeContainers.length; i++) {
      const y = i * nodeSpacing + 40;
      
      if (i === 0) {
        pathData += `M ${startX} ${y}`;
      } else {
        const prevY = (i - 1) * nodeSpacing + 40;
        const midY = prevY + (y - prevY) / 2;
        pathData += ` C ${startX} ${midY}, ${startX} ${midY}, ${startX} ${y}`;
      }
    }

    pathElement.setAttribute('d', pathData);
    this.updatePathProgress();
  }

  updatePathProgress() {
    const pathElement = document.getElementById('progress-path');
    if (!pathElement) return;

    const completedNodes = this.getCompletedCount();
    const totalNodes = this.pathNodes.length;
    
    const currentIndex = this.pathNodes.findIndex(n => n.current);
    const progressNodes = completedNodes + (currentIndex !== -1 ? 0.5 : 0);
    const progressFraction = Math.min(progressNodes / totalNodes, 1);
    
    const totalLength = 3000;
    const strokeDashoffset = totalLength * (1 - progressFraction);
    
    pathElement.style.strokeDashoffset = strokeDashoffset.toString();
  }

  getNodeClass(node: PathNode): string {
    const baseClass = 'node-content';
    if (node.type === 'locked') return `${baseClass} locked`;
    if (node.type === 'checkpoint') {
      return node.completed ? `${baseClass} checkpoint` : `${baseClass} checkpoint-incomplete`;
    }
    if (node.current) return `${baseClass} current`;
    if (node.completed) return `${baseClass} completed`;
    return baseClass;
  }

  triggerNodeAnimation(nodeId: number) {
    const animation = this.nodeAnimations.get(nodeId);
    if (animation) {
      animation.stop();
      animation.play();
    }
  }

  getNodeIcon(node: PathNode) {
    if (node.completed && node.type === 'lesson') return 'checkmark-circle';
    if (node.type === 'checkpoint') return 'flag';
    if (node.type === 'locked') return 'lock-closed';
    return 'school';
  }

  getCompletedCount() {
    return this.pathNodes.filter((n) => n.completed).length;
  }
}