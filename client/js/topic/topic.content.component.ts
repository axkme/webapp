import {Component, Input} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';
import {Topic} from './topic.ts';
import {Category} from '../category/category.ts';
import {DateHelper} from '../shared/date.helper.ts';
import {TopicService} from './topic.service.ts';
import {User} from '../user/user';

@Component({
    selector: 'topic-content',
    templateUrl: '/views/partials/topic-content.html',
    providers: [TopicService, DateHelper]
})
export class TopicContentComponent {
    dateHelper: DateHelper;
    topicLoaded: boolean;
    topic: Topic;

    loadError(err: any) {
        console.log(err);
    }

    loadSuccess(data) {
        console.log(data);
        this.topic = data;
        setTimeout(() => {
            this.topicLoaded = true;
        }, 200);
    }

    displayDate(date: any) {
        return this.dateHelper.convertDate(date);
    }

    constructor(_topicService: TopicService, _dateHelper: DateHelper) {
        this.dateHelper = _dateHelper
        this.topic = new Topic();
        let locs = location.href.split('/');
        let id = locs[locs.length - 1];
        _topicService.getById(id).subscribe(
            data => this.loadSuccess(data),
            err => this.loadError(err),
            () => console.log('Get categories success'));
    }
}