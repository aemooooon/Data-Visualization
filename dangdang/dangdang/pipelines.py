# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import pymysql

# Notes: Aemooooon
# 1. To install pymysql: conda install pymysql or pip install pymysql
# 2. edit connection under the pymysql lib/sitepackges/connection.py, change charset=utf8


class DangdangPipeline(object):
    def process_item(self, item, spider):
        conn = pymysql.connect(host="127.0.0.1", user="root", password="rootroot", database="hua")
        for i in range(0, len(item['title'])):
            title = item['title'][i]
            link = item['link'][i]
            comment = item['comment'][i]
            sql = "insert into bood(title, link, comment) values ('"+ title +"','"+ link +"', '"+ comment +"')"
            print(sql)
            conn.query(sql)
            conn.commit()
        conn.close()
        return item
