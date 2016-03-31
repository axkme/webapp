import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    constructor(public http: Http) { }

    me() {
        return this.http.get('/api/v1/categories').map(res => res.json());
    }
   
}