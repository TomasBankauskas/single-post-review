---
thumb_img_path: '/images/1565896461-modern-web-thumb.jpg'
content_img_path: '/images/1562692912-themodernwebv2.png'
template: post
title: From monoliths to the modern web - The great unbundling
excerpt: >-
    The shift from building websites using monolithic projects like Wordpress to
    more modern approaches like site generators, Headless CMS and deploy workflows
    has been accelerating in recent years
date: '2019-05-27'
author: src/data/staff/ohad.yml
subtitle: >-
    The shift from building websites using monolithic projects like Wordpress to
    more modern approaches like site generators, Headless CMS and deploy workflows
    has been accelerating in recent year
---

## Prehistory

In the good old days we may have used a publishing tool like Wordpress on a shared VPS and life was simple, we leveraged OSS like WP/cPanel and paid little to nothing for access to commoditized hosting. While that made sense for a while it quickly became a sub-par way to run a a site, the main reasons being speed (rendering pages on each request) and security (WP was getting hacked every other day and sometimes twice a day). While we had kind of full control over how our content was being published and presented it felt like we were sacrificing important parts of the reading, writing and hosting experience.

I remember the day I got tired of running a slow WP site that constantly got hacked and decided to put a static snapshot of my site on S3. Things instantly became secure, fast and very simple... at least until it came time to edit my site and I realized that I had inadvertently or perhaps purposefully given up on having a CMS to edit and create content. For a while there I used Cyberduck which is a Mac FTP client that also supports editing content in S3 buckets to edit my site's HTML/CSS. No WYSIWYG, no Markdown, no previews, no drag and drop image uploading but something about this bare bones experience resonated with me. Its kind of how like camping with a limited amount of equipment can make one rethink their day-to-day setup back home.

This got me thinking about how to edit content and resulted in the prototyping of a bare-bones JS-based CMS that interacted directly with S3 and lived in your browser. Everything you needed to edit a page on the site came with that page and would just be written to S3 once you hit save. This lasted for longer than you would expect and kept me curious about how editing websites would happen outside of monolithic publishing systems.

## Separating content editing and rendering

What followed in the eco-system was a conceptual breakdown of the older silo'd systems and the emergence of companies/products that made it easy to edit content without much regard to how and where that content is used. You may have heard of companies like [Contentful](https://www.contentful.com/), [Sanity.io](https://www.sanity.io/), [DatoCMS](https://www.datocms.com/) and others who offer an API-based CMS or [Forestry.io](http://forestry.io/) and [NetlifyCMS](https://www.netlifycms.org/) which offer a git-based CMS. They all focus on the content creation and editing experience and not on how that content actually makes it to the web, mobile devices, etc. When coupled with static site rendering and deployment solutions like [Netlify](https://www.netlify.com/) this separation results in superior security because the main attack vector (vulnerabilities in large OSS projects coupled with full visibility into where that software runs) goes away instantly. In other words Contentful is likely more secure than WP but more importantly attackers are unlikely to know you even use it to manage your content.

## The emergence of a git-based pipeline

It's around this time that the evolution of front-end development frameworks started its rapid acceleration and with this complexity came the need, or rather the potential, to establish a front-end pipeline. Sites started getting generated with software like [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/) and later [Gatsby](https://www.gatsbyjs.org/) and content got pulled in build-time from a myriad of data sources. This was wrapped with additional build tools and bundlers like Gulp, Webpack, etc. Luckily enough companies like Netlify built platforms to help us manage and think about these processes at a higher level.

[Which is the Best Static Site Generator and Why?](https://dev.to/oyetoket/which-is-the-best-static-site-generator-and-why-42e2)

The role that git and Github played in this rearchitecting is pivotal because your website turned from a VPS instance with a WordPress install on it to a git repo with webhooks into CI/CD services. This git repo contains configuration for your generator of choice, templates and sometimes even the content for your website in Markdown format. When using an API-based CMS your repo will contain all the configuration needed to pull the most recent version of your content from your CMS of choice.

## JAMstack and the modern web

What do you call this process and the websites that come out the other side? Its not long ago that the term [JAMstack](https://jamstack.org/) was coined by Matt Biilman and Chris Bach as way to describe the shift from the older technology-specific stacks like LAMP to a more modern architecture where websites can be built from client-side JavaScript, reusable APIs and prebuilt Markup. The rapid adoption of the term JAMstack serves as a reminder that sometimes clearly articulating an approach that so many people are already curious about or playing with can help to rapidly accelerate the adoption of both the approach and the term.

[Back to static with JAMStack: a paradigm shift for better UX and web performance](https://dev.to/borisschapira/back-to-static-a-paradigm-shift-for-better-ux-and-web-performance-4ljc)

Harnessing the power of these new methodologies
Once we internalize the fact that content can be easily created in one place and used in one, or more, other places this opens up many new and interesting workflows. It is worth noting that the historic use of RSS feeds to synchronize and syndicate content from one place on the web to another can be seen as a telling sign of the need and desire to interconnect different content sources and publishing systems. The only thing that changed are the tools (webhooks, CMS APIs, GraphQL) and the new workflows the more elaborate workflows they enable.

No longer is your site being edited and rendered with the same code-base or even on the same server. The unbundling of the monoliths means we're using more appropriate software and approaches to tackle each one of the challenges that exist in creating modern websites. We're in 2019 and it feels like we're in a unique point in time where I believe the modern stack has been called out and adopted by many bleeding edge developers/shops but at the same time the tooling around this stack is still in its infancy.

When this realization hit me last year I sat down with a few friends to try and prototype some ideas that would try to combine the simplicity we're used to from consumer site-builders with the power of the modern architecture and ecosystem. These prototypes rapidly evolved and got to a point where we all agreed there's a big valuable problem that can be solved here. We called our company Stackbit because we like software stacks and bits, it also helped that the domain was kind of available. With Stackbit we want to make creating modern websites easy and accessible to everyone, and we're confident that ideas like Stackbit and others are pushing the whole category forward as they increase adoption by leveling the playing field.

If you'd like to learn more about the modern web ecosystem here are some links

-   <https://www.stackbit.com>
-   <https://jamstack.org>
-   ["Why Static Site Generators Are The Next Big Thing"](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/), Matt Biilmann
-   ["Delivering Modern Website Experiences: The Journey to a Content Mesh"](https://www.gatsbyjs.org/blog/2018-10-04-journey-to-the-content-mesh/), Sam Bhagwat
