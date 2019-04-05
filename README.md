# Angular Shop ADMIN
Angular 6 Shop admin dashboard. Content management system for managing an online shop for products which is also a web socket client. To run the server source code locally which is also the web socket client use [this](https://github.com/sartim/flask_shop_api.git) repo

#### Features

* Dashboard stats showing order counts: For today, yesterday, this month, last month, this year
* Dashboard databased graph using Armcharts4 for visualizing daily orders
* Dashboard & stats for high performing products
* Dashboard & stats for income from products
* Tracking login & logout events using Socket.io: Events trigger a notification & view change
* Real-time notification using Socket.io
* Role based access control
* Profile management
* Settings management
* Viewing order progress & changing order status
* List, Add, Update & Delete Products
* List, Add, Update & Delete Product Categories
* List, Add, Update & Delete Users
* List, Add, Update & Delete User Roles


#### Setup
    $ bower install
    $ npm install
    $ ng serve --open 


**Demo URL**

`https://angular-drf-admin.firebaseapp.com`

###### Login Credentials

username: `demo`

password: `qwertytrewq`