---
thumb_img_path: '/images/1585744484-ssg-sm.png'
content_img_path: '/images/1585744377-ssg.png'
template: post
title: How to Choose Your Static Site Generator
excerpt: >-
    The static site generator (SSG) is a key ingredient in developing a JAMstack
    web app, but there are literally hundreds to choose from. In this article,
    Brian Rinaldi offers his advice and guidance on choosing the option that's
    best for you.
date: '2020-04-01'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    The static site generator (SSG) is a key ingredient in developing a JAMstack
    web app, but there are literally hundreds to choose from. In this article,
    Brian Rinaldi offers his advice and guidance on choosing the option that's
    best for you.
---

A static site generator (SSG) is one of the critical components of the JAMstack. But there continue to be _a lot_ of choices when it comes to static site generators, with new options still appearing with regular frequency. According to [staticsitegenerators.net](https://staticsitegenerators.net/), there are 460 of them. Now, it's true, they vary in terms of whether they are currently maintained and updated, but even [StaticGen](https://www.staticgen.com/), which aims to be more selective in what it includes, lists over 280 options.

So, how are you supposed to know what's right for you? I'd love to offer you a "X is the best SSG, hands-down" recommendation, but that's not realistic. Instead, in this post I want to offer you some guidelines that I think can help you choose the best SSG option for your project.

Before we start though, I want to note that this is, by nature, an opinionated exercise. My intent is to offer clear and useful advice, not to criticize any particular tool, either in my discussion of it or my exclusion of it (by nature, when dealing with hundreds of options, I am liable to leave someone's favorite off the list).

## What Is Your Level of Experience?

If you are a genius developer with unlimited free time and a deep expertise in static site generators, then any of the options will likely work for you, but, then again, you probably think you should probably just go roll your own! For the rest of us, our level of experience can factor into choosing an existing option.

### New to JAMstack?

If you are relatively new to the JAMstack it's a good idea to stick with some of the more established options with large communities. This is because finding "how to's" and help from a variety of sources on a range of topics will be much easier. Some of these options would include:

-   [Jekyll](https://jekyllrb.com/) - One of the older options, Jekyll is built in Ruby. It built a large community in part based on the fact that it was the option originally supported by GitHub Pages.
-   [Hugo](https://gohugo.io/) - Hugo is a Go-based SSG that has also been around for some time. It built a strong community due to its focus on a very fast build speed.
-   [Gatsby](https://www.gatsbyjs.org/) - Gatsby is a JavaScript-based solution that gained a lot of popularity in part based on its use of React, whose community grew enormously, and its ecosystem of plugins.

### Some JAMstack Experience?

If you come in with some degree of experience with the JAMstack ecosystem and tools, there are a number of additional options that have been gaining steam lately. These have growing communities and are well-documented, but haven't been around as long as the other options, which may present some challenges. Some of the popular options in this category would be:

-   [Next.js](https://nextjs.org/) - Next.js is a React framework that has been around a while and has a huge community. However, Next.js had limited options for the JAMstack, only [recently adding some key features](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support).
-   [Eleventy](https://www.11ty.dev/) - 11ty is a JavaScript-based solution that has been gaining a good deal of popularity lately in large part because it does not rely on a specific frontend framework.
-   [Nuxt](https://nuxtjs.org/) - Nuxt is like Next.js but for developers who prefer to use Vue.js as their frontend framework rather than React.
-   [Gridsome](https://gridsome.org/) - Gridsome is another JavaScript-based option that has been gaining interest because of its use of Vue.js.

### Experienced JAMstack dev?

Obviously, you are free to live on the cutting-edge if you like regardless of your level of experience, but I generally wouldn't recommend it for most - especially if you have some semblance of a deadline. As I mentioned, there are new SSGs coming out all the time, which, by nature, will have relatively small communities and available resources. Some recent examples include:

-   [Scully](https://github.com/scullyio/scully) - Scully is a new JavaScript-based solution that finally gave Angular developers an option to create JAMstack sites using their preferred frontend framework.
-   [RedwoodJS](https://redwoodjs.com/) - RedwoodJS is a brand-new JavaScript-based option that is earning a lot of buzz in part because it was built by Tom Preston-Werner, one of GitHub's co-founders (who also, not coincidentally, originally created Jekyll), and because it aims to bring a Ruby-on-Rails-like "full stack" approach to the JAMstack.

## Does the Language or Framework Really Matter?

As you might have noticed, most of the options above are built upon JavaScript. This is a recent development in the world of SSGs. In fact, in the prehistoric SSG era (i.e. 2016) I was asked to give a presentation on JavaScript SSG tools. At the end, I would share which one I recommended you use, and the answer? None of them. Yet today, there are a number of outstanding JavaScript-based options.

There are also a ton of non-JavaScript options. Pretty much any language you write, there is an SSG built in that language. For example, there are some popular options for Python devs including [Pelican](https://github.com/getpelican/pelican) and [Lektor](https://github.com/lektor/lektor). There are options for almost any other language you can think of but the amount of usage, updates and community support is often limited. Heck, there's even a [Swift-based option](https://github.com/JohnSundell/Publish) now.

That being said, I'd argue that, in most cases, the underlying language isn't all that important unless you plan to write your own extensions for the tool (assuming it supports them). Most of the time, you'll be working in whatever templating language/framework the SSG uses.

If you have strong opinions about a particular framework, then you may want to consider a tool that is built using your preferred framework (ex. React, Vue, Angular). It's important to keep in mind that just because you use a tool that isn't framework based (ex. Hugo, Jekyll or Eleventy) doesn't mean you can't use a frontend framework for your web application. So I would advise that you not let your preferred frontend framework limit your options.

On the other hand, if you don't know a particular framework, this can make the learning curve steep for some framework-based SSGs. For example, if you don't know React, it can make learning Gatsby or Next.js tougher. Or if you know Vue but not React, your learning curve on Gridsome or Nuxt may be easier.

## It's Tough to Go Wrong

While I haven't used all of the options I discussed here, the truth is there are a ton of worthy options, so it's tough to make a wrong choice. There are some feature differences, of course, but having used a ton of SSGs over the years, I've found that you can get the job done with pretty much any option. In my view, narrowing your choices comes down to 3 main factors:

1. How steep will the learning curve be? Factors like documentation, community help forums, language and framework can all be at play here.
2. What features do you need and how heavily will you need to customize? While you an accomplish almost anything with any one of these tools, some have features, themes or plugins and a plugin ecosystem that can help speed up your development. If they don't have a feature or plugin you need and you may need to customize the functionality by writing a plugin of your own, then the language the tool was built in can become an important factor. Build performance can a "feature" and a factor here as well, especially if you have a large site that updates often.
3. What are your personal preferences? Do you have a strong preference for a particular language or framework? Or a strong distaste for either? Personal preferences are important factors but be careful of letting them lead you to simply following the crowd - explore the options that can fit your needs not just what "cool kids" are using.

The JAMstack ecosystem is rich - take advantage of it and explore!
