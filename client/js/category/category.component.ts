import {Component, Input} from 'angular2/core';
import {Category} from './category.ts';
import {CategoryService} from './category.service.ts';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'categories',
    templateUrl: '/views/partials/category.html',
    providers: [CategoryService],
    
})
export class CategoryComponent {
    categoryLoaded: boolean;
    categories: Category [];

    logError(err: any) {
        console.log(err);
    }

    logSuccess() {
        var source = Observable.create(observer => {
            setTimeout(() => {
                this.categoryLoaded = true;
            }, 200)
        });
        source.forEach();
 
    }

    constructor(categoryService: CategoryService) {
        categoryService.getAll().subscribe(
            data => this.categories = data,
            err => this.logError(err),
            () => this.logSuccess());
    }
}