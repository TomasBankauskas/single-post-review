---
thumb_img_path: '/images/1573063397-controlcenterjamstackv2.png'
content_img_path: '/images/1573063397-controlcenterjamstackv2.png'
template: post
title: Get Netlify Build Updates Directly on Your Site!
excerpt: >-
    A look at Stackbit's new On-page Control Center that gives you detailed
    information about your Netlify build without ever leaving your site. So say
    goodbye to ⌘+R, ⌘+R, ⌘+R.
date: '2019-11-06'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    Stackbit's new On-page Control Center gives you access to detailed information
    about your Netlify build without ever leaving your site.
---

Building modern web sites with the [JAMStack](https://jamstack.org/) is generally a great experience for developers. It's easy to build and test locally without some complex local environment setup (remember the days when you had to install a local application server, web server, database server and more?). It's also easy to deploy using tools like [Netlify](https://www.netlify.com/) that automatically build and deploy your project to production.

Until now, one downside of this has been that the build and deploy process can be a bit opaque. Even small changes to the site files or connected CMS will trigger the build process. Sure, I can log into my Netlify admin, go to my deploys and see the build process happen, but, if you're like me, you're more likely to be sitting on your live web page hitting `⌘+R` every few seconds until the changes are live. Depending on the type of change I made, it may not even be immediately obvious if I'm looking at the old copy of the site or the updated site.

## Announcing the Stackbit On-page Control Center

One of Stackbit's goals is to improve the developer experience when building modern web sites. To that end, we're announcing the availability of our new [Stackbit On-Page Control Center](https://www.stackbit.com/control-center/). The control center addresses the issues I discussed above and more. Let's look at some of the features.

### See Your Netlify Builds as They Happen!

The On-Page Control Center automatically detects when a build has been triggered at Netlify and notifies you. Whether the build was triggered by a commit to the repository, a change in the CMS or something else entirely, you'll know as soon as it happens.

![automatic build detection](/images/1573046581-cms-update-sm.gif)

### Monitor the Build Logs Live

If there's a delay or problem with your build, you'll know immediately because the control center allows you to view your Netlify build logs without ever leaving your site. This means you're aware of any issues as they occur.

![view live build logs](/images/1573046655-live-logs-2.gif)

### Quick Access to Your Connected Services

Need to go to the Netlify admin console or the GitHub repository associated with your site? The control center gives you quick links directly to those services. This gives you one-stop to access to the tools that run your site _on your site_.

## How Do I Get the Control Center?

Maybe you're thinking, "That all sounds cool, but I bet it's a pain to implement." Well, good news - if you're already a Netlify user, integration is just a matter of a couple clicks. Seriously!

1. Go to the [On-Page Control Center page](https://www.stackbit.com/control-center/).
2. Click "Pick any Netlify Project".
3. Select which projects you would like to enable the control center on.
4. Once Netlify updates for all the projects you selected, you'll be able to access the control center on your page.

![easy integration](/images/1573046741-easy-integration-2.gif)

But will this work on your site?

So long as your site is deployed to Netlify, yes it will! It doesn't matter if you built your site using Gatsby, Jekyll, Hugo, VuePress, any other static site generator or no static site generator at all - you can deploy the Stackbit On-page Control Center and get all the features we discussed.

If you'd like to know more about how all this works, you can check out the [FAQ](https://www.stackbit.com/control-center/#faq).

## We'd Love to Hear From You!

Give the [Stackbit On-Page Control Center](https://www.stackbit.com/control-center/) a try and let us know what you think. We hope it helps make your developer experience even better. We have a ton more features in store, which you can read more about [here](https://www.stackbit.com/live/).
