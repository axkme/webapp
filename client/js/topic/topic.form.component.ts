import {Component, Input} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';
import {Topic} from './topic.ts';
import {Category} from '../category/category.ts';
import {TopicService} from './topic.service.ts';
import {User} from '../user/user';

@Component({
    selector: 'topic-form',
    templateUrl: '/views/partials/topic-form.html',
    providers: [TopicService]
})
export class TopicFormComponent {
    loginUser: User
    visible: boolean;
    isLoad: boolean;
    amimation: string;
    model: Topic;
    validateModel: any;
    categories: Category[];
    topicService: TopicService;
    categoryEmitter = EmitterService.get("CATEGORIES");
    popupEmitter = EmitterService.get("USERPOPUP");
    loginEmitter = EmitterService.get("LOGINUSER");

    categorySelect(id: number) {
        this.model.category = id;
    }

    toggleForm() {

        alert(screen.availWidth + ', ' + screen.availHeight + ', ' + navigator.userAgent);

        if (this.loginUser && this.loginUser.username) {
            if (this.visible) {
                this.amimation = 'flipOutY';
                setTimeout(() => {
                    this.visible = false;
                }, 700);
            }
            else {
                this.model = new Topic();
                this.validateModel.isValid = true;
                this.visible = true;
                this.amimation = 'flipInY';
            }
        }
        else {
            this.popupEmitter.emit(null);
        }
    }

    validate() {
        this.validateModel.isValid = true;
        if (!this.model.title) {
            this.validateModel.isValid = false;
            this.validateModel.message = 'กรุณากรอกหัวข้อคำถามก่อนกดส่ง'
        }
        else if (this.model.title.length > 250) {
            this.validateModel.isValid = false;
            this.validateModel.message = 'หัวข้อคำถามยาวเกินไป'
        }
        else if (!this.model.message) {
            this.validateModel.isValid = false;
            this.validateModel.message = 'กรุณากรอกรายละเอียดคำถามก่อนกดส่ง'
        }
        else if (this.model.message.length > 4000) {
            this.validateModel.isValid = false;
            this.validateModel.message = 'รายละเอียดคำถามยาวเกินไป'
        }
        else if (!this.model.category) {
            this.validateModel.isValid = false;
            this.validateModel.message = 'กรุณาเลือกหมวดหมู่ของคำถามก่อนกดส่ง'
        }
    }

    onSubmitted(data: any) {
        window.location.href = '/topics/' + data.sid;
    }

    onSubmitError(error: any) {
        setTimeout(() => {
            this.isLoad = false;
        }, 500);
        this.validateModel.isValid = false;
        this.validateModel.message = 'ส่งคำถามล้มเหลวกรุณาลองอีกครั้งหรือติดต่อผู้ดูแลเว็บไซต์'

    }

    submit() {
        this.validate();
        if (this.validateModel.isValid) {
            this.isLoad = true;
            this.topicService.create(this.model).subscribe(
                data => this.onSubmitted(data),
                err => this.onSubmitError(err),
                () => console.log('post topic success'));
        }
    }

    constructor(_topicService: TopicService) {
        this.topicService = _topicService;
        this.model = new Topic();
        this.categories = [];
        this.amimation = 'zoomIn';
        this.isLoad = false;
        this.validateModel = {
            isValid: true
        };
        this.categoryEmitter.subscribe(msg => {
            this.categories = msg;
        });
        this.loginEmitter.subscribe(msg => {
            this.loginUser = msg;
        });
    }
}