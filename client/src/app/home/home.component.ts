import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router'

import { User } from '../_models/index';
import { Order } from '../_models/index';

import { UserService } from '../_services/index';
import { OrderService } from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Observable } from 'rxjs/Observable';

import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styles: [``]
})

export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    users: User[] = [];
    orders: Order[] = [];
    orders_today: Order[] = [];
    orders_plot: Order[] = [];
    dataProvider: any = [];

    loggedUser: User;

    private chart: AmChart;

    private timer: any;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private orderService: OrderService,
        private router: Router,
        private AmCharts: AmChartsService,
        private http: Http) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            console.log(JSON.stringify(this.currentUser.user.username));
        } else {
          location.reload();
        }
    }

    ngOnInit() {
        // this.loadAllUsers();
        this.fetchUser(); // To fetch logged in user
        // this.authenticationService.getNewToken(); // To get new token
        // this.authenticationService.getNewTokenHandler(); // To get new token after 2 minutes
        this.loadOrdersToday(); // To get orders today
        // this.loadOrdersPlot(); // For orders graph with amcharts plugin
        //this.loadAllDelivered(0); // To get total orders

        // this.orderService.getOrdersPlot().forEach(orders_plot => {

        //     console.log(orders_plot);
        // });
        this.initScript();
    }

    initScript() {
        document.getElementById('header').style.display = 'block';
        document.getElementById('left-sidebar-nav').style.display = 'block';
        document.getElementById('fab_id').style.display = 'block';
        //document.getElementById('main').removeAttribute('id');
    }

    makeRandomDataProvider() {
        this.http.get('http://127.0.0.1:8000/api/v1/order/plot/', this.userService.jwt())
        .map(res => res.json()).subscribe(
            data => {
                this.orders_plot = data;
                this.orders_plot.forEach(m => this.dataProvider.push(
                    {
                        'date': m.date,
                        'value': m.value

                    }
                ));
            });
        return this.dataProvider;
    }

    // ngAfterViewInit() {
    //
    //     this.chart = this.AmCharts.makeChart('chartdiv', {
    //         'type': 'serial',
    //         'theme': 'light',
    //         'marginRight': 40,
    //         'marginLeft': 40,
    //         'autoMarginOffset': 20,
    //         'mouseWheelZoomEnabled':true,
    //         'dataDateFormat': 'YYYY-MM-DD',
    //         'valueAxes': [{
    //             'id': 'v1',
    //             'axisAlpha': 0,
    //             'position': 'left',
    //             'ignoreAxisWidth':true
    //         }],
    //         'balloon': {
    //             'borderThickness': 1,
    //             'shadowAlpha': 0
    //         },
    //         'graphs': [{
    //             'id': 'g1',
    //             'balloon':{
    //                 'drop':true,
    //                 'adjustBorderColor':false,
    //                 'color': '#ffffff'
    //             },
    //             'bullet': 'round',
    //             'bulletBorderAlpha': 1,
    //             'bulletColor': '#FFFFFF',
    //             'bulletSize': 5,
    //             'hideBulletsCount': 50,
    //             'lineThickness': 2,
    //             'title': 'red line',
    //             'useLineColorForBulletBorder': true,
    //             'valueField': 'value',
    //             'balloonText': '<span style="font-size:18px;">[[value]]</span>'
    //         }],
    //         'chartScrollbar': {
    //             'graph': 'g1',
    //             'oppositeAxis':false,
    //             'offset':30,
    //             'scrollbarHeight': 80,
    //             'backgroundAlpha': 0,
    //             'selectedBackgroundAlpha': 0.1,
    //             'selectedBackgroundColor': '#888888',
    //             'graphFillAlpha': 0,
    //             'graphLineAlpha': 0.5,
    //             'selectedGraphFillAlpha': 0,
    //             'selectedGraphLineAlpha': 1,
    //             'autoGridCount': true,
    //             'color': '#AAAAAA'
    //         },
    //         'chartCursor': {
    //             'pan': true,
    //             'valueLineEnabled': true,
    //             'valueLineBalloonEnabled': true,
    //             'cursorAlpha':1,
    //             'cursorColor': '#258cbb',
    //             'limitToGraph': 'g1',
    //             'valueLineAlpha': 0.2,
    //             'valueZoomable': true
    //         },
    //         'valueScrollbar':{
    //             'oppositeAxis': false,
    //             'offset': 50,
    //             'scrollbarHeight': 10
    //         },
    //         'categoryField': 'date',
    //         'categoryAxis': {
    //             'parseDates': true,
    //             'dashLength': 1,
    //             'minorGridEnabled': true
    //         },
    //         'export': {
    //             'enabled': true
    //         },
    //
    //         'dataProvider': this.makeRandomDataProvider()
    //     });
    //
    //     // Updates the chart every 2 seconds
    //     this.timer = setInterval(() => {
    //         // This must be called when making any changes to the chart
    //         this.AmCharts.updateChart(this.chart, () => {
    //             // this.chart.dataProvider = this.makeRandomDataProvider();
    //
    //             this.chart.addListener('init', () => {
    //                 // Do stuff after the chart is initialized
    //             });
    //             this.chart.addListener('rendered', () => {
    //                 this.chart.zoomToIndexes(this.chart.dataProvider.length - 40, this.chart.dataProvider.length - 1);
    //             });
    //         });
    //     }, 2000);
    // }

    ngOnDestroy() {
      clearInterval(this.timer);
      if (this.chart) {
          this.AmCharts.destroyChart(this.chart);
      }
    }

    deleteUser(id: number) {
      this.userService.delete(id).subscribe(() => { this.loadAllUsers() }, error => { console.log('Error #333'); });
    }

    private loadOrdersToday() {
      const orders_today_ = this.orderService.getOrdersToday();
      orders_today_.subscribe(orders_today => { this.orders_today = orders_today }, error => {console.log('Error #333');});
    }

    private loadOrders(offset) {
      this.orderService.getAllOrders(offset).subscribe(orders => { this.orders = orders }, error => { console.log('Error #333'); });
    }

   private loadOrdersPlot() {
      const orders_plot_ = this.orderService.getOrdersPlot();
      orders_plot_.subscribe(orders_plot => { this.orders_plot = orders_plot }, error => { console.log('Error #333'); });

    }

    private fetchUser(){
      const fetch_ = this.userService.fetch();
      fetch_.subscribe(users => { this.users = users; }, error => { console.log('Error #333'); });
    }

    private loadAllUsers() {
      const load_all_ = this.userService.getAll();
      load_all_.subscribe(users => { this.users = users; }, error => { console.log('Error #333'); });
    }
}
