import {Component, OnDestroy, OnInit} from '@angular/core';
import { AlertService } from '../_services';
import {Subscription} from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styles: [`
        #snackbar {
          visibility: hidden; /* Hidden by default. Visible on click */
          min-width: 250px; /* Set a default minimum width */
          margin-left: -125px; /* Divide value of min-width by 2 */
          background-color: #333; /* Black background color */
          color: #fff; /* White text color */
          text-align: center; /* Centered text */
          border-radius: 2px; /* Rounded borders */
          padding: 16px; /* Padding */
          position: fixed; /* Sit on top of the screen */
          z-index: 1; /* Add a z-index if needed */
          left: 50%; /* Center the snackbar */
          bottom: 30px; /* 30px from the bottom */
        }
        /* Show the snackbar when clicking on a button (class added with JavaScript) */
        #snackbar.show {
          visibility: visible; /* Show the snackbar */
          /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
          However, delay the fade out process for 2.5 seconds */
          -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
          animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }
        /* Animations to fade the snackbar in and out */
        @-webkit-keyframes fadein {
          from {bottom: 0; opacity: 0;}
          to {bottom: 30px; opacity: 1;}
        }
        @keyframes fadein {
          from {bottom: 0; opacity: 0;}
          to {bottom: 30px; opacity: 1;}
        }
        @-webkit-keyframes fadeout {
          from {bottom: 30px; opacity: 1;}
          to {bottom: 0; opacity: 0;}
        }
        @keyframes fadeout {
          from {bottom: 30px; opacity: 1;}
          to {bottom: 0; opacity: 0;}
        }
    `]
})

export class AlertComponent implements OnDestroy {
    private subscription: Subscription;
    message: any;
    msg: any;
    visibility: any;

    constructor(private alertService: AlertService) {
        // subscribe to alert messages
        this.subscription = alertService.getMessage().subscribe(
            (message: any) => {
                this.message = JSON.parse(JSON.stringify(message));
                this.msg = this.message.text.error.message;
                const status = this.message.text.status;
                if (status === 0 || status === 500) {
                    this.msg = 'Internal Server Error';
                }
                this.visibility = 'show';
                setTimeout(() => { this.visibility = '' }, 3000);
            });
    }


    ngOnDestroy(): void {
        // unsubscribe on destroy to prevent memory leaks
        this.subscription.unsubscribe();
    }
}
