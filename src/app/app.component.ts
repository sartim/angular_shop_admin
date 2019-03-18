import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from './_services';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    styles: [],
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  constructor(
        private authenticationService: AuthenticationService) {}
  ngOnInit() {
        this.authenticationService.getNewToken(); // To get new token
        this.authenticationService.getNewTokenHandler(); // To get new token after 2 minutes
    }
}
