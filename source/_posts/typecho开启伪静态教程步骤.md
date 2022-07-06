---
title: typecho开启伪静态教程步骤
cover: >-
  https://npm.elemecdn.com/wayne-img@latest/blog/imgs/weijingtai.png
tags:
  - Typecho
categories:
  - 日新月异
  - 建站技巧
abbrlink: 2e306ea6
date: 2021-09-11 10:05:19
updated: 2021-09-11 12:51:19
---
Typecho后台设置永久链接后，会在域名后加上index.php，很多人都接受不了。那么我们如何去掉index.php呢？


1.配置服务器的rewrite规则

如果在保存上述配置的时候，typecho无法自动配置，那么你可能需要手动配置服务器的rewrite规则

Linux Apache 环境 (.htaccess)：

```php
<IfModule mod_rewrite.c>
RewriteEngine On
# 下面是在根目录，文件夹要修改路径
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.php/$1 [L]
</IfModule>
```

Linux Apache 环境（Nginx）：

```php
location / {
index index.html index.php;
if (-f $request_filename/index.html) {
rewrite (.*) $1/index.html break;
}
if (-f $request_filename/index.php) {
rewrite (.*) $1/index.php;
}
if (!-f $request_filename) {
rewrite (.*) /index.php;
}
}
```

Windows IIS 伪静态 (httpd.ini)：

```php
[ISAPI_Rewrite]
# 3600 = 1 hour
CacheClockRate 3600
RepeatLimit 32
# 中文tag解决
RewriteRule /tag/(.*) /index\.php\?tag=$1
# sitemapxml
RewriteRule /sitemap.xml /sitemap.xml [L]
RewriteRule /favicon.ico /favicon.ico [L]
# 内容页
RewriteRule /(.*).html /index.php/$1.html [L]
# 评论
RewriteRule /(.*)/comment /index.php/$1/comment [L]
# 分类页
RewriteRule /category/(.*) /index.php/category/$1 [L]
# 分页
RewriteRule /page/(.*) /index.php/page/$1 [L]
# 搜索页
RewriteRule /search/(.*) /index.php/search/$1 [L]
# feed
RewriteRule /feed/(.*) /index.php/feed/$1 [L]
# 日期归档
RewriteRule /2(.*) /index.php/2$1 [L]
# 上传图片等
RewriteRule /action(.*) /index.php/action$1 [L]
```

Typecho的IIS伪静态规则web.config:

```php
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="typecho" stopProcessing="true">
                    <match url="^(.*)$" ignoreCase="false" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" ignoreCase="false" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" ignoreCase="false" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="index.php/{R:1}" appendQueryString="true" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

nginx 配置:

```php
server {
        listen          80;
        server_name     yourdomain.com;
        root            /home/yourdomain/www/;
        index           index.html index.htm index.php;

        if (!-e $request_filename) {
            rewrite ^(.*)$ /index.php$1 last;
        }

        location ~ .*\.php(\/.*)*$ {
            include fastcgi.conf;
            fastcgi_pass  127.0.0.1:9000;
        }

        access_log logs/yourdomain.log combined;
    }
```

apache 配置:

```php
<IfModule mod_rewrite.c>
    RewriteEngine On

    RewriteBase /

    RewriteCond %{REQUEST_FILENAME} !-f

    RewriteCond %{REQUEST_FILENAME} !-d

    RewriteRule ^(.*)$ index.php [L,E=PATH_INFO:$1]

</IfModule>
```

2.后台配置typecho伪静态

如图，在typecho后台，开启伪静态，并选择你喜好的url形式：

 ![伪静态](https://npm.elemecdn.com/wayne-img@latest/blog/imgs/weijingtai.png) 

具体操作，根据本人实际操作如下

我的虚拟主机是apache的，在网站根目录找到.htaccess，有的没有可能是设置了隐藏文件，显示隐藏文件就能看到了。

然后编辑.htaccess文件，加入上文中对应的apache配置代码保存。然后去typecho程序后台，设置>永久链接，按照上文中图片的设置，保存即可。