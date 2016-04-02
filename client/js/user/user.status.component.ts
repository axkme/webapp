import {Component, Input} from 'angular2/core';
import {User} from './user';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';

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