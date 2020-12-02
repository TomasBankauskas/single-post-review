---
thumb_img_path: '/images/1591622737-4newtools4sm.png'
content_img_path: '/images/1591622754-4newtools4.png'
template: post
title: 4 New Tools to Watch in the Jamstack Ecosystem
excerpt: >-
    There have been a lot of new innovations in the Jamstack ecosystem already in
    2020. Let's look at some of the major highlights including new static site
    generators and new deployment tools.
date: '2020-06-08'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    There have been a lot of new innovations in the Jamstack ecosystem already in
    2020. Let's look at some of the major highlights including new static site
    generators and new deployment tools.
---

While all of us at [Stackbit](https://www.stackbit.com/) have been firm believers in the Jamstack for pretty much as long as it's been a thing, but 2020 is really feeling like the year it goes mainstream! In fact, data from Netlify's recent [State of the Jamstack community survey](https://www.netlify.com/blog/2020/05/27/state-of-the-jamstack-survey-2020-first-results/) confirm that "Jamstack is seeing a wave of mainstream adoption."

This year has been filled with new tools and new offerings in the Jamstack ecosystem. Our goal at Stackbit is to let you use the tools you choose, so we're always trying to stay on top of the latest trends in the community. In this post, I want to cover some of the recent tools that have been trending in the Jamstack ecosystem.

## RedwoodJS

![RedwoodJS](/images/1591622805-redwoodsm.png)

[RedwoodJS](https://redwoodjs.com/) is a new JavaScript and React-based Jamstack framework backed by Tom Preston-Werner, a GitHub co-founder and also the original creator of Jekyll. While there are other very popular React frameworks already available for the Jamstack like Next.js and Gatsby, RedwoodJS aims to be something more comprehensive. It wants to be something more like a Ruby On Rails for the Jamstack by bringing together all of the various pieces you need for a complex Jamstack application - on the frontend and the backend - and giving you a single convention-based framework to build it.

What does this mean in practice? Well, imagine your Jamstack site that requires a frontend made up of static HTML, JavaScript and CSS assets needs to connect to multiple backend APIs. In some cases, these may actually be first or third-party APIs and services, in others it may even be a relational database and finally it likely needs some form of authentication. RedwoodJS has built-in tooling and helpers that help enable developers to develop all of these pieces, including generators and scaffolding the speed up the process of building the initial app prototype.

RedwoodJS is still very new but it definitely occupies a unique place in the ecosystem and is worth keeping an eye on.

## Bridgetown

![Bridgetown](/images/1591622832-bridgetownsm.png)

Jekyll was originally created around 2008, making it one of the older static site generators still in widespread use. It is still being actively developed (and something we support in our [site builder](https://app.stackbit.com/create)) but some people in the community were clamoring for a major change direction. Instead, Jared White decided to fork Jekyll and make some big changes to how it works.

Bridgetown aims to add some aspects of modern web development that were missing from Jekyll, such as embracing Webpack and thereby making it easier to work with tools like modern JavaScript and CSS frameworks. It recently [overhauled the plugins API](https://www.bridgetownrb.com/release/whats-new-in-0.14-hazelwood/) to make it easier to write and test plugins that may integrate with your app in multiple ways. They also added support for [Ruby code in frontmatter](https://www.bridgetownrb.com/feature/supercharge-your-bridgetown-site-with-ruby-front-matter/), which isn't as crazy as it sounds.

It'll be interesting to watch Bridgetown to see how it continues to diverge from its Jekyll origins and to see if this is the modern Ruby-based SSG that developers have been waiting for.

## Scully

![Scully](/images/1591622861-scullysm.png)

JavaScript and frontend developers who prefer React or Vue have had multiple options for static site generators based on those technologies for quite some time already. Strangely, until recently there was no Angular-based SSG. [Scully](https://scully.io/) fixes that.

Scully's approach differs from other tools in more than just it's use of Angular. It aims to be less opinionated than some of its non-Angular counterparts so that it can be added to existing Angular projects, essentially allowing an Angular SPA to be converted to a a Jamstack application. In addition, it takes a unique approach to rendering by searching your application for static routes and then using [Puppeteer](https://github.com/puppeteer/puppeteer) to take a snapshot of the application, using [Zone.js](https://github.com/angular/angular/tree/master/packages/zone.js) (a tool built into Angular) to help it determine when the snapshot is complete ⁠— even when asynchronous calls are involved. The goal of this, as I understand it, is to deliver predictable rendering results while also enabling interesting features, such as the ability to add breakpoints in the rendering process.

While Angular doesn't seem to get the attention of it's framework counterparts lately, it still has a large community and a strong foothold in the enterprise, and Scully's approach seems geared to take advantage of that.

## Azure Static Web Apps

![Azure Static Web Apps](/images/1591622890-azuresm.png)

It has been entirely possible to host Jamstack applications on services like Azure and AWS for some time, but without many of the integration and deployment features offered by services like Netlify, Vercel or Render. Last week at the Build online conference, Microsoft announced a new Azure service that begins to address that called [App Service Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/), which is currently in public preview.

Some aspects of Static Web Apps make it unique. First, it uses GitHub Actions to enable its CI/CD deployment. Using settings that you configure within Azure, the service generates the GitHub Action necessary to build and deploy your application. This also means that it should be relatively easy to customize the configuration to support any additional requirements you may have. In addition to serverless function creation and deployment similar to Netlify Functions (JavaScript only at the moment, but planned for other languages), the service also provides built-in authentication. This feature uses a JSON file that defines routes within the applicaton that require authentication and what role the user requires to access it.

## More to Come For Sure

Given the growth in adoption of the Jamstack, we're sure to see more tools, services and companies jumping in. We've already worked hard to support a wide range of tools using Stackbit, and, as the ecosystem expands, we'll continue to build tools that help developers bring all the pieces of the Jamstack together. [Why not give it a try](https://app.stackbit.com/create)?
