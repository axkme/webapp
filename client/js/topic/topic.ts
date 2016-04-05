export class Topic {
    id: number;
    category: number;
    sid: string;
    title: string;
    message: string;

    constructor() {
        this.id = 0;
        this.category = 0;
        this.title = '';
        this.message = '';
    }
}