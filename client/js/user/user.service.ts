import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {User} from './user';

@Injectable()
export class UserService {

    loginUser: User

    constructor(public http: Http) {

    }

    me() {
        var headers = new Headers();
        headers.append('authorization', Cookie.getCookie('authorization'));
        return this.http.get('/api/v1/me', {
            headers: headers
        }).map(res => res.json());
    }

    login(userInput: any) {
        let creds = JSON.stringify(userInput);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/v1/login', creds, {
            headers: headers
        }).map(res => res.json());
    }

    register(userInput: any) {
        let creds = JSON.stringify(userInput);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/v1/users', creds, {
            headers: headers
        }).map(res => res.json());
    }

    saveUser(_user: User) {
        this.loginUser = _user;
    }

    removeUser() {
        this.loginUser = null;
    }

    getUser() {
        return this.loginUser;
    }
   
}