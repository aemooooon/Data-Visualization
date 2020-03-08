# -*- coding: utf-8 -*-
import scrapy
from firstsp.items import FirstspItem


class FstSpider(scrapy.Spider):
    name = 'fst'
    allowed_domains = ['aliwx.com.cn']
    start_urls = ['http://www.aliwx.com.cn/']

    def parse(self, response):
        item = FirstspItem()
        item['title'] = response.xpath("//p[@class='title']/text()").extract()
        yield item # to pipelines
