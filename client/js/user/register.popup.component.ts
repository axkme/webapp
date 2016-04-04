import {Component, Input} from 'angular2/core';
import {User} from './user';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
    selector: 'register-popup',
    templateUrl: '/views/partials/register-popup.html',
    providers: [UserService]
})
export class RegisterPopupComponent {

    visible: boolean
    hasError: boolean
    isLoad: boolean
    isRegisterSuccess: boolean
    animate: string
    errorMessage: string
    user: any
    registerUser: User
    userService: UserService
    popupEmitter = EmitterService.get("REGISTERPOPUP");
    userPopupEmitter = EmitterService.get("USERPOPUP");

    close() {
        this.animate = 'fadeOut';
        setTimeout(() => {
            this.visible = false;
        }, 600);
    }

    onRegisterSuccess(res) {
        this.registerUser = res;
        this.isLoad = false;
        this.hasError = false;
        this.isRegisterSuccess = true;
    }

    onRegisterError(err) {
        this.hasError = true;
        this.isLoad = false;
        if (err.status === 400) {
            this.errorMessage = 'มีผู้ใช้นามแฝงนี้แล้ว';
        }
        else if (err.status === 500) {
            this.errorMessage = 'ระบบขัดข้องกรุณาลองอีกครั้งหรือติดต่อผู้ดูแลเว็บไซต์';
        }
    }

    register() {
        if (this.user.username && this.user.password) {
            this.isLoad = true;
            this.userService.register(this.user).subscribe(
                data => this.onRegisterSuccess(data),
                err => this.onRegisterError(err),
                () => console.log('login success'));
        }
        else {
            this.hasError = true;
            this.errorMessage = 'กรุณากรอกข้อมูลให้ครบก่อนกดสมัครใช้งาน';
        }
    }

    toLogin() {
        this.isRegisterSuccess = false;
        this.visible = false;
        this.userPopupEmitter.emit(null);
    }

    constructor(_userService: UserService) {

        this.userService = _userService;
        this.visible = false;
        this.hasError = false;
        this.isLoad = false;
        this.isRegisterSuccess = false;
        this.registerUser = new User();

        this.popupEmitter.subscribe(msg => {
            this.animate = 'fadeIn';
            this.visible = true;
            this.hasError = false;
            this.isLoad = false;
            this.user = {};
        });
    }
}