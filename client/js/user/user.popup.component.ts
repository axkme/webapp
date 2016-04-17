import {Component, Input} from 'angular2/core';
import {User} from './user';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
    selector: 'user-popup',
    templateUrl: '/views/partials/user-popup.html',
    providers: [UserService] 
})
export class UserPopupComponent {
   
    visible: boolean
    hasError: boolean
    isLoad: boolean
    isRegisterSuccess: boolean
    animate: string
    errorMessage: string
    user: any
    loginUser: User
    registerUser: User
    userService: UserService
    popupEmitter = EmitterService.get("USERPOPUP");
    loginEmitter = EmitterService.get("LOGINUSER");
    registerEmitter = EmitterService.get("REGISTERPOPUP");

    close () {
        this.animate = 'fadeOut';
        setTimeout(() => {
            this.visible = false;
        }, 600);
    }

    login() {
        if (this.user.username && this.user.password) {
            this.isLoad = true;
            this.userService.login(this.user).subscribe(
                data => this.onLoginSuccess(data),
                err => this.onLoginError(err),
                () => console.log('login success'));
        }
        else {
            this.hasError = true;
            this.errorMessage = 'กรุณากรอกข้อมูลให้ครบก่อนเข้าใช้งาน';
        }
    }

    onLoginSuccess(res) {
        this.loginUser = res;
        this.loginEmitter.emit(this.loginUser);
        Cookie.setCookie('authorization', res.token, 365, '/');
        this.isLoad = false;
    }

    onLoginError(err) {
        this.hasError = true;
        this.isLoad = false;
        if (err.status === 400) {
            this.errorMessage = 'นามแฝงหรือรหัสผ่านไม่ถูกต้อง';
        }
        else if (err.status === 500) {
            this.errorMessage = 'ระบบขัดข้องกรุณาลองอีกครั้งหรือติดต่อผู้ดูแลเว็บไซต์';
        }
    }

    onLoadUser(res) {
        this.loginUser = res;
        this.loginEmitter.emit(this.loginUser);
    }

    onLoadUserError(err) {
        this.loginUser = new User();
        Cookie.deleteCookie('authorization');
    }

    register() {
        this.visible = false;
        this.registerEmitter.emit(null);
    }

    toLogin() {
        this.isRegisterSuccess = false;
    }

    logout () {
        this.loginUser = new User();
        this.loginEmitter.emit(this.loginUser);
        Cookie.deleteCookie('authorization', '/');
        this.visible = false;
    }

    constructor(_userService: UserService) {

        this.userService = _userService;
        this.visible = false;
        this.hasError = false;
        this.isLoad = false;
        this.isRegisterSuccess = false;
        this.loginUser = new User();
        this.registerUser = new User();

        if (Cookie.getCookie('authorization')) {
            this.userService.me().subscribe(
                data => this.onLoadUser(data),
                err => this.onLoadUserError(err),
                () => console.log('get profile success'));
        }
        
        this.popupEmitter.subscribe(msg => {
            this.animate = 'fadeIn';
            this.visible = true;
            this.hasError = false;
            this.isLoad = false;
            this.user = {};
        });
    }
}