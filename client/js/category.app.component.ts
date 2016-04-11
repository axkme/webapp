import {Component, Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {CategoryComponent} from './category/category.component';
import {UserPopupComponent} from './user/user.popup.component';
import {UserStatusComponent} from './user/user.status.component';
import {RegisterPopupComponent} from './user/register.popup.component';
import {CategoryHeaderComponent} from './category/category.header.component';
import {TopicCategoryListComponent} from './category/category.topic.list.component';
import {enableProdMode} from 'angular2/core';
enableProdMode();
@Component({
    selector:'app',
    templateUrl: '/views/partials/app-category.html',
    directives: [CategoryComponent, UserPopupComponent, UserStatusComponent, RegisterPopupComponent, CategoryHeaderComponent, TopicCategoryListComponent]
})

export class AppComponent {

    constructor() {

    }

}


