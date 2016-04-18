import {Component, Input} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';
import {Topic} from './topic.ts';
import {Category} from '../category/category.ts';
import {DateHelper} from '../shared/date.helper.ts';
import {TopicService} from './topic.service.ts';
import {User} from '../user/user';

@Component({
    selector: 'topic-list',
    templateUrl: '/views/partials/topic-list.html',
    providers: [TopicService, DateHelper]
})
export class TopicListComponent {
    topicService: TopicService;
    dateHelper: DateHelper;
    topicLoaded: boolean;
    onLoadMore: boolean;
    hasMore: boolean;
    page: number;
    limits: number;
    topics: Topic[];

    loadError(err: any) {
        console.log(err);
    }

    loadSuccess(data) {
        this.topics = data;
        if (data.length < this.limits) {
            this.hasMore = false;
        }
        setTimeout(() => {
            this.topicLoaded = true;
        }, 200);
    }

    loadMoreSuccess(data) {
        if (data.length < this.limits) {
            this.hasMore = false;
        }
        for (let i = 0; i < data.length; i++) {
            this.topics.push(data[i]);
        }
        setTimeout(() => {
            this.onLoadMore = false;
        }, 200);
    }

    loadMoreError(err: any) {
        console.log(err);
        this.page -= 1;
    }

    loadMore() {
        this.page += 1;
        this.onLoadMore = true;
        console.log('here');
        this.topicService.getAll(this.page).subscribe(
            data => this.loadMoreSuccess(data),
            err => this.loadMoreError(err),
            () => console.log('Get more topics success'));
    }

    displayDate(date: any) {
        return this.dateHelper.convertDate(date);
    }

    constructor(_topicService: TopicService, _dateHelper: DateHelper) {
        this.onLoadMore = false;
        this.hasMore = true;
        this.page = 1;
        this.limits = 50;
        this.dateHelper = _dateHelper
        this.topicService = _topicService;
        this.topicService.getAll(this.page).subscribe(
            data => this.loadSuccess(data),
            err => this.loadError(err),
            () => console.log('Get topics success'));
    }
}