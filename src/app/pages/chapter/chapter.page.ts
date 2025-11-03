import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ChapterPage implements OnInit, AfterViewInit, OnDestroy {
  @Input() courseId: string = '';
  @Input() course: any;
  @Input() currentProgress: number = 0;

  // Player state
  isPlaying: boolean = false;
  currentTime: number = 0;
  totalTime: number = 180; // 3 minutes in seconds
  showTranscript: boolean = false;
  
  // Animation reference
  private animation?: AnimationItem;

  // Current chapter data
  currentChapterIndex: number = 0;
  chapters = [
    {
      title: 'Introduction to HTML',
      duration: 180,
      objectives: [
        'Understand HTML structure and syntax',
        'Learn about HTML tags and elements',
        'Create your first HTML page',
        'Understand semantic HTML'
      ],
      content: [
        {
          heading: 'What is HTML?',
          text: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page and consists of a series of elements that tell the browser how to display content.'
        },
        {
          heading: 'Basic HTML Structure',
          text: 'Every HTML document starts with a doctype declaration and has html, head, and body elements.',
          code: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>This is my first web page.</p>
</body>
</html>`
        }
      ],
      keyPoints: [
        'HTML is not a programming language',
        'Use semantic tags for better accessibility',
        'Always include the DOCTYPE declaration',
        'HTML5 introduced new semantic elements'
      ]
    },
    {
      title: 'CSS Fundamentals',
      duration: 240,
      objectives: [
        'Learn CSS syntax and selectors',
        'Understand the box model',
        'Apply styles to HTML elements',
        'Create responsive layouts'
      ],
      content: [
        {
          heading: 'CSS Introduction',
          text: 'CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the color, font, spacing, and overall visual presentation of your content.'
        }
      ],
      keyPoints: [
        'CSS separates content from presentation',
        'Use classes for reusable styles',
        'Understand specificity in CSS',
        'Mobile-first responsive design'
      ]
    }
  ];

  transcript = [
    { time: 0, text: "Welcome to Introduction to HTML." },
    { time: 10, text: "In this chapter, we'll learn the fundamentals of HTML structure." },
    { time: 30, text: "HTML stands for HyperText Markup Language." },
    { time: 45, text: "It's the standard language for creating web pages." },
    { time: 60, text: "Let's look at a basic HTML document structure." },
    { time: 90, text: "Every HTML document starts with a DOCTYPE declaration." },
    { time: 120, text: "The html element is the root element of your page." },
    { time: 150, text: "The head contains meta information and the title." },
    { time: 170, text: "The body contains the visible content of your page." }
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.startProgressTimer();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadChapterAnimation();
    }, 100);
  }

  ngOnDestroy() {
    this.animation?.destroy();
  }

  get currentChapter() {
    return this.chapters[this.currentChapterIndex];
  }

  loadChapterAnimation() {
    const container = document.getElementById('chapter-animation');
    if (container) {
      // Use a generic coding animation or course-specific one
      const animationPath = './assets/lesson.json'; 
      
      this.animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: animationPath
      });

      this.animation.addEventListener('DOMLoaded', () => {
        this.totalTime = this.animation?.totalFrames || 180;
      });
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.animation) {
      if (this.isPlaying) {
        this.animation.play();
      } else {
        this.animation.pause();
      }
    }
  }

  toggleTranscript() {
    this.showTranscript = !this.showTranscript;
  }

  seek(event: any) {
    const progressBar = event.target.getBoundingClientRect();
    const clickPosition = event.clientX - progressBar.left;
    const percentage = clickPosition / progressBar.width;
    this.currentTime = this.totalTime * percentage;
    
    if (this.animation) {
      const targetFrame = this.animation.totalFrames * percentage;
      this.animation.goToAndStop(targetFrame, true);
    }
  }

  skipBackward() {
    this.currentTime = Math.max(0, this.currentTime - 10);
    this.updateAnimationFrame();
  }

  skipForward() {
    this.currentTime = Math.min(this.totalTime, this.currentTime + 10);
    this.updateAnimationFrame();
  }

  updateAnimationFrame() {
    if (this.animation) {
      const frame = (this.currentTime / this.totalTime) * this.animation.totalFrames;
      this.animation.goToAndStop(frame, true);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  startProgressTimer() {
    setInterval(() => {
      if (this.isPlaying && this.currentTime < this.totalTime) {
        this.currentTime += 1;
        this.updateProgress();
      }
    }, 1000);
  }

  updateProgress() {
    // Update course progress when chapter completes
    if (this.currentTime >= this.totalTime) {
      const progressIncrement = 100 / this.chapters.length;
      const newProgress = Math.min(100, this.currentProgress + progressIncrement);
      
      if (newProgress > this.currentProgress) {
        this.modalCtrl.dismiss({ progress: newProgress });
      }
    }
  }

  previousChapter() {
    if (this.currentChapterIndex > 0) {
      this.currentChapterIndex--;
      this.resetPlayer();
    }
  }

  nextChapter() {
    if (this.currentChapterIndex < this.chapters.length - 1) {
      this.currentChapterIndex++;
      this.resetPlayer();
    }
  }

  hasPreviousChapter(): boolean {
    return this.currentChapterIndex > 0;
  }

  hasNextChapter(): boolean {
    return this.currentChapterIndex < this.chapters.length - 1;
  }

  resetPlayer() {
    this.currentTime = 0;
    this.isPlaying = false;
    this.updateAnimationFrame();
  }

  dismiss() {
    this.modalCtrl.dismiss({ progress: this.currentProgress });
  }
}