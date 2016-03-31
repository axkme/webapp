import {Component, Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {CategoryComponent} from './category/category.component.ts';
import {UserPopupComponent} from './user/user.popup.component.ts';
import {UserStatusComponent} from './user/user.status.component.ts';

@Component({
    selector:'app',
    templateUrl: '/views/partials/app.html',
    directives: [CategoryComponent, UserPopupComponent, UserStatusComponent]
})

export class AppComponent {

    constructor() {

    }

}


