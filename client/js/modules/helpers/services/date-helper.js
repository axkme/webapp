'use strict';
module.factory('DateHelper', ['$http', function ($http) {

    var months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

    return {
        convertDate: function (date) {
            date = new Date(date);
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            var d = date.getDate();
            var m = months[date.getMonth()];
            var y = date.getFullYear() + 543;
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
    };
}]);
