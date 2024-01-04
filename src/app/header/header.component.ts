import { Component, OnInit, OnDestroy } from '@angular/core';
import {element} from 'protractor';
import {OrderService} from '../_services';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {OrderDetail} from '../_models';


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
      .mobile-nav {
            margin-left: 10px;
      }
      @media only screen and (min-width: 1026px) {
        .mobile-nav {
            display: none;
        }
      }
      .brand-logo {
          margin-top: 30px
      }
    `]
})
export class HeaderComponent implements  OnInit {
    isOpen: boolean;

    constructor() {
        this.isOpen = false;
    }

    ngOnInit() {
        //
    }

    toggleNav() {
        const instance = document.getElementById('side-nav');
        if (!this.isOpen) {
            if (instance) {
                instance.style.width = '250px';
                this.isOpen = true;
            }
        } else {
            if (instance) {
                instance.style.width = '0';
                this.isOpen = false;
            }
        }
    }
}
