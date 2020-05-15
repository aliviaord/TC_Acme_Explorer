import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { PayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripApplicationService } from 'src/app/services/trip-application.service';
import { InfoMessageService } from 'src/app/services/info-message.service';

@Component({
  selector: 'app-trip-application-payment',
  templateUrl: './trip-application-payment.component.html',
  styleUrls: ['./trip-application-payment.component.css']
})
export class TripApplicationPaymentComponent extends TranslatableComponent implements OnInit {

  private payPalConfig: PayPalConfig;

  constructor(private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private tripApplicationService: TripApplicationService,
    private infoMessageService: InfoMessageService) {
      super(translateService);
  }

  ngOnInit() {
    this.initConfig();
  }

  initConfig() {
    console.log(this.route.snapshot);
    const total = this.route.snapshot.queryParams['total'];
    const tripApplicationId = this.route.snapshot.queryParams['application'];

    this.payPalConfig = new PayPalConfig({
      currency: 'EUR',
      clientId: 'AeEDtAmV9QA1SfDQnoHtYAdcAqeKyTXWusnQmFHD97sGN2t-TzT7CEcPekagvmpjN6FVr3CKRbVaIVGX',
      createOrder: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: total
          }
        }]
      },
      advanced: {
        updateOrderDetails: {
          commit: true
        }
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('Transaction was approved, but not authorized yet', data, actions);
        actions.order.get().then(details => {
          console.log('Order details: ', details);
        });
      },
      onClientAuthorization: (data) => {
        this.tripApplicationService.getTripApplication(tripApplicationId)
          .then((tripApplication) => {
            const currentDate = new Date();
            tripApplication.status = 'ACCEPTED';
            tripApplication.paidDate = currentDate;

            this.tripApplicationService.updateTripApplication(tripApplication)
              .then((val) => {
                this.infoMessageService.notifyMessage('messages.tripApplication.payment.correct',
                  'text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative');
                this.router.navigate(['/tripApplications']);
              }).catch((err) => {
                console.error(err);
                this.infoMessageService.notifyMessage('messages.tripApplication.payment.failed',
                  'text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative');
              });
          }).catch((err) => {
            console.error(err);
          });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('onClick');
      }
    });
  }

}
