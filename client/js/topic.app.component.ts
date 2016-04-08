import {Component, Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {CategoryComponent} from './category/category.component';
import {UserPopupComponent} from './user/user.popup.component';
import {UserStatusComponent} from './user/user.status.component';
import {RegisterPopupComponent} from './user/register.popup.component';
import {TopicContentComponent} from './topic/topic.content.component';
import {enableProdMode} from 'angular2/core';
enableProdMode();
@Component({
    selector: 'app-topic',
    templateUrl: '/views/partials/app-topic.html',
    directives: [UserPopupComponent, UserStatusComponent, RegisterPopupComponent, TopicContentComponent]
})

export class AppComponent {

    constructor() {

    }

}

