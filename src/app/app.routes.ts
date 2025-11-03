import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome',
  },
  {
    path: 'intro',
    loadComponent: () => import('./components/intro/intro.component').then(m => m.IntroComponent),
  },
  {
    path: 'profile', // Keep this if you want direct access to profile
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tab4',
    loadComponent: () => import('./tab4/tab4.page').then( m => m.Tab4Page)
  },
  {
    path: 'tab5',
    loadComponent: () => import('./tab5/tab5.page').then( m => m.Tab5Page)
  },
  {
    path: 'tab6',
    loadComponent: () => import('./tab6/tab6.page').then( m => m.Tab6Page)
  },
  {
    path: 'lesson',
    loadComponent: () => import('./pages/lesson/lesson.page').then( m => m.LessonPage)
  },
  {
    path: 'lessonmodal',
    loadComponent: () => import('./pages/lessonmodal/lessonmodal.page').then( m => m.LessonmodalPage)
  },
  {
    path: 'coursedetail',
    loadComponent: () => import('./pages/coursedetail/coursedetail.page').then( m => m.CoursedetailPage)
  },
  {
    path: 'chapter',
    loadComponent: () => import('./pages/chapter/chapter.page').then( m => m.ChapterPage)
  },
  {
    path: 'enroll',
    loadComponent: () => import('./pages/enroll/enroll.page').then( m => m.EnrollPage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./pages/payment/payment.page').then( m => m.PaymentPage)
  },
  {
    path: 'match',
    loadComponent: () => import('./pages/match/match.page').then( m => m.MatchPage)
  },
  {
    path: 'practice',
    loadComponent: () => import('./pages/practice/practice.page').then( m => m.PracticePage)
  },
  {
    path: 'continue',
    loadComponent: () => import('./pages/continue/continue.page').then( m => m.ContinuePage)
  },
  {
    path: 'findhackathons',
    loadComponent: () => import('./pages/findhackathons/findhackathons.page').then( m => m.FindhackathonsPage)
  },
  {
    path: 'exploreinternships',
    loadComponent: () => import('./pages/exploreinternships/exploreinternships.page').then( m => m.ExploreinternshipsPage)
  },
  {
    path: 'hackathondetails',
    loadComponent: () => import('./pages/hackathondetails/hackathondetails.page').then( m => m.HackathondetailsPage)
  },
  {
    path: 'internshipdetails',
    loadComponent: () => import('./pages/internshipdetails/internshipdetails.page').then( m => m.InternshipdetailsPage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
  {
    path: 'notification-settings',
    loadComponent: () => import('./pages/notification-settings/notification-settings.page').then( m => m.NotificationSettingsPage)
  },
  {
    path: 'privacy-security',
    loadComponent: () => import('./pages/privacy-security/privacy-security.page').then( m => m.PrivacySecurityPage)
  },
  {
    path: 'subscription-management',
    loadComponent: () => import('./pages/subscription-management/subscription-management.page').then( m => m.SubscriptionManagementPage)
  },
  {
    path: 'upgrade-plans',
    loadComponent: () => import('./pages/upgrade-plans/upgrade-plans.page').then( m => m.UpgradePlansPage)
  },
  {
    path: 'logout-confirm',
    loadComponent: () => import('./pages/logout-confirm/logout-confirm.page').then( m => m.LogoutConfirmPage)
  },
  
  
];