import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../_models';
import { Order } from '../_models';
import { UserService } from '../_services';
import { OrderService } from '../_services';
import { AlertService, AuthenticationService } from '../_services';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { HttpClient } from '@angular/common/http';
import {ScriptHelper} from '../_helpers/scripts.helpers';

am4core.useTheme(am4themes_animated);

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styles: [``]
})

export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    users: User;
    orders!: Order;
    ordersToday!: Order;
    ordersData!: Order;
    dataProvider: any = [];
    loggedUser!: User;
    returnUrl!: string;
    private chart!: am4charts.XYChart;
    private timer: any;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router,
        private zone: NgZone,
        private helpers: ScriptHelper,
        private http: HttpClient) {
        this.users = new User();
        // @ts-ignore
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser) {
           location.reload();
        }
    }

    ngOnInit() {
        this.helpers.initScript();
        // tslint:disable-next-line:no-string-literal
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
        // this.loadAllUsers();
        this.authenticationService.getNewTokenHandler(); // To get new token after 2 minutes
        // this.loadOrdersToday(); // To get orders today
        // this.loadOrdersPlot(); // For orders graph with amcharts plugin
        // this.loadAllDelivered(0); // To get total orders
        // this.orderService.getOrdersPlot().forEach((orders: any) => {
        //      console.log(orders);
        // });
    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            const chart = am4core.create('chartdiv', am4charts.XYChart);
            chart.paddingRight = 20;
            const data = [];
            let visits = 10;
            for (let i = 1; i < 366; i++) {
                // @ts-ignore
                visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
                // @ts-ignore
                data.push({ date: new Date(2018, 0, i), name: 'name' + i, value: visits });
            }
            chart.data = data;
            const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // @ts-ignore
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 35;
            const series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = 'date';
            series.dataFields.valueY = 'value';
            series.tooltipText = '{valueY.value}';
            chart.cursor = new am4charts.XYCursor();
            const scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;
            this.chart = chart;
        });
    }

    ngOnDestroy() {
      this.zone.runOutsideAngular(() => {
        if (this.chart) {
          this.chart.dispose();
        }
      });
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(1); }, (error: any) => { console.log('Error #333'); });
    }

    private loadOrdersToday() {
        this.orderService.getOrdersToday().subscribe(
            (orders: Order) => { this.ordersToday = orders; }, (error: any) => {console.log('Error #333'); });
    }

    private loadOrders(page: any) {
        this.orderService.getAllOrders(page).subscribe(
            (orders: Order) => { this.orders = orders; }, (error: any) => { console.log('Error #333'); });
    }

    private loadOrdersPlot() {
        this.orderService.getOrdersPlot().subscribe(
            (orders: Order) => { this.ordersData = orders; }, (error: any) => { console.log('Error #333'); });
    }

    private loadAllUsers(page: number) {
        this.userService.getUsers(page).subscribe(
            (users: User) => { this.users = users; }, (error: any) => { console.log('Error #333'); });
    }
}
