﻿import {Component, Input} from 'angular2/core';
import {User} from './user.ts';
import {UserService} from './user.service.ts';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter.ts';
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
    animate: string
    errorMessage: string
    user: any
    loginUser:User
    userService: UserService
    popupEmitter = EmitterService.get("USERPOPUP");
    loginEmitter = EmitterService.get("LOGINUSER");

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
        this.userService.saveUser(this.loginUser);
        Cookie.setCookie('authorization', res.token);
        this.isLoad = false;
    }

    onLoginError(err: any) {
        this.hasError = true;
        this.isLoad = false;
        if (err.status === 400) {
            this.errorMessage = 'นามแฝงหรือรหัสผ่านไม่ถูกต้อง';
        }
        else if (err.status === 500) {
            this.errorMessage = 'ระบบขัดข้องกรุณาลองอีกครั้งหร์อติดต่อผู้ดูแลเว็บไซต์';
        }
    } 

    onLoadUser(res) {
        this.loginUser = res;
        this.loginEmitter.emit(this.loginUser);
        this.userService.saveUser(this.loginUser);
    }

    onLoadUserError(err) {
        this.loginUser = new User();
        Cookie.deleteCookie('authorization');
        this.userService.removeUser();
    }

    register () {

    }

    logout () {
        this.loginUser = new User();
        this.loginEmitter.emit(this.loginUser);
        Cookie.deleteCookie('authorization');
        this.userService.removeUser();
        this.visible = false;
    }

    constructor(_userService: UserService) {

        this.userService = _userService;
        this.visible = false;
        this.hasError = false;
        this.isLoad = false;
        this.loginUser = new User();

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