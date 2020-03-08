# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


class FirstspPipeline(object):
    def process_item(self, item, spider):
        for i in range(0, len(item['title'])):
            print('----------')
            print(item['title'][i])
        return item
