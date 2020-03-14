# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import os
import csv


class SeekPipeline(object):
    def __init__(self):
        store_file = os.path.dirname(__file__) + '/spiders/articles.csv'
        self.file = open(store_file, 'a+', encoding="utf-8", newline='\n')
        self.writer = csv.writer(self.file, dialect="excel")

    def process_item(self, item, spider):
        print("writing...")
        if item['title']:
            self.writer.writerows([item['title'], item['date']])
        return item

    def close_spider(self, spider):
        self.file.close()
