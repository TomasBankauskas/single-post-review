---
thumb_img_path: '/images/1581601677-whatsaheadlesscmssm.png'
content_img_path: '/images/1581601683-whatsaheadlesscms.png'
template: post
title: What’s a Headless CMS and Why Should You Care?
excerpt: >-
    Gift Egwuenu discusses what you need to know about headless content management
    systems, such as what a headless CMS is and what the benefits and use cases of
    using the headless CMS are.
date: '2020-02-13'
author: src/data/authors/gift-egwuenu.yml
subtitle: >-
    Gift Egwuenu discusses what you need to know about headless content management
    systems, such as what a headless CMS is and what the benefits and use cases of
    using the headless CMS are.
---

The history of managing content on the web dates back to the beginning of the web’s existence. A [Content Management System](https://en.wikipedia.org/wiki/Content_management_system) (CMS) is a tool that can manage the creation and modification of digital content. In the 2000s we moved to an era where managing content was facilitated by open-source CMS, also known as a coupled or traditional CMS, like [Wordpress](http://www.wordpress.com), [Joomla](https://www.joomla.org/), and [Drupal](https://www.drupal.org/). These systems allow users to manage both the frontend and backend of the application in one location.

Fast forward to today, we have shifted to a different approach with even better ways of managing content called the headless CMS. This approach lets you decouple the backend from the frontend, allowing you to pull and manage content via an API. In this article, I’ll cover what you need to know about headless content management systems and where to go from here to explore and use a headless CMS in your project.

## Headless CMS the what?

Unlike the traditional CMS, where both the frontend and backend layer are coupled (meaning they cannot be separated from one another), a headless CMS is a content management system where the content “body” is decoupled from the frontend display, and the developer is provided content as data over an API.

A headless CMS is frontend agnostic. This means that content is delivered raw, and the developer chooses how the data is presented to the end-user using any framework or tool of choice.

## Traditional vs Headless vs Decoupled CMS

### Traditional CMS

A traditional CMS also called a coupled CMS serves and maintains the backend and frontend layer of the system. The system consists of a database for storing the content, the frontend for displaying the content and the backend that houses the functionality of the content management system. Working with a traditional CMS, every single part of the system - frontend, backend, database - exist as an inseparable part of the CMS. This kind of platform also typically provides a [(WYSIWYG) “What You See Is What You Get”](https://en.wikipedia.org/wiki/WYSIWYG) interface for creating content.

### Headless CMS

The headless CMS differs from the traditional approach where the backend is only used for managing content and the frontend (“head”) is disconnected, leading to the name headless. The content is published to an API where the data can be consumed across different platforms such as web, mobile, AR/VR, chat, voice, etc. One benefit of using this approach is the same content can be managed within one system but distributed across several platforms, like a website, a mobile app or even an IoT or voice-enabled device.

### Decoupled CMS

The headless CMS is considered a sub-set of a decoupled CMS, which does include an actual frontend layer. However, the decoupled content system is managed by two different systems. The API layer and an added frontend layer where the final content is published. The difference between the decoupled and coupled (traditional) system is that the former have the frontend and backend system independent of one another, communicating with each other through calls made to the API.

## Benefits of Headless CMS

When you leverage a headless CMS in managing your content, you get the following benefits out-of-the-box.

1. **Omnichannel Approach:** The content created in a headless CMS is capable of being displayed on any device ranging from mobile, web, AR/VR, IoT, etc. while being managed from one backend.
2. **Improved Security:** Headless CMS typically provide content via a read-only API and there is no database to secure. In addition, many allow integration with a via high-performance CDN rather than directly from the database which lowers the risks of [DDoS attacks](https://www.keycdn.com/support/ddos-attack).
3. **Scalability:** The approach of keeping the frontend and backend decoupled means there limits or eliminates downtime and you can scale, upgrade or customize your website without performance rundown.
4. **Flexibility:** The headless approach is more flexible for developers because they have the freedom to build with a frontend framework of choice that fits the project they are working on while, with the traditional approach, the level to which a developer may customize is often limited, which can get frustrating.

## Git-based vs API-Driven CMS

The [headless CMS](https://paper.dropbox.com/doc/A-Deep-Dive-into-Headless-CMS--Ato1Ez13fyNCxOtAgrEfQnswAg-g7CTqko9ISC0QmUgEtBIi#:uid=044557498871472978206522&h2=Headless-CMS-the-what?) is further divided into two different categories, the Git-based and the API-driven CMS. I’ll go over each of them briefly to give you an idea of what they are made of and share examples of each of them.

### Git-based CMS

A Git-based CMS does not store your content in its system. Instead, it applies a layer of CMS functionality to manage content in a git repository. When changes are pushed to git, it triggers a new build of your site. What this means is your content resides in a git repository and, every time new content is added or edited, it triggers a commit on git. Git serves as the database for storing all the content. Platforms that provide this service include [Netlify CMS](https://www.netlifycms.org/), [](http://jaredforsyth.com/hexo-admin/)[Jekyll](https://jekyll.github.io/jekyll-admin/) [Admin](https://jekyll.github.io/jekyll-admin/), [Forestry](https://forestry.io/), etc.

### API-Driven CMS

With API driven (or API-first) CMS, the content is stored within the CMS and provided to you via an API. The API can either be a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) or GraphQL depending on the platform you use. The API provides the raw content and metadata and you consume the data provided via the framework or language you choose. Platforms that provide this service include [Sanity](https://www.sanity.io/), [Ghost](https://ghost.org/), [DatoCMS](https://www.datocms.com/), [Strapi](https://strapi.io/), and [Contentful](https://www.contentful.com/).

## Use Cases for Headless CMS

Headless content management can be ideal for the following use cases:

1. **Web Applications (that use popular JavaScript Frameworks like React, Vue, Angular)**

    This method involves serving content through an API which is then consumed by a web application, but offers a centralized place for managing content. An example is an eCommerce application built using HTML, CSS and JavaScript with content and product data that are maintained in the CMS and served via an external API.

2) **Jamstack** **sites created with Static Site Generators (** **ex.** **Gatsby, Hugo, Gridsome)**

    Many sites built with tools like Hugo or Gatsby make use of the headless content management system to manage content since in this case they have no ability to access a database. Content can be stored in a headless CMS and fetched through an API during build time and deployed as static files.

3. **Mobile Applications (IOS, Android)**

    The benefits of a headless CMS for mobile developers is that the API allows them to deliver content to an iOS or Android app from the same back-end that manages content for their web site. This can keep things in sync and allow for content reuse (i.e. changing the headline on the web home page also changes it in the mobile app).

## Can a traditional CMS be used as a headless CMS?

A question that comes to mind is why can’t we figure out a way to use the traditional CMS as headless CMS? For instance, Wordpress comes with HTML, CSS, and JavaScript to handle the frontend, along with an SQL database to store the data in the backend, all tightly integrated. But is it possible to only use the backend of Wordpress? The good news is yes, it is possible to achieve this. Most traditional CMS now provide suitable APIs that can be used without relying on the frontend layer. We can see this implementation with APIs like the [Wordpres](https://developer.wordpress.org/rest-api/)[s Rest API](https://developer.wordpress.org/rest-api/) and [Headless Drupal](https://groups.drupal.org/headless-drupal).

## Examples of Headless CMS Providers

###[Contentful](https://www.contentful.com/)

![Contentful.com](/images/1581601482-contentful.png)

[**Contentful**](https://www.contentful.com) is an API-driven headless CMS designed to create, manage and distribute content to any platform. Unlike a traditional CMS, they offer the ability to create your own content model so that you can decide what type of content you want to manage.

###[Netlify CMS](https://www.netlifycms.org/)

![](/images/1581601489-netlifycms.png)

[Netlify CMS](https://www.netlifycms.org/) is a free and open source, git-based CMS created by Netlify. It allows you to define your own content model, integrate third-party authentication and extend the capabilities of its backend, single page app built on React.

###[Sanity](https://www.sanity.io/)

![Sanity.io](/images/1581601493-sanity.png)

[**Sanity**](https://www.sanity.io/) is another API driven platform for managing structured content. With Sanity, you can manage your text, images, and other media with APIs. You can also use the open-source single page application [Sanity Studio](https://www.sanity.io/studio) to quickly set up an editing environment that you can customize.

## Summary

Managing content on the web is quickly moving away from the traditional or coupled approach towards the headless and decoupled CMS approach mainly because of the benefits one provides over the other. As technology keeps advancing, users are making use of different devices to connect to the web, companies have to change to meet the users needs by leveraging the omnichannel approach. While this is a great approach, it may not be not suitable for every web project but it is beneficial to understand these concepts as this is where the future of content is moving towards and having knowledge of it is an advantage.
