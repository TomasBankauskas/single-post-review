---
thumb_img_path: '/images/1565858337-newfeaturesthumb.jpg'
content_img_path: '/images/1562722277-newfeatures.png'
template: post
title: Announcing Custom Themes And So Much More
excerpt: >-
    Today we're announcing the ability to bring your own themes into Stackbit
    coupled with a new 'Create With Stackbit' button that turns themes into
    CMS-powered websites, all in an even smoother and quicker flow.
date: '2019-07-10'
author: src/data/staff/ohad.yml
---

**TL;DR**

Today we're announcing the ability to **bring your own themes** into Stackbit coupled with a new **Create With Stackbit button** that turns themes into CMS-powered websites, all in an **even smoother flow**. Additionally we're sharing early details about **Unibit, a superset of static site generators that converts to any of them**, and featuring collaborations with **CodeSandbox**, **Snipcart** and **Alembic**.

Without further ado lets start rolling:

## Uniform themes: Turn themes into CMS-powered websites

Over the past several months we kept asking early Stackbit users for feedback on the product and the top request has consistently been _let us bring our templates and themes into the platform_. That was exciting to hear as the themes currently on Stackbit were starters that we created to demonstrate the capabilities of the platform. We're open sourcing all these starter themes today to benefit developers looking to get started with Stackbit, you can go ahead and fork any of the samples or bring in new/existing themes.

