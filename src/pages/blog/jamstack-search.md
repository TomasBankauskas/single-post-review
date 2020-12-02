---
thumb_img_path: '/images/1578578285-jamstacksearch570.png'
content_img_path: '/images/1578578209-jamstacksearch.png'
template: post
title: Searching the JAMStack
excerpt: >-
    Raymond Camden explores some options for adding site search functionality to a
    JAMStack site.
date: '2020-01-09'
author: src/data/authors/raymond-camden.yml
subtitle: >-
    Raymond Camden explores some options for adding site search functionality to a
    JAMStack site.
---

Congratulations. You've successfully gotten someone to visit your web site. Unfortunately, they aren't able to find what they need and promptly leave your site to go look at cat videos.

I feel your pain. Making a large site more usable for visitors is a hard task, and providing the ability to search goes a long way to helping them get what they need. Using search in the JAMStack is absolutely possible and in this article I'll show you a couple of ways of accomplishing that.

## All roads lead to Google...

It should come as no surprise that the first thing we'll discuss when talking about search is Google. Google is a _lot_ of things, but primarily they're a search engine and can help expose your content in multiple ways. Let's take a look at the options Google provides.

Let me begin by saying that I'm not going to talk about SEO. That's an important topic and worthy of its own article. While it directly relates to how well Google can find what your site covers, the assumption here is that we will be searching only against our particular site and don't have to worry about competitors, other sites, and so forth.

The first solution is to simply take a form and point it at Google. So for example:

```html
<form action="https://www.google.com/search" method="get">
    <input type="search" name="q" autofocus size="50" />
    <input type="submit" value="Search" />
</form>
```

Google looks for a value named `q` that represents your query term. Of course, you probably want to limit it to your site. Google's search tool supports numerous operators, one of them being `site:` which limits results to one particular site. Here's how that could look:

```html
<form action="https://www.google.com/search" method="get">
    <input type="search" name="q" value="site:https://www.raymondcamden.com " autofocus size="50" />
    <input type="submit" value="Search" />
</form>
```

I've added the site operator and pointed it at my blog. I also added a space after it so that when a person starts typing, it won't mess with the operator.

There's a lot to _not_ like about this approach. First, the user has to know not to mess with the operator. Second, this takes the user off your site and takes them to Google. You get no control over the display, no control over results, and so forth.

This is probably the _worst_ solution you can use, but it also takes roughly ten seconds to add to your site and can work in a pinch.

### Google Custom Search Engine

