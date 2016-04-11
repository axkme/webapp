import {Component, Input} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';
import {Topic} from '../topic/topic.ts';
import {Category} from '../category/category.ts';
import {DateHelper} from '../shared/date.helper.ts';
import {TopicService} from '../topic/topic.service.ts';
import {User} from '../user/user';

@Component({
    selector: 'category-topic-list',
    templateUrl: '/views/partials/category-topic-list.html',
    providers: [TopicService, DateHelper]
})
export class TopicCategoryListComponent {
    dateHelper: DateHelper;
    topicLoaded: boolean;
    topics: Topic[];

    loadError(err: any) {
        console.log(err);
    }

    loadSuccess(data) {
        this.topics = data;
        setTimeout(() => {
            this.topicLoaded = true;
        }, 200);
    }

    displayDate(date: any) {
        return this.dateHelper.convertDate(date);
    }

    constructor(_topicService: TopicService, _dateHelper: DateHelper) {
        this.dateHelper = _dateHelper
        let locs = location.href.split('/');
        let id = locs[locs.length - 1];
        _topicService.getByCategory(id).subscribe(
            data => this.loadSuccess(data),
            err => this.loadError(err),
            () => console.log('Get topics success'));
    }
}