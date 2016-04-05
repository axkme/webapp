import {Component, Input} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';
import {Topic} from './topic.ts';
import {Category} from '../category/category.ts';

@Component({
    selector: 'topic-form',
    templateUrl: '/views/partials/topic-form.html',
    providers: []
})
export class TopicFormComponent {
    visible: boolean
    model: Topic;
    categories: Category[];
    categoryEmitter = EmitterService.get("CATEGORIES");

    categorySelect(id: number) {
        console.log(id);
    }
    toggleForm () {
        this.visible = !this.visible;
    }
    constructor() {
        this.model = new Topic();
        this.categories = [];

        this.categoryEmitter.subscribe(msg => {
            this.categories = msg;
        });
    }
}