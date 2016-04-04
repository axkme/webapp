import {Component, Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {CategoryComponent} from './category/category.component';
import {UserPopupComponent} from './user/user.popup.component';
import {UserStatusComponent} from './user/user.status.component';
import {RegisterPopupComponent} from './user/register.popup.component';
import {enableProdMode} from 'angular2/core';
enableProdMode();
@Component({
    selector:'app',
    templateUrl: '/views/partials/app.html',
    directives: [CategoryComponent, UserPopupComponent, UserStatusComponent, RegisterPopupComponent]
})

export class AppComponent {

    constructor() {

    }

}


