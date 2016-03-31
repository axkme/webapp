import {Component, Input} from 'angular2/core';
import {User} from './user.ts';
import {UserService} from './user.service.ts';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter.ts';


@Component({
    selector: 'user-popup',
    templateUrl: '/views/partials/user-popup.html',
    providers: [UserService] 
})
export class UserPopupComponent {
   
    visible: boolean
    hasError: boolean
    animate: string
    errorMessage: string
    user: any
    emitter = EmitterService.get("USERPOPUP");

    close () {
        this.animate = 'fadeOut';
        setTimeout(() => {
            this.visible = false;
        }, 600);
    }

    login () {
        console.log(this.user);
    }

    register () {

    }

    constructor() {

        this.visible = false;
        this.hasError = false;
        
        this.emitter.subscribe(msg => {
            this.animate = 'fadeIn';
            this.visible = true;
            this.user = {};
        });
    }
}