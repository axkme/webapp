import {Component, Input} from 'angular2/core';
import {User} from './user.ts';
import {UserService} from './user.service.ts';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter.ts';

@Component({
    selector: 'user-status',
    templateUrl: '/views/partials/user-status.html',
    providers: [UserService]
})
export class UserStatusComponent {

    popupEmitter = EmitterService.get("USERPOPUP");
    loginEmitter = EmitterService.get("LOGINUSER");
    loginUser: User

    openPopup() {
        this.popupEmitter.emit(null);
    }

    constructor() {
        this.loginUser = new User();
        this.loginEmitter.subscribe(msg => {
            this.loginUser = msg;
        });
    }
}