import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

    constructor(public http: Http) { }

    getAll() {
        return this.http.get('/api/v1/categories').map(res => res.json());
    }
   
}