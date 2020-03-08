# -*- coding: utf-8 -*-
import scrapy
from dangdang.items import DangdangItem
from scrapy.http import Request


class DdSpider(scrapy.Spider):
    name = 'dd'
    allowed_domains = ['www.dangdang.com']
    start_urls = ['http://category.dangdang.com/cp01.54.06.00.00.00.html']

    def parse(self, response):
        item = DangdangItem()
        # <a title=" Python编程快速上手 让繁琐工作自动化（Python3编程从入门到实践 新手学习必备用书） 
        # Python3编程从入门到实践美亚畅销Python编程入门图书 Python3实战指南 带你快速实现Python高效编程" 
        # href="http://product.dangdang.com/23997502.html" ddclick="act=normalResult_title&pos=23997502_3_1_p" 
        # name="itemlist-title" dd_name="单品标题" target="_blank" > Python编程快速上手 让繁琐工作自动化（
        # Python3编程从入门到实践 新手学习必备用书） Python3编程从入门到实践美亚畅销Python编程入门图书 Python3实战指南 带
        # 你快速实现Python高效编程</a>
        item['title'] = response.xpath("//a[@name='itemlist-title']/@title").extract() # 取所有a标签下class=itemlist-list，然后去title内容
        item['link'] = response.xpath("//a[@name='itemlist-title']/@href").extract()
        item['comment'] = response.xpath("//a[@name='itemlist-review']/text()").extract()
        yield item
        for i in range(2, 101):
            url = 'http://category.dangdang.com/pg'+str(i)+'-cp01.54.06.00.00.html'
            yield Request(url, callback=self.parse)
