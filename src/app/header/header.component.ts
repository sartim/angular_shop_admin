import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styles: [`
      input.header-search-input {
          background: rgba(255,255,255,0.3);
          display: block;
          padding: 8px 8px 8px 72px;
          width: 100%;
          height: 24px;
          -webkit-transition: all 200ms ease;
          transition: all 200ms ease;
          border: none;
          font-size: 16px;
          appearance: textfield;
          font-weight: 400;
          outline: none;
          border-radius: 3px;
      }
      h1.logo-wrapper {
          margin: 0;
      }
      header .brand-logo {
          margin-left: 20px;
      }
      nav .brand-logo {
          position: absolute;
          color: #fff;
          display: inline-block;
          font-size: 2.1rem;
          padding: 0;
          white-space: nowrap;
          height: 0px;
      }
      header .brand-logo img {
          width: 172px;
          margin-top: 7px;
      }
      .notification-badge {
          position: relative;
          right: 5px;
          top: -20px;
          color: #ffffff;
          background-color: #FF4081;
          margin: 0 -.8em;
          border-radius: 50%;
          padding: 4px 5px;
      }
    `]
})
export class HeaderComponent implements  OnInit {

    ngOnInit() {
    }
}
