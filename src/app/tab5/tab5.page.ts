import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab5Page implements AfterViewInit, OnDestroy {
  debuggingAnimations: Map<string, AnimationItem> = new Map();
  currentTokens = 42;

  debuggingAnimationConfigs = {
    tokens: './assets/tokens-count.json',
    used: './assets/tokens-used.json',
    resets: './assets/timer-reset.json',
    debug: './assets/code.json',
    explanation: './assets/dev.json',
    career: './assets/job.json',
    interview: './assets/interview.json',
    analysis: './assets/code-analysis.json',
    performance: './assets/performance-check.json',
    security: './assets/security-scan.json',
    session1: './assets/bug-fix.json',
    session2: './assets/code-learn.json',
    session3: './assets/roadmap.json',
    limit: './assets/monthly-limit.json',
    usage: './assets/usage-tracker.json',
    remaining: './assets/tokens-left.json'
  };

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeDebuggingAnimations();
    }, 300);
  }

  ngOnDestroy() {
    this.debuggingAnimations.forEach((animation) => {
      animation.destroy();
    });
  }

  initializeDebuggingAnimations() {
    Object.keys(this.debuggingAnimationConfigs).forEach(animationId => {
      const container = document.getElementById(`${animationId}-animation`);
      if (container) {
        try {
          const animation = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: (this.debuggingAnimationConfigs as any)[animationId],
          });

          animation.addEventListener('data_failed', () => {
            console.error(`Failed to load animation for ${animationId}`);
            this.showFallbackIcon(container, animationId);
          });

          this.debuggingAnimations.set(animationId, animation);
        } catch (error) {
          console.error(`Error loading animation for ${animationId}:`, error);
          this.showFallbackIcon(container, animationId);
        }
      }
    });
  }

  showFallbackIcon(container: HTMLElement, animationId: string) {
    const icons: { [key: string]: string } = {
      tokens: 'diamond',
      used: 'flash',
      resets: 'time',
      debug: 'bug',
      explanation: 'document-text',
      career: 'school',
      interview: 'chatbubbles',
      analysis: 'analytics',
      performance: 'speedometer',
      security: 'shield-checkmark',
      session1: 'code',
      session2: 'book',
      session3: 'map',
      limit: 'calendar',
      usage: 'stats-chart',
      remaining: 'ellipse'
    };
    
    const iconName = icons[animationId] || 'help';
    container.innerHTML = `<ion-icon name="${iconName}" class="fallback-icon"></ion-icon>`;
  }

  async showTokenConfirm(action: string, description: string, cost: number) {
    const modal = await this.modalCtrl.create({
      component: TokenConfirmModal,
      componentProps: {
        action: action,
        description: description,
        cost: cost,
        currentTokens: this.currentTokens
      },
      cssClass: 'token-confirm-modal'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    if (data?.confirmed) {
      // Handle the confirmed action
      console.log(`Proceeding with ${action}...`);
      this.currentTokens -= cost;
      return true;
    }
    
    return false;
  }

  async showTokenPurchase(amount: number, price: string) {
    const modal = await this.modalCtrl.create({
      component: TokenPurchaseModal,
      componentProps: {
        amount: amount,
        price: price,
        currentTokens: this.currentTokens
      },
      cssClass: 'token-purchase-modal'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    if (data?.confirmed) {
      // Handle the purchase
      console.log(`Purchasing ${amount} tokens for ${price}...`);
      this.currentTokens += amount;
      return true;
    }
    
    return false;
  }

  async startDebugging() {
    const confirmed = await this.showTokenConfirm('Debug Code', 'Find and fix bugs in your code', 2);
    if (confirmed) {
      console.log('Starting debugging session...');
      // Add your actual debugging logic here
    }
  }

  async explainCode() {
    const confirmed = await this.showTokenConfirm('Explain Code', 'Understand complex code blocks', 1);
    if (confirmed) {
      console.log('Starting code explanation...');
      // Add your actual explanation logic here
    }
  }

  async careerGuidance() {
    const confirmed = await this.showTokenConfirm('Career Path', 'Personalized career advice', 3);
    if (confirmed) {
      console.log('Starting career guidance...');
      // Add your actual career guidance logic here
    }
  }

  async interviewPrep() {
    const confirmed = await this.showTokenConfirm('Interview Prep', 'Mock interviews & feedback', 2);
    if (confirmed) {
      console.log('Starting interview prep...');
      // Add your actual interview prep logic here
    }
  }

  async quickAnalyze() {
    const confirmed = await this.showTokenConfirm('Quick Analysis', 'Basic code review and suggestions', 1);
    if (confirmed) {
      console.log('Quick analysis...');
      // Add your actual quick analysis logic here
    }
  }

  async performanceCheck() {
    const confirmed = await this.showTokenConfirm('Performance Check', 'Optimization tips and bottlenecks', 2);
    if (confirmed) {
      console.log('Performance check...');
      // Add your actual performance check logic here
    }
  }

  async securityScan() {
    const confirmed = await this.showTokenConfirm('Security Scan', 'Vulnerability detection', 2);
    if (confirmed) {
      console.log('Security scan...');
      // Add your actual security scan logic here
    }
  }

  async purchase50Tokens() {
    const confirmed = await this.showTokenPurchase(50, '$9.99');
    if (confirmed) {
      console.log('50 tokens purchased!');
      // Add your actual purchase logic here
    }
  }

  async purchase100Tokens() {
    const confirmed = await this.showTokenPurchase(100, '$14.99');
    if (confirmed) {
      console.log('100 tokens purchased!');
      // Add your actual purchase logic here
    }
  }
}

// Token Confirm Modal Component
@Component({
  template: `
    <div class="token-modal-wrapper">
      <div class="token-modal-content">
        <div class="modal-header">
          <h2>Confirm Token Usage</h2>
          <ion-icon name="exit-outline" class="close-icon" (click)="dismiss()"></ion-icon>
        </div>

        <div class="modal-body">
          <div class="token-animation">
            <div class="lottie-container" [innerHTML]="getFallbackIcon()"></div>
          </div>
          
          <div class="action-details">
            <h3>{{ action }}</h3>
            <p>{{ description }}</p>
            
            <div class="token-cost">
              <span class="cost-label">Cost:</span>
              <span class="cost-amount">{{ cost }} tokens</span>
            </div>
            
            <div class="balance-after">
              <span class="balance-label">Balance after:</span>
              <span class="balance-amount">{{ currentTokens - cost }} tokens</span>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button class="cancel-btn" (click)="dismiss()">
            Cancel
          </button>
          <button class="confirm-btn" (click)="confirm()">
            Confirm
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .token-modal-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 20px;
    }

    .token-modal-content {
      background: white;
      border-radius: 20px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px 0;
        margin-bottom: 20px;
        
        h2 {
          font-size: 20px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }
        
        .close-icon {
          font-size: 24px;
          color: #666;
          cursor: pointer;
          padding: 4px;
        }
      }
      
      .modal-body {
        padding: 0 24px 24px;
        text-align: center;
        
        .token-animation {
          .lottie-container {
            width: 80px;
            height: 80px;
            margin: 0 auto 16px;
            border-radius: 20px;
            background: rgba(255, 107, 129, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            
            ion-icon {
              font-size: 40px;
              color: #FF6B81;
            }
          }
        }
        
        .action-details {
          h3 {
            font-size: 18px;
            font-weight: 700;
            color: #333;
            margin: 0 0 8px 0;
          }
          
          p {
            font-size: 14px;
            color: #666;
            margin: 0 0 20px 0;
            line-height: 1.4;
          }
          
          .token-cost {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            
            .cost-label {
              font-size: 16px;
              color: #666;
            }
            
            .cost-amount {
              font-size: 18px;
              font-weight: 800;
              color: #FF6B81;
            }
          }
          
          .balance-after {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0 0 0;
            
            .balance-label {
              font-size: 14px;
              color: #666;
            }
            
            .balance-amount {
              font-size: 16px;
              font-weight: 700;
              color: #333;
            }
          }
        }
      }
      
      .modal-actions {
        display: flex;
        gap: 12px;
        padding: 0 24px 20px;
        
        button {
          flex: 1;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:active {
            transform: scale(0.95);
          }
        }
        
        .cancel-btn {
          background: white;
          color: #666;
          border: 2px solid rgba(0, 0, 0, 0.1);
        }
        
        .confirm-btn {
          background: #FF6B81;
          color: white;
          border: 2px solid #FF6B81;
        }
      }
    }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
class TokenConfirmModal {
  action!: string;
  description!: string;
  cost!: number;
  currentTokens!: number;

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss({ confirmed: true }, 'confirm');
  }

  getFallbackIcon() {
    return '<ion-icon name="diamond" class="fallback-icon"></ion-icon>';
  }
}


// Token Purchase Modal Component
@Component({
  template: `
    <div class="token-modal-wrapper">
      <div class="token-modal-content">
        <div class="modal-header">
          <h2>Purchase Tokens</h2>
          <ion-icon name="exit-outline" class="close-icon" (click)="dismiss()"></ion-icon>
        </div>

        <div class="modal-body">
          <div class="token-animation">
            <div class="lottie-container" [innerHTML]="getFallbackIcon()"></div>
          </div>
          
          <div class="action-details">
            <h3>+{{ amount }} Tokens</h3>
            <p>Get instant access to all AI-powered features</p>
            
            <div class="token-purchase">
              <div class="purchase-detail">
                <span class="detail-label">Current Balance:</span>
                <span class="detail-value">{{ currentTokens }} tokens</span>
              </div>
              
              <div class="purchase-detail">
                <span class="detail-label">Added Tokens:</span>
                <span class="detail-value">+{{ amount }} tokens</span>
              </div>
              
              <div class="purchase-detail total">
                <span class="detail-label">New Balance:</span>
                <span class="detail-value">{{ currentTokens + amount }} tokens</span>
              </div>
            </div>

            <div class="price-section">
              <span class="price-label">Total Cost:</span>
              <span class="price-amount">{{ price }}</span>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button class="cancel-btn" (click)="dismiss()">
            Cancel
          </button>
          <button class="confirm-btn" (click)="confirm()">
            Purchase
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .token-modal-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 20px;
    }

    .token-modal-content {
      background: white;
      border-radius: 20px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px 0;
        margin-bottom: 20px;
        
        h2 {
          font-size: 20px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }
        
        .close-icon {
          font-size: 24px;
          color: #666;
          cursor: pointer;
          padding: 4px;
        }
      }
      
      .modal-body {
        padding: 0 24px 24px;
        text-align: center;
        
        .token-animation {
          .lottie-container {
            width: 80px;
            height: 80px;
            margin: 0 auto 16px;
            border-radius: 20px;
            background: rgba(255, 107, 129, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            
            ion-icon {
              font-size: 40px;
              color: #FF6B81;
            }
          }
        }
        
        .action-details {
          h3 {
            font-size: 18px;
            font-weight: 700;
            color: #333;
            margin: 0 0 8px 0;
          }
          
          p {
            font-size: 14px;
            color: #666;
            margin: 0 0 20px 0;
            line-height: 1.4;
          }
          
          .token-purchase {
            background: rgba(255, 107, 129, 0.05);
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 20px;
            
            .purchase-detail {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 0;
              
              .detail-label {
                font-size: 14px;
                color: #666;
              }
              
              .detail-value {
                font-size: 14px;
                font-weight: 600;
                color: #333;
              }
              
              &.total {
                border-top: 1px solid rgba(255, 107, 129, 0.2);
                margin-top: 8px;
                padding-top: 12px;
                
                .detail-value {
                  font-size: 16px;
                  font-weight: 700;
                  color: #FF6B81;
                }
              }
            }
          }
          
          .price-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            background: rgba(255, 107, 129, 0.1);
            border-radius: 12px;
            border: 1px solid rgba(255, 107, 129, 0.2);
            
            .price-label {
              font-size: 16px;
              font-weight: 600;
              color: #333;
            }
            
            .price-amount {
              font-size: 20px;
              font-weight: 800;
              color: #FF6B81;
            }
          }
        }
      }
      
      .modal-actions {
        display: flex;
        gap: 12px;
        padding: 0 24px 20px;
        
        button {
          flex: 1;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:active {
            transform: scale(0.95);
          }
        }
        
        .cancel-btn {
          background: white;
          color: #666;
          border: 2px solid rgba(0, 0, 0, 0.1);
        }
        
        .confirm-btn {
          background: #FF6B81;
          color: white;
          border: 2px solid #FF6B81;
        }
      }
    }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
class TokenPurchaseModal {
  amount!: number;
  price!: string;
  currentTokens!: number;

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss({ confirmed: true }, 'confirm');
  }

  getFallbackIcon() {
    return '<ion-icon name="diamond" class="fallback-icon"></ion-icon>';
  }
}
