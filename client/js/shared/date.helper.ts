import {Component} from 'angular2/core'
import {Injectable, EventEmitter} from 'angular2/core';

@Injectable()
export class DateHelper {
    months: any;

    constructor() {
        this.months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    }

    convertDate(date) {
        date = new Date(date);
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let d = date.getDate();
        let m = this.months[date.getMonth()];
        let y = date.getFullYear() + 543;
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        return hour + ':' + min + ':' + sec + ', ' + d + ' ' + m + ' ' + y;
    }

}