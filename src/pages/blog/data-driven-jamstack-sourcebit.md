---
thumb_img_path: '/images/1582728545-sourcebit-banner-sm.png'
content_img_path: '/images/1582728553-sourcebit-banner.png'
template: post
title: Data-driven JAMstack with Sourcebit
excerpt: >-
    Sourcebit is a new open source project that aims to make it easy for
    developers to connect their JAMstack site to data coming from a broad range of
    sources. In this tutorial, we explore how to use it.
date: '2020-02-26'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    Sourcebit is a new open source project that aims to make it easy for
    developers to connect their JAMstack site to data coming from a broad range of
    sources. In this tutorial, we explore how to use it.
---

If I wanted to make a cake, I need the right ingredients - eggs, sugar and flour. However, eggs, sugar and flour are not a cake. It requires putting those ingredients together in a particular way to create a cake, using the right recipe and tools.

Similarly, a headless CMS, a static site generator and a continuous deployment service are typical ingredients in a JAMstack site. JAMstack also requires putting those ingredients together in a particular way to create a site, but, in many cases, developers were left to accomplish this without a recipe or tools. For example, how do I connect my content and assets in Contentful to my Hugo site? Or how about pulling my Sanity content into my Jekyll site?

[Sourcebit](https://github.com/stackbithq/sourcebit) is a new, MIT-licensed open source project that solves this problem by giving you both the tools and the "recipe" for building a JAMstack site that is driven by your data. In this article, I'll go into detail about what Sourcebit is, why it is necessary and how to get started using it. It's worth noting that Sourcebit is completely customizable and extensible via plugins, and a future post will cover those topics in more detail.

## Introducing Sourcebit

[![Sourcebit](/images/1582730934-sourcebit.png)](https://github.com/stackbithq/sourcebit)

Sourcebit is a new open source project that aims to make it easy for developers to connect their JAMstack site to data coming from a broad range of sources. It does this by abstracting the steps for consuming data from any source:

-   Pulling the data and assets from the source;
-   Transforming that data, if needed;
-   Making the data accessible where it is needed by the static site generator. This can be as files or by calling the Sourcebit module from within the site's code.

Within Sourcebit, each of these three steps is represented by plugin point: a source; a transformation; and a target.

So, let's take our example from above where we want to pull content and assets from Contentful and use them locally in a Hugo site. The source plugin would be for Contentful, the transformation plugin would handle pulling assets and modifying content with the appropriate local URLs and, finally, the target plugin would be Hugo. Sourcebit will pull your content from Contentful, place it into the appropriate location in your Hugo project and then you can continue through the build and deployment process.

The best part is, Sourcebit is designed to walk you through the process of setting all that up - there's no need to hand-code a complicated JSON or YAML configuration.

As part of the initial release, Sourcebit has pre-built plugins for Contentful and Sanity as headless CMS sources, Hugo and Jekyll as static site generators and an asset plugin to pull assets locally and transform the references in your content.

### Example Site

In order to walk us through how Sourcebit works, I've created an [example project](https://github.com/remotesynth/control-fan-page) that uses Sourcebit to populate content and assets that are pulled from Contentful. The site is intended to emulate a "fan page" for the [video game Control](https://controlgame.com/) (great game - highly recommended!). Here are some details:

-   The site is populated with some example content and assets from the [Control Wiki](https://control.fandom.com/wiki/Control_Wiki).
-   The [Contentful](http://contentful.com/) content model has two types:
    _ An "About" type that represents a standard "About Us" type page.
    ![The About model](/images/1582723760-about-model-sm.png)
    _ A "Blog Post" model that represents a group of posts.

        		![The About model](/images/1582723782-post-model-sm.png)

-   It is a standard [Hugo](https://gohugo.io/) site created without any pre-built in CMS integration.

You can find the source code for the project at [github.com/remotesynth/control-fan-page](https://github.com/remotesynth/control-fan-page). You can see what the finished project with the populated content looks like at [control-fan-page-demo.netlify.com](https://control-fan-page-demo.netlify.com/).

![The finished project using Sourcebit](/images/1582723780-finished-project-sm.png)

## Getting Started with Sourcebit

Let's walk through an example of how you can use Sourcebit in your project.

### Interactive Command Line Configuration

Sourcebit has an interactive set up process that will generate the configuration needed to connect a data source to a local project. This makes it really easy to get started - just enter the following command into your terminal:

```bash
npx create-sourcebit
```

Sourcebit will start by asking you which of the available source plugins (currently Contentful, Sanity or a mock data plugin) you would like to connect. Select using the arrow key and press the spacebar on the ones you'd like to choose.

![choosing a source](/images/1582723765-create-step1-sm.png)

Next, optionally select from one of the available transformation plugins. Currently, only the assets plugin is available, which will pull assets from the source locally and replace the URLs in the content with the appropriate local URL.

![choosing a transformation](/images/1582723769-create-step2-sm.png)

Finally, select the target plugin from the available options (Jekyll or Hugo as of this writing).

![choosing a target](/images/1582723771-create-step3-sm.png)

Once the choices are made, Sourcebit will retrieve and install the necessary plugins for you and begin walking you through the steps to configure each.

#### Configuring the Contentful Source Plugin

First up, I need to configure the Contentful plugin. Sourcebit begins by asking for a personal access token so that it can be configured to have access to the content. You can get a [Contentful personal access token here](https://app.contentful.com/account/profile/cma_tokens). Then it will ask which space you are working with, listing the available options. It does the same for environments, however, in my case, I only have one environment so it smartly skips that step.

![Contentful options](/images/1582723773-create-step4-sm.png)

#### Configuring the Asset Transformation Plugin

Next, I need to set up the assets transformation plugin. The first thing is to specify the folder within the site where assets will be saved. Sourcebit lists some common answers, or I can specify my own, which is what I choose because Hugo prefers static assets to be under the `/static` directory. I'll enter `static/images` as the directory.

![Asset options](/images/1582723775-create-step5-sm.png)

The next question is what the relative URL to the assets will be. Sourcebit assumes the same value as the downloaded assets, but in this scenario I want to enter just `/images`.

#### Configuring the Hugo Target Plugin

It is time for me to configure how Sourcebit handles the Contentful data and saves it for Hugo. Sourcebit sees the content models from Contentful and asks me if they should be saved as pages (i.e. Markdown files), Data (i.e. JSON or YAML files) or if they should be skipped. Both of my data models represent pages.

![Hugo destination options](/images/1582723778-create-step6-sm.png)

The next step will ask a series of questions about each content model. Each step shows actual source data examples to help guide you in making the proper selections. The steps for Hugo are:

-   Whether it represents a single page or a series of pages. In my case, "About" is a single page but "Blog Post" is a series of pages.
-   Which directory the content files will be placed in. For the "About" page, it simply goes in `content` but blog posts will go in `content/posts`.
-   How I want to generate the file name. In both cases, I chose to use the content's title field to generate the file name.
-   In the case of a collection of posts, it asks if I want to append the date to the file name. I choose no.
-   How to generate the value for the layout frontmatter field. I specify a static value for both, which is `page` for "About" and `post` for blog posts.
-   Lastly, I select which field represents the page's content. In both of my cases, that is "body".

You can see the entire process of configuring Hugo that I described in the short video below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Dm4So1UPd9c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

When everything is done, Sourcebit generates a `Sourcebit.js` file. This is the configuration I need to use to run the content pull using Sourcebit. Any sensitive information, such as the Contentful personal access token, are placed in a `.env` file - as such, this file should not be checked into a public repository. The final step is to run `npm install` to install the necessary dependencies.

#### Advanced Configuration

Since Sourcebit stores all of its configuration in a JavaScript file (`Sourcebit.js`), it allows for all kinds of additional advanced customization of its functionality using your existing code skills. For example, I could modify the `writeFile` function that outputs the final file content to disk and run additional code to tweak the body content before passing it on.

### Basic Usage

Now that everything is configured I can use Sourcebit to populate my site. Below is a screenshot of my site before running Sourcebit. It has no content.

![Unpopulated site](/images/1582729061-empty-site-sm.png)

However, I simply need to run `sourcebit fetch` and all of my Contentful content gets pulled and placed into the proper location as shown below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/9-7U2m3OIlM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Note: Using `sourcebit fetch` in this manner requires that you have your local npm_modules on your PATH. If you do not, you will need to run `./node_modules/.bin/sourcebit fetch` or [follow the instructions here](https://coderwall.com/p/i5z1cg/automatically-update-path-with-proper-node_modules-bin) to update your PATH.

Sourcebit can also watch for any changes in the source (in this case, Contentful) by appending the `--watch` flag and immediately pull them. In the video below, I make a change and publish it to Contentful and seconds later my local site auto-refreshes with the update.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mozvlfrBqb4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Adding Sourcebit Into Your Netlify Workflow

If you use [Netlify Dev](https://www.netlify.com/products/dev/) for your local development workflow, it's easy to incorporate Sourcebit into your local development workflow.

1. Update your `package.json` scripts to include a script to run Sourcebit prior to running the command to serve your project using the local webserver:
    ```javascript
    "scripts": {
    "serve": "(sourcebit fetch --watch) & hugo serve"
    }
    ```

````
2. Modify the `netlify.toml` file in your project to add a custom build command:

```toml
[dev]
command = "npm run serve"
```

Now whenever you run `netlify dev` it will pull all the content prior to serving it and set Sourcebit up to watch for content changes during development. When you are ready, the files can be pushed to your git repository and then live on Netlify.

## Next Steps

Obviously, there is a lot more you can do with Sourcebit. You could use it in a similar manner with the Sanity source plugin or Jekyll target plugin. You can also use Sourcebit to configure sources and then call it [as a CommonJS module](https://github.com/stackbithq/sourcebit#as-a-commonjs-module) from within your site code - this can be useful for incorporating it into frameworks like [Next.js](https://nextjs.org/), for instance. You can also write your own source, transformation or destination plugins - there's even a [sample plugin](https://github.com/stackbithq/sourcebit-sample-plugin#readme) to guide you. If you create one, be sure to share it with us!

Please check out the [Sourcebit repository](https://github.com/stackbithq/sourcebit) for more documentation. And when you give Sourcebit a try, please let us know what you think.
````
