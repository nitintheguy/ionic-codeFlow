import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';
import { CoursedetailPage } from '../pages/coursedetail/coursedetail.page';
import { ChapterPage } from '../pages/chapter/chapter.page';
import { EnrollPage } from '../pages/enroll/enroll.page';
import { PaymentPage } from '../pages/payment/payment.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, CoursedetailPage, ChapterPage,EnrollPage,PaymentPage]
})
export class Tab2Page implements AfterViewInit, OnDestroy {
  enrolledCourses: { [key: string]: boolean } = {
    'fullstack': true,
    'javascript': false,
    'datascience': false,
    'uiux': false
  };

  courseProgress: { [key: string]: number } = {
    'fullstack': 45,
    'javascript': 0,
    'datascience': 0,
    'uiux': 0
  };

  courseAnimations: Map<string, AnimationItem> = new Map();

  courseAnimationConfigs = {
    fullstack: './assets/dev.json',
    javascript: 'https://assets10.lottiefiles.com/packages/lf20_2cwDXD.json',
    datascience: './assets/programming.json',
    uiux: 'https://assets10.lottiefiles.com/packages/lf20_6wutsrox.json'
  };

  // Pseudo-backend data - COMPLETED ALL COURSES
  courseData = {
    fullstack: {
      title: 'Full Stack Web Development',
      instructor: 'Tech Academy',
      price: 99,
      duration: '8 weeks',
      modules: 12,
      rating: 4.9,
      reviews: 2400,
      description: 'Master HTML, CSS, JavaScript, React, Node.js and build real-world projects. Perfect for beginners to advanced developers.',
      fullDescription: 'This comprehensive course takes you from beginner to professional full-stack developer. You\'ll learn modern web technologies including HTML5, CSS3, JavaScript ES6+, React, Node.js, Express, and MongoDB. Build 10+ real projects including a full e-commerce application.',
      features: [
        '100+ hours of video content',
        '10+ real-world projects',
        'Lifetime access',
        'Certificate of completion',
        'Community support',
        'Career guidance'
      ],
      curriculum: [
        { title: 'HTML & CSS Fundamentals', duration: '2 weeks', lessons: 8 },
        { title: 'JavaScript Mastery', duration: '3 weeks', lessons: 12 },
        { title: 'React & Modern Frameworks', duration: '2 weeks', lessons: 10 },
        { title: 'Backend with Node.js', duration: '1 week', lessons: 6 }
      ]
    },
    javascript: {
      title: 'Advanced JavaScript',
      instructor: 'JS Mastery',
      price: 79,
      duration: '6 weeks',
      modules: 8,
      rating: 4.7,
      reviews: 1800,
      description: 'Deep dive into modern JavaScript, ES6+, async programming, and advanced patterns.',
      fullDescription: 'Master advanced JavaScript concepts including ES6+ features, asynchronous programming, design patterns, and performance optimization. Perfect for developers looking to level up their JavaScript skills.',
      features: [
        '60+ hours of advanced content',
        '8 practical projects',
        'Code reviews',
        'Advanced patterns',
        'Performance optimization'
      ],
      curriculum: [
        { title: 'ES6+ Features', duration: '1 week', lessons: 5 },
        { title: 'Async Programming', duration: '2 weeks', lessons: 8 },
        { title: 'Design Patterns', duration: '2 weeks', lessons: 7 },
        { title: 'Performance & Optimization', duration: '1 week', lessons: 4 }
      ]
    },
    datascience: {
      title: 'Data Science Fundamentals',
      instructor: 'Data Pro',
      price: 129,
      duration: '10 weeks',
      modules: 15,
      rating: 4.8,
      reviews: 1200,
      description: 'Learn Python, pandas, matplotlib and machine learning basics for data analysis.',
      fullDescription: 'This course covers the fundamentals of data science including data analysis, visualization, and machine learning. You\'ll work with real datasets and build predictive models using Python.',
      features: [
        '80+ hours of content',
        'Real-world datasets',
        'Python programming',
        'Machine learning basics',
        'Data visualization',
        'Statistical analysis'
      ],
      curriculum: [
        { title: 'Python for Data Science', duration: '2 weeks', lessons: 10 },
        { title: 'Data Analysis with Pandas', duration: '3 weeks', lessons: 12 },
        { title: 'Data Visualization', duration: '2 weeks', lessons: 8 },
        { title: 'Machine Learning Basics', duration: '3 weeks', lessons: 10 }
      ]
    },
    uiux: {
      title: 'UI/UX Design Mastery',
      instructor: 'Design Lab',
      price: 89,
      duration: '7 weeks',
      modules: 10,
      rating: 4.6,
      reviews: 956,
      description: 'Learn design principles, Figma, prototyping and create stunning user interfaces.',
      fullDescription: 'Master the principles of user interface and user experience design. Learn to create beautiful, functional designs using Figma, conduct user research, and build interactive prototypes.',
      features: [
        '70+ hours of design content',
        'Figma mastery',
        'User research methods',
        'Portfolio projects',
        'Design system creation',
        'Interactive prototyping'
      ],
      curriculum: [
        { title: 'Design Principles', duration: '1 week', lessons: 5 },
        { title: 'Figma Fundamentals', duration: '2 weeks', lessons: 8 },
        { title: 'User Research', duration: '2 weeks', lessons: 7 },
        { title: 'Advanced Prototyping', duration: '2 weeks', lessons: 6 }
      ]
    }
  };

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeCourseAnimations();
    }, 300);
  }

  ngOnDestroy() {
    this.courseAnimations.forEach((animation) => {
      animation.destroy();
    });
  }

  initializeCourseAnimations() {
    Object.keys(this.courseAnimationConfigs).forEach(courseId => {
      const container = document.getElementById(`${courseId}-animation`);
      if (container) {
        try {
          const animation = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: (this.courseAnimationConfigs as any)[courseId],
          });

          animation.addEventListener('data_failed', () => {
            this.showFallbackIcon(container, courseId);
          });

          this.courseAnimations.set(courseId, animation);
        } catch (error) {
          this.showFallbackIcon(container, courseId);
        }
      }
    });
  }

  showFallbackIcon(container: HTMLElement, courseId: string) {
    const icons: { [key: string]: string } = {
      fullstack: 'code',
      javascript: 'logo-javascript',
      datascience: 'analytics',
      uiux: 'color-palette'
    };
    
    const iconName = icons[courseId] || 'school';
    container.innerHTML = `<ion-icon name="${iconName}" class="fallback-icon"></ion-icon>`;
  }
  continueCourse(courseId: string) {
    this.openChapterPlayer(courseId);
  }

  async showCourseDetails(courseId: string) {
    const course = this.courseData[courseId as keyof typeof this.courseData];
    if (course) {
      const modal = await this.modalCtrl.create({
        component: CoursedetailPage,
        componentProps: {
          course: course,
          courseId: courseId,
          isEnrolled: this.enrolledCourses[courseId]
        },
        cssClass: 'course-details-modal'
      });
      
      await modal.present();

      // Handle enrollment from details modal if needed
      const { data } = await modal.onWillDismiss();
      if (data?.enrolled) {
        this.enrollCourse(courseId);
      }
    }
  }

  async openChapterPlayer(courseId: string) {
    const course = this.courseData[courseId as keyof typeof this.courseData];
    if (course) {
      const modal = await this.modalCtrl.create({
        component: ChapterPage,
        componentProps: {
          courseId: courseId,
          course: course,
          currentProgress: this.courseProgress[courseId]
        },
        cssClass: 'chapter-player-modal'
      });
      
      await modal.present();
      
      const { data } = await modal.onWillDismiss();
      if (data?.progress) {
        this.courseProgress[courseId] = data.progress;
      }
    }
  }

  getCourseProgress(courseId: string): number {
    return this.courseProgress[courseId] || 0;
  }

  async enrollCourse(courseId: string) {
  const course = this.courseData[courseId as keyof typeof this.courseData];
  if (course) {
    const modal = await this.modalCtrl.create({
      component: EnrollPage,
      componentProps: {
        course: course,
        courseId: courseId
      },
      cssClass: 'enroll-modal'
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data?.enrolled) {
      // Update enrollment status
      this.enrolledCourses[data.courseId] = true;
      this.courseProgress[data.courseId] = 0;
      console.log(`Successfully enrolled in ${course.title}`);
    }
  }
}
}