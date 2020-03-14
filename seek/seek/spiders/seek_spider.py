# -*- coding: utf-8 -*-
import scrapy
from seek.items import SeekItem
from scrapy.http import Request


class SeekSpiderSpider(scrapy.Spider):
    name = 'seek_spider'
    allowed_domains = ['seek.co.nz']
    start_urls = ['https://www.seek.co.nz/python-jobs?page=1']

    def parse(self, response):
        item = SeekItem()
        item['title'] = response.xpath('//a[@data-automation="jobTitle"]/text()').extract()
        item['date'] = response.xpath('//span[@data-automation="jobListingDate"]/text()').extract()
        yield item
        for i in list(range(2, 25)):
            url = 'https://www.seek.co.nz/python-jobs?page='+str(i)
            yield Request(url, callback=self.parse)
