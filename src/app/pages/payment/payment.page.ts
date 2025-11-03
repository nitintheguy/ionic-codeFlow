import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PaymentPage implements OnInit {
  @Input() course: any;
  @Input() courseId: string = '';
  @Input() paymentMethod: string = 'card';

  processing: boolean = false;
  
  cardDetails = {
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  };

  paymentMethods = {
    card: { name: 'Credit/Debit Card', icon: 'card' },
    paypal: { name: 'PayPal', icon: 'logo-paypal' },
    googlepay: { name: 'Google Pay', icon: 'logo-google' },
    applepay: { name: 'Apple Pay', icon: 'logo-apple' }
  };

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Auto-format card number input
    setTimeout(() => {
      this.setupInputFormatting();
    }, 100);
  }

  setupInputFormatting() {
    // This would typically be handled by form controls
    // For demo purposes, we'll keep it simple
  }

  getPaymentMethodName(): string {
    return this.paymentMethods[this.paymentMethod as keyof typeof this.paymentMethods]?.name || 'Unknown';
  }

  getPaymentMethodIcon(): string {
    return this.paymentMethods[this.paymentMethod as keyof typeof this.paymentMethods]?.icon || 'card';
  }

  calculateTax(): number {
    const subtotal = this.course?.price || 0;
    return Math.round(subtotal * 0.1 * 100) / 100; // 10% tax
  }

  calculateTotal(): number {
    const subtotal = this.course?.price || 0;
    const tax = this.calculateTax();
    return Math.round((subtotal + tax) * 100) / 100;
  }

  changePaymentMethod() {
    // In a real app, this would navigate back to payment method selection
    this.dismiss({ changeMethod: true });
  }

  async processPayment() {
    if (this.processing) return;

    // Validate form for card payments
    if (this.paymentMethod === 'card' && !this.validateCardDetails()) {
      await this.showToast('Please fill in all card details correctly', 'warning');
      return;
    }

    this.processing = true;

    // Simulate payment processing
    setTimeout(async () => {
      this.processing = false;
      
      // Simulate successful payment (90% success rate for demo)
      const success = Math.random() > 0.1;
      
      if (success) {
        await this.showToast('Payment successful! Welcome to the course!', 'success');
        this.dismiss({ success: true, courseId: this.courseId });
      } else {
        await this.showToast('Payment failed. Please try again.', 'danger');
      }
    }, 2000);
  }

  validateCardDetails(): boolean {
    if (this.paymentMethod !== 'card') return true;

    const { number, expiry, cvv, name } = this.cardDetails;
    
    // Basic validation
    if (!number || !expiry || !cvv || !name) {
      return false;
    }

    // Simple format checks
    if (number.replace(/\s/g, '').length < 16) return false;
    if (!expiry.match(/^\d{2}\/\d{2}$/)) return false;
    if (cvv.length !== 3) return false;

    return true;
  }

  async showToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }
}