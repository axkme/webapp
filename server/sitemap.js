'use strict';
var sm = require('sitemap');
var models = require('./models');
/*
  { url: '/page-1/', changefreq: 'daily', priority: 0.3 },
  { url: '/page-2/', changefreq: 'monthly', priority: 0.7 },
  { url: '/page-3/' },// changefreq: 'weekly',  priority: 0.5
*/
module.exports = function () {
    var promise = new Promise(function (resolve, reject) {
        var categories, topics;
        models.Category.all().then(function (res_categories) {
            categories = JSON.stringify(res_categories);
            categories = JSON.parse(categories);
            models.Topic.all().then(function (res_topics) {
                topics = JSON.stringify(res_topics);
                topics = JSON.parse(topics);
                var site_urls = [];
                for (var i = 0; i < categories.length; i++) {
                    site_urls.push({ url: '/categories/' + categories[i].id, changefreq: 'monthly', priority: 0.5, lastmodISO: categories[i].updatedAt });
                }
                for (var i = 0; i < topics.length; i++) {
                    site_urls.push({ url: '/topics/' + topics[i].sid, changefreq: 'weekly', priority: 0.5, lastmodISO: topics[i].updatedAt });
                }
                site_urls.push({ url: '/agreement', changefreq: 'monthly', priority: 0.3 });
                var sitemap = sm.createSitemap({
                    hostname: 'http://www.axkme.com',
                    cacheTime: 86400,  //1days cache
                    urls: site_urls
                });
                resolve(sitemap)

            }).catch(function (err) {
                reject();
            });
        }).catch(function (err) {
            reject();
        });
   });
   return promise;
}