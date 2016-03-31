import {Component, Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {CategoryComponent} from './category/category.component.ts';

@Component({
    selector:'app',
    template: `
            <categories></categories>
    `,
    directives: [CategoryComponent]
})

export class AppComponent {

    constructor() {

    }

}