Today we're opening up this capability in beta - bring your own themes into Stackbit **no matter what static site generator they are built for**, you'll see it as an option on the top right corner of our project creation flow, which leads [into the following screen](https://app.stackbit.com/create?theme=custom):

![](/images/1562722446-custom-theme-in-app.png)

To use a theme, grab its Github repo URL and make sure it has a stackbit.yaml file, learn more about [bringing your themes](https://docs.stackbit.com/uniform/) into Stackbit and the [stackbit.yaml](https://docs.stackbit.com/uniform/stackbit-yaml/) file in our [docs](https://docs.stackbit.com/). This file enables Stackbit to do all the heavy lifting of provisioning your theme's content model with a growing selection of headless CMS and pulling the content for you in the format your static site generator expects it during build time.

Your existing themes, starter kits, boilerplates? Add a stackbit.yaml file and instantly provision new CMS-powered websites from them. We can't wait to see what websites people build with all the themes out there, now that spinning up a website from a theme becomes effortless. Learn more about Uniform themes [here](https://docs.stackbit.com/uniform/).

As an example we took [this](https://github.com/danurbanowicz/eleventy-netlify-boilerplate) nifty Eleventy boilerplate, [added](https://github.com/stackbithq/eleventy-netlify-boilerplate/commit/a8c5b3214d5aa5abe5f3ae5f0b14d3b235b9550f) a stackbit.yaml file and voila you can now create a CMS-powered website from it.

Click this to create a website from this Eleventy boilerplate: <a class="button stackbit" href="https://app.stackbit.com/create?theme=https://github.com/stackbithq/eleventy-netlify-boilerplate" target="_blank">Create With Stackbit</a>

Hold on, what was that little button? 👇

## Create With Stackbit button

We wanted to make creating CMS-powered websites even easier and more accessible so today we're also introducing the [Create With Stackbit button](https://docs.stackbit.com/create-with-stackbit/). It's a direct link to the Stackbit new-project flow which allows you to preset the theme to any Github repo as well as the CMS to any of the options we support. **Give your users, clients or company the ability to create fast, secure and low-maintenance CMS-powered websites in a single click** without having to learn about all the moving pieces that come together to provision modern sites.

This button will create a new website based on our Azimuth theme, Gatsby and DatoCMS - <a class="button stackbit" href="https://app.stackbit.com/create?theme=https://github.com/stackbithq/stackbit-theme-azimuth&ssg=gatsby&cms=datocms" target="_blank">Create With Stackbit</a>

Here's another example of [David Darnes'](https://darn.es/) popular [Alembic](https://github.com/daviddarnes/alembic-stackbit-kit) Jekyll theme with the _Create With Stackbit button_. As a non-Unibit theme, the SSG will be immutably Jekyll, but the CMS is left to the user's choice - <a class="button stackbit" href="https://app.stackbit.com/create?theme=https://github.com/daviddarnes/alembic-stackbit-kit" target="_blank">Create With Stackbit</a>

Learn more about the Create With Stackbit button [here](https://docs.stackbit.com/create-with-stackbit/).

## Unibit: Write once and stay SSG agnostic

When we started Stackbit we also built an internal tool that helped us create a theme once and convert it to multiple static site generators. You know how a Hugo theme is different from a Jekyll theme which is very different from say a Gatsby theme? We wanted to be able to write once and transpile to all of these targets. While still in beta, today we're releasing the spec for [Unibit](https://docs.stackbit.com/unibit/) - a superset of several modern static site generators that converts to any of them. All the themes you've seen in the Stackbit new project flow were created with Unibit and that's why you can also choose any static site generator you'd like to have them converted to when creating your project.

### Plantly: The first e-commerce Unibit theme by Snipcart

Our friends at [Snipcart](https://snipcart.com/?utm_source=stackbit&utm_medium=referral&utm_campaign=stackbit), a flexible e-commerce integration solution for developers that allows you to add a shopping cart to any website, have [created](https://snipcart.com/blog/stackbit) Planty, their newest e-commerce theme in Unibit. This allows their users to spin up a new e-commerce website in minutes, while retaining maximum flexibility with a CMS and SSG of their choice.

Planty is based on Snipcart's V3.0 (currently in [beta](https://snipcart-docs-v3.netlify.com/)). The shopping cart has been rebuilt from the ground up, ditching jQuery, with a new JS SDK, quicker and more intuitive checkout UX and other good stuff.

You can view a [live demo of the theme](https://stackbit-theme-planty.netlify.com/#/), check out their [open-source Unibit repo](https://github.com/snipcart/stackbit-theme-planty), or just [sign up to Snipcart](https://snipcart.com/?utm_source=stackbit&utm_medium=referral&utm_campaign=stackbit) and get your own e-commerce site live in minutes on Stackbit. You can also go ahead and instantly create a new Planty site - <a class="button stackbit" href="https://app.stackbit.com/create?theme=https://github.com/snipcart/stackbit-theme-planty" target="_blank">Create With Stackbit</a>

![](/images/1562722468-planty-theme.png)

Learn more about Unibit [here](https://docs.stackbit.com/unibit/).

### Get started with Unibit on CodeSandbox

[CodeSandbox](https://codesandbox.io/s/) is an amazing online editor tailored for web applications, that support you all the way from prototype to deployment. Starting today, it offers the ability to create and work on Unibit themes out of the box, featuring Universal, our Unibit starter theme.

![](/images/1562722503-csb-unibit-1.png)

Simply pick the Unibit featured option and you're ready to code in seconds:

![](/images/1562722513-csb-unibit-2.png)

## Improved flow - Making fast even faster

As we mentioned earlier creating smooth and powerful experiences is core to our product philosophy and as such we wanted to take something the community told us was great and try to make it even better. Here are all of the exciting improvements we're releasing to production today:

-   **No more waiting for invites** - Though still in beta anyone can now sign-up for Stackbit and [start using it right away](https://app.stackbit.com/create). We previously had a beta waiting list which helped us ease the flow of incoming users and projects while we were still tweaking a lot of things but that's behind us now.
-   **Github Sign-in** - Speaking of signing-in we realized that every user creating a project on Stackbit was already effectively signing in with Github. This means that even though you can still sign-up with an email/password any user coming straight into the new project flow (say from the Create With Stackbit button) will be able to go through the flow and then merely get asked to connect with Github as a means to establish a Stackbit account. We believe removing the sign-up from the start of the flow will contribute to an even smoother experience for you and your users.
-   **Netlify anonymous deploy** - As if we haven't eliminated enough clicks yet here's one more shot. If you choose to connect your Netlify account in the Account Settings any new project will be created under your Netlify account. However, if you are a user coming in via the new Create With Stackbit button we'll create what's known as an anonymous Netlify project for you. This means you won't need to connect to Netlify as part of the new project flow and will have the option to later claim the Netlify project we will have created for you.
-   **More granular Github permissions** - By popular request, or some will say demand, we have revamped our Github permissions code and now support more granular permissions. You can now give Stackbit permission to create projects under your personal account as opposed to organizations you are a part of. Keep in mind that in order to do our work we, at a minimum, need to be able to create new repositories on your account/org, maintain those repos, do PR on them, setup repository hooks, etc. We will also Github for permission to access your email address because we need a way to contact you.

![The newly optimized project creation flow](/images/1562725984-optimized-new-project-flow-800x800.gif)

## Wrap up

Was this all one big blog post? seems so, but we'll be writing more about most of these new capabilities in the coming weeks. We want to give a shout out to all our early users who continue to use Stackbit in creative ways and provide us with fantastic feedback. Most of the new features announced today are still very much in beta so please bare with us and [contact us](/contact) if there's anything we can help with.

Thanks,

The Stackbit team
