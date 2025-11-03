import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  ModalController 
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import lottie from 'lottie-web';

@Component({
  selector: 'app-lessonmodal',
  templateUrl: './lessonmodal.page.html',
  styleUrls: ['./lessonmodal.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule, 
    FormsModule
  ]
})
export class LessonmodalPage implements OnInit {
  @Input() message: string = '';
  @Input() subtitle: string = '';
  @Input() node: any;
  @Input() animation: string = 'success';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadAnimation();
    }, 100);
  }

  loadAnimation() {
    const container = document.getElementById(`modal-animation-${this.animation}`);
    
    if (container) {
      // Clear container first
      container.innerHTML = '';
      
      // Determine which animation to load based on the type
      const animationPath = this.animation === 'success' 
        ? 'assets/Success.json'
        : 'assets/locked.json';

      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: animationPath
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  getHeaderTitle(): string {
    return this.animation === 'success' ? 'Lesson Completed' : 'Complete Previous Lessons';
  }
}