import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie from 'lottie-web';
import { PaymentPage } from '../payment/payment.page';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.page.html',
  styleUrls: ['./enroll.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, PaymentPage]
})
export class EnrollPage implements OnInit, AfterViewInit {
  @Input() course: any;
  @Input() courseId: string = '';

  selectedPaymentMethod: string = 'card';
  
  paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with Visa, Mastercard, or Amex',
      icon: 'card'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: 'logo-paypal'
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      description: 'Fast and secure payment',
      icon: 'phone-portrait'
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      description: 'Pay with Apple Pay',
      icon: 'logo-apple'
    }
  ];

  courseAnimationConfigs: { [key: string]: string } = {
    fullstack: './assets/dev.json',
    javascript: 'https://assets10.lottiefiles.com/packages/lf20_2cwDXD.json',
    datascience: './assets/programming.json',
    uiux: 'https://assets10.lottiefiles.com/packages/lf20_6wutsrox.json'
  };

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Add original price for discount display
    if (this.course) {
      this.course.originalPrice = Math.round(this.course.price * 1.2); // 20% discount
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadCourseAnimation();
    }, 100);
  }

  loadCourseAnimation() {
    const container = document.getElementById('enroll-animation');
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

  selectPaymentMethod(methodId: string) {
    this.selectedPaymentMethod = methodId;
  }

  calculateSavings(): number {
    if (this.course?.originalPrice) {
      return this.course.originalPrice - this.course.price;
    }
    return 0;
  }

  async proceedToPayment() {
    const modal = await this.modalCtrl.create({
      component: PaymentPage,
      componentProps: {
        course: this.course,
        courseId: this.courseId,
        paymentMethod: this.selectedPaymentMethod
      },
      cssClass: 'payment-modal'
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      // Enrollment successful
      this.dismiss({ enrolled: true, courseId: this.courseId });
    }
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }
}