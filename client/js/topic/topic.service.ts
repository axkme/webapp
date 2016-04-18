import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class TopicService {

    constructor(public http: Http) { }

    getAll (page: number) {
        return this.http.get('/api/v1/topics?p='+ page).map(res => res.json());
    }

    getByCategory(id: number, page: number) {
        return this.http.get('/api/v1/category/topics/' + id + '?p=' + page).map(res => res.json());
    }

    getById(sid) {
        return this.http.get('/api/v1/topics/' + sid).map(res => res.json());
    }

    create (topic: any) {
        let data = JSON.stringify(topic);
        var headers = new Headers();
        headers.append('authorization', Cookie.getCookie('authorization'));
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/v1/topics', data, {
            headers: headers
        }).map(res => res.json());
    }

}