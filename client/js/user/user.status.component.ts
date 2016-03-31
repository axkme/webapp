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

    emitter = EmitterService.get("USERPOPUP");

    openPopup () {
        this.emitter.emit(null);
    }

    constructor() {
        
    }
}