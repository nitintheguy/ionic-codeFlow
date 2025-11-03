import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie from 'lottie-web';

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.page.html',
  styleUrls: ['./coursedetail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CoursedetailPage implements OnInit, AfterViewInit {
  @Input() course: any;
  @Input() courseId: string = '';
  @Input() isEnrolled: boolean = false;

  courseAnimationConfigs: { [key: string]: string } = {
    fullstack: './assets/dev.json',
    javascript: 'https://assets10.lottiefiles.com/packages/lf20_2cwDXD.json',
    datascience: './assets/programming.json',
    uiux: 'https://assets10.lottiefiles.com/packages/lf20_6wutsrox.json'
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadCourseAnimation();
    }, 100);
  }

  loadCourseAnimation() {
    const container = document.getElementById('details-animation');
    if (container && this.courseId) {
      const animationPath = this.courseAnimationConfigs[this.courseId];
      if (animationPath) {
        lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: animationPath
        });
      }
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  enrollCourse() {
    this.modalCtrl.dismiss({ enrolled: true });
  }
}