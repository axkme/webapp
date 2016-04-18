import {Component, Input} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';
import {Topic} from '../topic/topic.ts';
import {Category} from '../category/category.ts';
import {TopicService} from '../topic/topic.service.ts';
import {CategoryService} from './category.service.ts';
import {User} from '../user/user';

@Component({
    selector: 'category-header',
    templateUrl: '/views/partials/category-header.html',
    providers: [TopicService, CategoryService]
})
export class CategoryHeaderComponent {
    loginUser: User
    visible: boolean;
    isLoad: boolean;
    amimation: string;
    model: any;
    validateModel: any;
    isMini2: boolean;
    category: Category;
    categories: Category[];
    topicService: TopicService;
    categoryEmitter = EmitterService.get("CATEGORIES");
    popupEmitter = EmitterService.get("USERPOPUP");
    loginEmitter = EmitterService.get("LOGINUSER");

    categorySelect(id: number) {
        this.model.category = id;
    }

    toggleForm() {

        if (this.loginUser && this.loginUser.username) {
            if (this.visible) {
                if (this.isMini2) {
                    this.amimation = 'fadeOutDown';
                }
                else {
                    this.amimation = 'flipOutY';
                }
                setTimeout(() => {
                    this.visible = false;
                }, 700);
            }
            else {
                this.model = {};
                this.model.category = this.category.id;
                this.validateModel.isValid = true;
                this.visible = true;

                if (this.isMini2) {
                    this.amimation = 'fadeInUp';
                }
                else {
                    this.amimation = 'flipInY';
                }
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
            console.log(this.model);
            this.topicService.create(this.model).subscribe(
                data => this.onSubmitted(data),
                err => this.onSubmitError(err),
                () => console.log('post topic success'));
        }
    }

    getCategoriesSuccess(data) {
        this.categories = data;
        let locs = location.href.split('/');
        let id = parseInt(locs[locs.length - 1]);
        this.model.category = id;
        for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id == id) {
                this.category = this.categories[i];
            }
        }
    }

    constructor(_topicService: TopicService, _categoryService: CategoryService) {
        this.topicService = _topicService;
        this.model = {};
        this.categories = [];
        this.category = new Category();
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
        this.isMini2 = false;
        if (screen.availWidth === 768 && screen.availHeight === 1004 && navigator.userAgent.indexOf('Version/8.0') > -1) {
            this.isMini2 = true;
        }

        _categoryService.getAll().subscribe(
            data => this.getCategoriesSuccess(data),
            err => console.log(err),
            () => console.log('get categories success'));
    }
}