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
  IonButtons, // ADD THIS
  IonFooter, // ADD THIS
  ModalController 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButton,
    IonIcon,
    IonButtons, // ADD THIS
    IonFooter, // ADD THIS
    CommonModule, 
    FormsModule
  ]
})
export class LessonPage implements OnInit {
  @Input() lesson: any = {};

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Add default content if not provided
    if (!this.lesson.concepts) {
      this.lesson.concepts = [
        'Basic syntax and structure',
        'Practical examples',
        'Common patterns',
        'Best practices'
      ];
    }
    
    if (!this.lesson.content) {
      this.lesson.content = 'This lesson covers fundamental concepts that will build your programming foundation. Follow along with the examples and try the exercises to reinforce your learning.';
    }
    
    if (!this.lesson.duration) {
      this.lesson.duration = '15 min';
    }
    
    if (!this.lesson.exercises) {
      this.lesson.exercises = 5;
    }
  }

  completeLesson() {
    this.modalCtrl.dismiss({ completed: true });
  }

  close() {
    this.modalCtrl.dismiss({ completed: false });
  }


  
}