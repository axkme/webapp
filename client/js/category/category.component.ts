import {Component, Input} from 'angular2/core';
import {Category} from './category.ts';
import {CategoryService} from './category.service.ts';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'categories',
    template: `
    <img class="load" *ngIf="!categoryLoaded" src="img/balls.gif"/>
    <div *ngIf="categoryLoaded">
    <div class="col-xs-2 animated fadeIn" *ngFor="#category of categories">
        <div class="category">
            <i class="fa {{category.icon}}"></i>
            <span>{{category.name}}</span>
        </div>
    </div>
    <div>
  `,
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
            console.log('Started');
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