Luckily Google provides a nicer option, [Google Custom Search Engine](https://cse.google.com). Google Custom Search Engine (CSE for short) allows you to define customized search engines with options to automatically filter to a site (or sites), hide directories, and more. You have multiple options for the UI of the search engine and the end result is a set of HTML and JavaScript you just paste onto your page.

Pricing information can be found at their [faq](https://support.google.com/customsearch/answer/9069107?hl=en&ref_topic=4513742) page and basically boils down to this: you can use CSE for free but you'll get ads in your result, much like the "regular" Google. They also support a JSON API for REST based access but this is paid only option and won't be the covered in this article.

Working with CSE simply requires logging in (and assuming you have a Google account) to their portal (<https://cse.google.com/cse/all>) and then adding your new search engine:

![CSE Dashboard](/images/1578578451-cse1.png)

Click the Add button and begin by configuring the site, or sites, to search. Note that you can customize the directories, specify individual pages, and so forth:

![Adding a new CSE](/images/1578578598-cse2.png)

You can enter _any_ site you want here, even sites you don't own. For my testing, I entered <https://www.stackbit.com/blog>. After you've done that, you can then get your code:

![CSE creation is complete](/images/1578578650-cse3.png)

Here's what the code look looks like:

```html
<script async src="https://cse.google.com/cse.js?cx=013262903309526573707:g4gj5dkucit"></script>
<div class="gcse-search"></div>
```

There's quite a few customization options but if you tweak nothing at all, here's how it looks:

![Search field](/images/1578578681-cse4.png)

What's not obvious from the screen shot above is that the form takes 100% of the available width, so be prepared to apply a bit of CSS, or put it in a container with a set width. Once you search, it opens a modal window:

![Search results](/images/1578578725-cse5.png)

You may notice that the first result shown here is an ad. Also note that results are sorted by relevancy. And finally, results will open in a new tab. You can test a live version of this here: <https://netlifydemos.netlify.com/jamstacksearchcse.html>

Personally, I dislike _all_ of that. I don't like the modal popup window. I don't like searches showing in another tab. Luckily this is all easily fixable. In your new CSE, you can go to the "Look and feel" section and tweak quite a bit.

![Customizing layout of results](/images/1578578797-cse6.png)

Getting results to not open a new tab is more difficult - difficult in terms of finding out how. The actual implementation isn't so bad. Google documents what is calls the [Custom Search Element API 2.0](https://developers.google.com/custom-search/docs/element) and provides you with a simple HTML based way to configure how things work. There's numerous options here (although nthe color and font style options must be done in the web-based admin) but here's a simple modification to keep results in the same tab:

```html
<script async src="https://cse.google.com/cse.js?cx=013262903309526573707:g4gj5dkucit"></script>
<div class="gcse-search" data-linkTarget="_parent"></div>
```

By using `data-linkTarget`, I'm specifying where my results end up - in this case the current tab. If you want to give this a try, hit the demo here: <https://netlifydemos.netlify.com/jamstacksearchcse2.html>.

As I said, there's quite a bit of customization you can do, just be prepared to dig into the docs a bit. You can see a final demo at my own blog's search page, <https://www.raymondcamden.com/search/>.

All in all, CSE is a relatively simple way to add search to a site and, given that Google knows a thing or two about search, it's a powerful solution. However, even with a large number of customizations, you don't have absolute control over the results unless you're willing to go (and pay for) the JSON API solution and connect it with a serverless function of some sort.

### Build your own with Lunr

An option with much more control, and of course, more work involved, is [Lunr](https://lunrjs.com/). Lunr is a 100% client-side solution giving you control over every aspect of search.

You control what's searched by creating an index of data. And here's the crucial bit: in order for Lunr to work, all of that data has to be sent to the client. That means using Lunr to search your ten thousand page site may not be an option. How much and what you index is up to you, but just remember that you'll be sending that data down the wire.

Once Lunr has your index, it will perform some intelligent optimizations to help you search. This can be anything from ignoring words like "the" to recognizing that if you search for cat and it shows up ten times in one page and twice in another, then the first one is probably a more relevant match.

For the index, you'll provide JSON data consisting of a few things. First, you'll need some way to identify the result so that you can link to it later. Typically this would be the URL. Second you will want a label for the result, and that is usually the title of the page. Finally you want the searchable content. That can be anything. It can be the content of the page, but that may be a lot. You could use an excerpt where you only read in the first paragraph, or two. What you select here depends on what you want to search and how much content you have.

How you generate that JSON data will depend on your static site generator, but at the end, you'll have some endpoint (like `/data.json`) that you can point to with the client-side code.

The client-side code consists of two parts. First you need to create the Lunr instance. To do this, I fetch the JSON:

```javascript
let result = await fetch('/index.json');
docs = await result.json();
```

Then I create and populate the Lunr instance:

```javascript
let idx = lunr(function () {
    this.ref('id');
    this.field('title');
    this.field('content');

    docs.forEach(function (doc, idx) {
        doc.id = idx;
        this.add(doc);
    }, this);
});
```

In this particular example, I've defined a primary key (`id`) and two fields, `title` and `content`. I then loop over my docs and add them. This section in particular will change depending on what you're searching, how you want to search, and so forth.

Luckily searching is much simpler:

```javascript
results = idx.search(term);
```

And that's basically it. Displaying those results is up to you. For a deeper look at this, you can see the article I wrote on using Lunr with Eleventy and Vue.js: [Adding Search to your Eleventy Static Site with Lunr](https://www.raymondcamden.com/2019/10/20/adding-search-to-your-eleventy-static-site-with-lunr).

### Other Options and Ideas

There are other options you may wish to consider as well. [Bing Custom Search](https://www.customsearch.ai/) provides an experience like Google's Custom Search Engine, but powered by Bing (obviously).

If you are open to using serverless with your JAMStack, then you can use any API-based solution. [Elastic Search](), for example, provides incredibly powerful search experiences and a powerful API. Or even simpler, if your content is based on a database, you can write custom code to perform searches against your data.

Once you've gotten search on your site, you may also want to look into logging and monitoring what people are actually searching for. It may be obvious, but if people are consistently searching for something you don't have, it's a clue to get crackin' on new content!
