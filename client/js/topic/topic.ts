import {Category} from '../category/category';
export class Topic {
    id: number;
    category: Category;
    sid: string;
    title: string;
    message: string;
    comments: any;

    constructor() {
        this.id = 0;
        this.category = new Category();
        this.title = '';
        this.message = '';
        this.comments = [];
    }
}