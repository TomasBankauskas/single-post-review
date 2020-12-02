---
title: Stackbit Studio with Hugo and Jekyll
subtitle: >+
    Just over two months ago, we announced [Stackbit
    Studio](https://www.stackbit.com/blog/announcing-stackbit-studio/), the live
    editing experience for the Jamstack. Since then, we've been hard at work
    adding support for more [static site generators
    ](https://www.stackbit.com/blog/choosing-your-ssg/)and CMS options.


    Today, we're excited to show you how to pair it with
    [Jekyll](https://jekyllrb.com/) and [Hugo](https://gohugo.io/).

date: '2020-11-16'
excerpt: Learn how to use Stackbit Studio with Jekyll and Hugo.
template: post
author: src/data/staff/eduardo.yml
content_img_path: images/Studio-Hugo-Jekyll.png
thumb_img_path: images/Studio-Hugo-Jekyll.png
meta_title: Stackbit Blog | Build a Jamstack website with Hugo and Jekyll
meta_description: >-
    You can now pair your Jamstack website with Jekyll and Hugo: Stackbit Studio
    offers editors a user-friendly interface for managing your content of the
    website.
---

## Meet our friends: Jekyll and Hugo

[Jekyll](https://jekyllrb.com/) is considered the first of a new crop of static site generators that led to the Jamstack movement. It was first released in 2008 and maintains a steady community to this day.

Younger but equally mighty is [Hugo](https://gohugo.io/), a static site generator with a strong focus on build performance. It powers large-scale websites for the likes of [Smashing Magazine](https://www.smashingmagazine.com/), [DigitalOcean](http://www.digitalocean.com) and [Kubernetes](https://www.kubernetes.io).

Jekyll and Hugo are built with different programming languages, use different templating engines and have different conventions for storing content, taxonomy and structured data. However, they share the same fundamental principle of storing content in files on disk, which are kept alongside the source code for the site.

This offers numerous benefits in terms of development and deployment, but editing these files is non-trivial, especially for less technical folks. This is where Stackbit Studio comes in.

<p><video style="display: block; margin: 0 auto" width="640" height="444" autoplay muted loop>
  <source src="/images/blog/stackbit-studio-announcement/stackbit-studio-editing.mp4" type="video/mp4"/>
  <img src="/images/blog/stackbit-studio-announcement/stackbit-studio-editing.gif" alt="Example of the inline editing experience in Stackbit Studio"/>
</video></p>

Stackbit Studio offers a full-featured on-page editor that seamlessly integrates with the static site generator. It offers editors a user-friendly graphical interface for managing the content of the website, and Stackbit Studio will take care of updating the corresponding files under the hood and committing them to a version-controlled repository.

## Why this is a big deal

At Stackbit, we're committed to integrate our product with the best tools in the Jamstack ecosystem. While the popularity of JavaScript-based options such as [Gatsby](https://www.gatsbyjs.com/) and [Next.js](https://nextjs.org/) has been steadily increasing, that doesn't make them the right tool for _every_ job.

Our goal is to give people the same experience and ease of setup for any combination of technologies, leaving it up to them to decide what feels right for each project.

Also, I think we – as tool creators – have a big responsibility towards people that are learning the ropes of web development. Being proficient in a JavaScript framework is a tremendous skill to possess, but it may not be the best or easiest entry path for some folks. Tools like Jekyll and Hugo are arguably simpler and _closer to the metal_, in the sense that their approach to markup, styling and logic are less removed from vanilla HTML, CSS and JavaScript.

We're excited to give people the ability to create a site, play with its source, and tear it apart – all with the help of a user-friendly interface that's always there to bridge any gaps in people's knowledge and understanding of the underlying tools.

## Getting started

Well, that's easy. Jekyll fans can make their way to [jamstack.new/jekyll](https://jamstack.new/jekyll). Fancy Hugo? Go to [jamstack.new/hugo](https://jamstack.new/hugo).

Happy building!
