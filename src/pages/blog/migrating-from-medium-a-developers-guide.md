---
thumb_img_path: '/images/1565896772-migratin-from-medium-thumb.jpg'
content_img_path: '/images/1562650831-migratinfrommedium.png'
template: post
title: Migrating From Medium - A Developer's Guide
excerpt: >-
    The large migration from Medium has led to the creation of many useful tools
    to help you accomplish that. Including Stackbit's tool which is now open
    source
date: '2019-05-28'
author: src/data/staff/david.yml
subtitle: >-
    The large migration from Medium has led to the creation of many useful tools
    to help you accomplish that. Including Stackbit's tool which is now open
    source.
---

The tools available today rely mostly on the following methods of obtaining your content from Medium:

## RSS Feeds

Medium provides [officially supported](https://help.medium.com/hc/en-us/articles/214874118-RSS-feeds) RSS feeds that are available by prepending "/feed/" to your feed's URL.

For example - https://medium.com/feed/@prashantramnyc.

```xml
<ITEM>
    <TITLE><![CDATA[Difference between var, let and const in Javascript.]]></TITLE>
    <DESCRIPTION><![CDATA[<div class="medium-feed-item">...</div>]]></DESCRIPTION>
    <LINK>https://codeburst.io/difference-between-var-let-and-const-in-javascript-fbce2fba7b4?source=rss-eeafca132b1e------2</LINK>
    <GUID ISPERMALINK="FALSE">https://medium.com/p/fbce2fba7b4</GUID>
    <CATEGORY><![CDATA[codingbootcamp]]></CATEGORY>
    <CATEGORY><![CDATA[coding]]></CATEGORY>
    <CATEGORY><![CDATA[javascript-tips]]></CATEGORY>
    <CATEGORY><![CDATA[programming]]></CATEGORY>
    <CATEGORY><![CDATA[javascript]]></CATEGORY>
    <DC:CREATOR><![CDATA[Prashant Ram]]></DC:CREATOR>
    <PUBDATE>Tue, 21 May 2019 18:59:39 GMT</PUBDATE>
    <ATOM:UPDATED>2019-05-22T14:18:46.943Z</ATOM:UPDATED>
</ITEM>
```

**Pros:**

-   Officially supported
-   Works for both user and publication feeds

**Cons:**

-   Only latest articles are available - not a good solution for retrieving all your posts.
-   Feed won't necessarily have entire article content - as is the nature of RSS, some articles may only show an excerpt with a link to the full article.
-   Tools using this approach: the DEV [feed import](https://dev.to/settings/publishing-from-rss)

## JSON API

For the more adventurous, it's possible to retrieve a low-level JSON structure of feeds and posts.

This is achieved by using the "format=json" url parameter:

-   Feeds - https://medium.com/@prashantramnyc?format=json
-   Posts - https://medium.com/@rossbulat/image-processing-in-nodejs-with-jimp-174f39336153?format=json

```json
{
 "success":true,
 "payload":{
    "value":{
       "content":{
          "subtitle":"Full code example: combining images, watermarking, fonts and text",
          "bodyModel":{
             "paragraphs":[
                {
                   "name":"2e10",
                   "type":3,
                   "text":"Image Processing in NodeJS with Jimp",
                   "markups":[ ]
                },
                ...
             ]
          }
       }
    }
 }
}
```

Note that the JSON is returned with a "while(1)" that Medium put in place to prevent [JSON hijacking](https://haacked.com/archive/2009/06/25/json-hijacking.aspx/).

**Pros:**

-   Contains all available posts and information
-   Can be automated

**Cons:**

-   Undocumented and subject to breaking changes
-   Complex JSON structure
-   Can be limited by Medium's paywall

Tools using this approach: [gatsby-source-medium](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-medium), [mediumexporter](https://github.com/xdamman/mediumexporter)

## Export File

You can [request to download](https://medium.com/me/export) all your information from Medium. After making the request you'll receive a link to a zip file with the following directory structure:

```
blocks
bookmarks
claps
highlights
interests
posts
profile
pubs-following
sessions
topics-following
users-following
```

Each directory contains HTML files with minimal styling and structure.

The "posts" directory contains all your posts including drafts and comments.

**Pros:**

-   Officially supported
-   Contains all of your posts in one accessible place
-   Has lots of other info that a user might want when migrating to a new platform

**Cons:**

-   Requires the manual process of requesting the Zip file (although an Email with the link is sent very quickly in our experience) - can't easily be automated.
-   Posts are missing some information - the post tags aren't available and it's tricky to detect if a post is a full post or a comment.

Tools using this approach: [medium-2-md](https://github.com/gautamdhameja/medium-2-md), [mediumtoghost](https://github.com/ageitgey/medium_to_ghost), [medium-to-own-blog](https://github.com/mathieudutour/medium-to-own-blog), [export-medium-to-gatsby](https://github.com/jamischarles/export-medium-to-gatsby), Stackbit!

As each of these methods has its own set of drawbacks, tools often combine them to get all the content they require. For example - starting with the export zip file and augmenting it with information from the JSON API.

## At Stackbit

Stackbit makes it extremely easy to create modern websites powered by a variety of data sources including Medium.

At Stackbit we created a tool that works on the export file obtained from Medium. It converts the posts to Markdown files with a structure that is easy for us to transpile into any of our supported SSG's.

**The importer follows this flow:**

-   Extract information from each post's HTML - title, thumbnail, excerpt, images, etc. We use [cheerio](https://github.com/cheeriojs/cheerio) to parse out the information directly from the HTML:

```javascript
// This is the comment
get title() {
  return this.$('title').text().trim();
}

get subtitle() {
  return this.$('h4[class*="graf--subtitle"]').text().trim();
}
```

-   Download images - store them locally grouped by the post's slug

-   Simplify HTML - the exported HTML file is very noisy. We use [sanitize-html](https://github.com/apostrophecms/sanitize-html) to remove unneeded attributes and structural elements. This simplifies the task for the next step and helps us decouple ourselves from future changes to the format of the file. Some information is retained and manipulated to assist the next steps.

-   Convert post content to Markdown - combine with extracted info to export front matter with Markdown content. We replace external images with those that were downloaded. We use [turndown](https://github.com/domchristie/turndown) and take advantage of custom rules to preserve IFrames such as Twitter embeds:

```javascript
turndownService.addRule('twitter-tweet', {
    filter: (node) => {
        return node.nodeName === 'BLOCKQUOTE' && node.getAttribute('class') === 'twitter-tweet';
    },
    replacement: (innerHTML, node) => node.outerHTML
});
```

-   Extract profile information - the "profile.html" file contains the name of the user along with their Email address and social profiles that were connected to Medium. We create a JSON structure with this information to make it easily consumable.

At Stackbit the output can then be combined into our existing themes and transpiled to the user's SSG of choice.

The tool is [available on GitHub](https://github.com/stackbithq/stackbit-medium-importer) and is live on the [Stackbit site](https://www.stackbit.com/medium). We're always looking to improve things and welcome your input.
