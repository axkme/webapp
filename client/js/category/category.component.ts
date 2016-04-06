import {Component, Input} from 'angular2/core';
import {Category} from './category.ts';
import {CategoryService} from './category.service';
import {Observable} from 'rxjs/Rx';
import {EmitterService} from '../shared/emitter';

@Component({
    selector: 'categories',
    templateUrl: '/views/partials/category.html',
    providers: [CategoryService],
    
})
export class CategoryComponent {
    categoryLoaded: boolean;
    categories: Category[];
    loginEmitter = EmitterService.get("USERPOPUP");
    registerEmitter = EmitterService.get("REGISTERPOPUP");
    categoryEmitter = EmitterService.get("CATEGORIES");

    logError(err: any) {
        console.log(err);
    }

    logSuccess(data) {
        this.categories = data;
        this.categoryEmitter.emit(this.categories);
        var source = Observable.create(observer => {
            setTimeout(() => {
                this.categoryLoaded = true;
            }, 200);
        });
        source.forEach();
 
    }

    openRegister() {
        this.registerEmitter.emit(null);
    }

    openLogin() {
        this.loginEmitter.emit(null);
    }

    constructor(categoryService: CategoryService) {
        categoryService.getAll().subscribe(
            data => this.logSuccess(data),
            err => this.logError(err),
            () => console.log('Get categories success'));
    }
}