import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class TopicService {

    constructor(public http: Http) { }

    getAll () {
        return this.http.get('/api/v1/topics').map(res => res.json());
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