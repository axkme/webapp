import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class CommentService {

    constructor(public http: Http) { }

    getAll (id) {
        return this.http.get('/api/v1/comments/topic/' + id).map(res => res.json());
    }

    create (comment: any) {
        let data = JSON.stringify(comment);
        var headers = new Headers();
        headers.append('authorization', Cookie.getCookie('authorization'));
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/v1/comments', data, {
            headers: headers
        }).map(res => res.json());
    }

}