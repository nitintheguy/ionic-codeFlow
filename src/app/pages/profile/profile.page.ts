import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `
   <ion-content class="profile-content">
  <div class="profile-container">
    <h1>Create an Account</h1>
    <ion-list class="form">
<ion-item>
<ion-input label="Full Name:" labelPlacement="floating"
type="text"></ion-input>
</ion-item>
<ion-item>
<ion-input label="Email:" labelPlacement="floating"
 type="email"></ion-input>
</ion-item>
<ion-item>
<ion-input label="Enter Password:" labelPlacement="floating"
 type="password"></ion-input>
</ion-item>
<ion-item>
<ion-input label="Confirm Password:" labelPlacement="floating"
 type="password"></ion-input>
</ion-item>
<ion-button expand="block" class="submit-btn"
(click)="register()">Register</ion-button>
</ion-list>

    <ion-button expand="block" class="google-btn">
      <ion-icon name="logo-google"></ion-icon>
      Continue with Google
    </ion-button>

    <ion-button expand="block" class="apple-btn">
      <ion-icon name="logo-apple"></ion-icon>
      Continue with Apple
    </ion-button>

    <p class="signin-link">
      Already have an account? <a routerLink="/login">Sign in</a>
    </p>
  </div>
</ion-content>
  `,
  styles:[`.profile-content {
  --background: #FDF6E3;
  --color: black;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}
  .submit-btn{
    --background: #FF6B81;
  }

.pflogo-wrapper {
  margin: 40px auto 0;
  animation: moveUp 1.6s ease-out forwards;
}

.profile-logo {
  width: 180px; /* Responsive-friendly size */
  max-width: 100%;
  display: block;
  opacity: 0;
  transform: translateY(100px);
  animation: moveUp 1.6s ease-out forwards;
}

@keyframes moveUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.profile-container {
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
  margin-top: 40px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 1.6s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-container h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 32px;
  color: #333;
}

/* Google Button */
.google-btn {
  --background: #FFFFFF;
  --color: #333;
  --border-radius: 9999px;

  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  text-transform: none;
  margin-bottom: 16px;

}
  .form{
  border-radius: 12px;
  }
.google-btn ion-icon {
  font-size: 18px;
}

/* Apple Button */
.apple-btn {
  --background: #000000;
  --color: #FFFFFF;
  --border-radius: 9999px;
  
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  text-transform: none;
  margin-bottom: 24px;
}

.apple-btn ion-icon {
  font-size: 18px;
}

/* Sign-in link */
.signin-link {
  font-size: 16px;
  color: #666;
  opacity: 0.8;
  margin: 0;
}

.signin-link a {
  color: #FF6B81;
  text-decoration: none;
  font-weight: 600;
}

.signin-link a:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .profile-logo {
    width: 140px;
  }

  .profile-container h1 {
    font-size: 22px;
    margin-bottom: 28px;
  }

  .google-btn,
  .apple-btn {
    font-size: 15px;
  }

  .signin-link {
    font-size: 15px;
  }
}`],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
  
})
export class ProfilePage {
  
  constructor(private router: Router) { }

  register() {
    // Navigate to tabs page - this will show tab1, tab2, tab3
    this.router.navigate(['/tabs']);
  }
}