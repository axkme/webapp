import {Component, Input} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';
import {Topic} from './topic.ts';
import {Category} from '../category/category.ts';
import {DateHelper} from '../shared/date.helper.ts';
import {TopicService} from './topic.service.ts';
import {CommentService} from '../comment/comment.service.ts';
import {Comment} from '../comment/comment.ts';
import {User} from '../user/user';

@Component({
    selector: 'topic-content',
    templateUrl: '/views/partials/topic-content.html',
    providers: [TopicService, CommentService, DateHelper]
})
export class TopicContentComponent {
    loginUser: User;
    commentService: CommentService;
    dateHelper: DateHelper;
    topicLoaded: boolean;
    onCommentLoad: boolean;
    onPostComment: boolean;
    showWarning: boolean;
    topic: Topic;
    model: any;
    comments: Comment[];
    popupEmitter = EmitterService.get("USERPOPUP");
    loginEmitter = EmitterService.get("LOGINUSER");

    loadError(err: any) {
        console.log(err);
    }

    loadCommentSuccess(data) {
        this.comments = data;
        this.onCommentLoad = false;
    }

    loadSuccess(data) {
        this.topic = data;
        this.model.message = '';
        this.model.topic_id = this.topic.id;
        setTimeout(() => {
            this.topicLoaded = true;
        }, 200);
        this.loadComment();
    }

    loadComment() {
        this.onCommentLoad = true;
        this.commentService.getAll(this.topic.id).subscribe(
            data => this.loadCommentSuccess(data),
            err => this.loadError(err),
            () => console.log('Get comments success'));
    }

    postCommentSuccess(data: any) {
        this.onPostComment = false;
        this.model.message = '';
        this.loadComment();
    }

    displayDate(date: any) {
        return this.dateHelper.convertDate(date);
    }

    submitComment() {
        if (this.loginUser && this.loginUser.username) {
            if (this.model.message && this.model.topic_id) {
                this.showWarning = false;
                this.onPostComment = true;
                this.commentService.create(this.model).subscribe(
                    data => this.postCommentSuccess(data),
                    err => this.loadError(err),
                    () => console.log('Post comment success'));
            }
            else {
                this.showWarning = true;
            }
        }
        else {
            this.popupEmitter.emit(null);
        }
    }

    constructor(_topicService: TopicService, _commentService: CommentService, _dateHelper: DateHelper) {
        this.dateHelper = _dateHelper
        this.topic = new Topic();
        this.model = {};
        this.onCommentLoad = false;
        this.onPostComment = false;
        this.showWarning = false;
        this.commentService = _commentService;
        let locs = location.href.split('/');
        let id = locs[locs.length - 1];
        this.loginEmitter.subscribe(msg => {
            this.loginUser = msg;
        });
        _topicService.getById(id).subscribe(
            data => this.loadSuccess(data),
            err => this.loadError(err),
            () => console.log('Get categories success'));
        
    }
}