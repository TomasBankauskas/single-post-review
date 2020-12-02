---
thumb_img_path: '/images/1582119449-wordpresstojamstack570.png'
content_img_path: '/images/1582119454-wordpresstojamstack.png'
template: post
title: 3 Strategies for Migrating from Wordpress to JAMstack
excerpt: >-
    Migrating from Wordpress to JAMstack offers a number of benefits, but it can
    be difficult to know what the best strategy for transitioning content is. In
    this post, Brian Rinaldi shares some potential strategies for making the move.
date: '2020-02-19'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    Migrating from Wordpress to JAMstack offers a number of benefits, but it can
    be difficult to know what the best strategy for transitioning content is. In
    this post, Brian Rinaldi shares some potential strategies for making the move.
---

So much of the discussion around the JAMstack focuses on "greenfield" projects. This is useful in many ways because it can highlight the many options and benefits of the JAMstack architecture without getting bogged down in discussions around complex migrations. However, there's a good chance that your project isn't starting from scratch and you'll have to deal with a migration from an existing CMS architecture. Given that Wordpress is the content management in use on upwards of [65% of sites with a known CMS](https://w3techs.com/technologies/details/cm-wordpress), there's also a good chance you are moving from Wordpress.

First the bad news: migrations are painful. Not "can be", they are. That doesn't mean they aren't worth it. They definitely can be, and the JAMstack offers some major benefits on things like cost, speed and security (to name a few) that can make it worth the effort. The good news is that there are multiple strategies to mitigate this pain when moving from Wordpress. In this post, I want to look at three different strategies you can take when moving from Wordpress to JAMstack.

### Some Things to Consider

Before we start, it is worth considering that there are a ton of factors that can impact the complexity of the move from Wordpress. Things like plugins and shortcodes can all make a transition very complex - especially for a large site with an expansive amount of legacy content. Some strategies can minimize those complexities, but given the myriad of options Wordpress offers, your mileage may vary.

I should also note that the strategies shown here are broad concepts. While I will show code n some cases, I'm only covering the very basics to demonstrate the broader strategy. You can find the repository containing the example code shown below at [https://github.com/remotesynth/Wordpress-to-JAMstack-Options](https://github.com/remotesynth/Wordpress-to-JAMstack-Options).

_Note: For a detailed look at what it takes to move a large site with a lot of content, I highly recommend two posts by Sarah Drasner of Netlify that discuss the migration of Smashing Magazine. The first, [How Smashing Magazine Manages Content: Migration From WordPress To JAMstack](https://www.smashingmagazine.com/2020/01/migration-from-wordpress-to-JAMstack/), is a retrospective on the project, how it was accomplished and lessons learned. The second, [How To Create A Headless WordPress Site On The JAMstack](https://www.smashingmagazine.com/2020/02/headless-wordpress-site-JAMstack/) (co-authored by Geoff Graham), goes into great detail about the way they would recommend doing it today given the lessons learned._

## Option 1: Use the Wordpress REST API

Wordpress comes with a [REST API](https://developer.wordpress.org/rest-api/) that gives you access to all the content on the site. This gives Wordpress the ability to be used as a headless CMS. One of the benefits of this strategy is that the Wordpress API delivers the rendered content, meaning that you don't have to worry about transitioning things that might be automatically handled within the content by shortcodes or even most plugins.

Let's look at an example. In this example, I have a very basic Wordpress site with a couple posts that is set up using [Local by Flywheel](https://localbyflywheel.com/). Using a tool like [Next.js](https://nextjs.org/) I can easily pull posts from the Wordpress API and display them. My simple example site has two pages, one to display a list of posts and one to display the contents of the post (note that in this example I am only addressing posts and only a small portion of the content that Wordpress sends over with a post).

Here's a simple `pages/index.js` template that calls the API on my local Wordpress site to get all posts and list them. Keep in mind that there are [a lot of arguments](https://developer.wordpress.org/rest-api/reference/posts/#arguments) available to this API that I am not using here but would be useful in a more "real world" context. Also, depending on how your Wordpress URLs are set up, you would want to adjust the URL structure of your site to match. For now, I am just using the numerical ID of the post for the URL.

```javascript
import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Home = (props) => (
    <div>
        <h1>Wordpress Posts</h1>
        {props.posts.map((post) => (
            <li key={post.id}>
                <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                    <a
                        dangerouslySetInnerHTML={{
                            __html: post.title.rendered
                        }}
                    ></a>
                </Link>
            </li>
        ))}
    </div>
);

export default Home;

Home.getInitialProps = async function () {
    const res = await fetch('http://testsite.local/wp-json/wp/v2/posts');
    const data = await res.json();

    return {
        posts: data.map((entry) => entry)
    };
};
```

Now let's look at the post page, which is handled by `pages/[slug].js` in the Next.js site.

```javascript
import * as React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

export default function PostTemplate(props) {
    return (
        <div>
            <Link href="/">
                <a>&lt; Home</a>
            </Link>
            <h1
                dangerouslySetInnerHTML={{
                    __html: props.post.title.rendered
                }}
            ></h1>
            <div
                dangerouslySetInnerHTML={{
                    __html: props.post.content.rendered
                }}
            ></div>
        </div>
    );
}

PostTemplate.getInitialProps = async function (ctx) {
    const { slug } = ctx.query;
    const res = await fetch(`http://testsite.local/wp-json/wp/v2/posts/${slug}`);
    const post = await res.json();
    return {
        post
    };
};
```

Here I am calling my Wordpress API with the ID of the post that is passed in the URL of the page. In setting both the title and body on the output, I am using the rendered HTML that the Wordpress API provides.

_Note: An alternative to writing the direct calls to the API is to use something like [node-wpapi](https://github.com/WP-API/node-wpapi). This could be useful for use cases that are more complex than my admittedly simple example._

While Next.js does a great job of handling server-side rendering and local caching, this is arguably not a JAMstack site yet since the frontend at this dynamic with server-side rendering (SSR) that would require a server. However, Next.js provides the ability to [export a site into static files](https://nextjs.org/learn/excel/static-html-export) that can be hosted without SSR. To do this, we need to add a `next.config.js` file into the root of our site where we can add code and configuration for handling the export.

```javascript
const fetch = require('isomorphic-unfetch');

module.exports = {
    exportTrailingSlash: true,
    exportPathMap: async function () {
        const paths = {
            '/': { page: '/' }
        };
        const res = await fetch('http://testsite.local/wp-json/wp/v2/posts');
        const data = await res.json();
        const posts = data.map((entry) => entry);

        posts.forEach((post) => {
            paths[`/posts/${post.id}`] = { page: '/posts/[slug]', query: { slug: post.id } };
        });

        return paths;
    }
};
```

This configuration also needs to call the Wordpress API so that it can set up all the paths to be exported. Once this is set up, we need to run a build and then an export (note that these commands will need to have been added to your `package.json` scripts as [shown here](https://nextjs.org/learn/excel/static-html-export/export-the-index-page)).

```bash
npm run build
npm run export
```

The site will be exported into the `/out` directory in your project. If you start up a local web server in the `/out` directory, you will see that we can now browse our Wordpress content on a fully JAMstackified (that's a thing now - make it so!) site.

One last thing here - if you want to continue to use the Wordpress backend to manage your site, you wouldn't want to run this and then deploy every time someone makes a change, but there are many ways to trigger a build when a change is made in Wordpress. For example, if your site is hosted at Netlify, you could use this [WP Trigger Netlify Build](https://github.com/iamtimsmith/wp-trigger-netlify-build) plugin. Alternatively, you could use something like Zapier or IFTTT to trigger a build. There are a number of other solutions to this depending on where your site is deployed, but the point is, it should require no direct developer intervention to have changes deployed.

## Option 2: Export Content to Flat Files

In some cases, you may want to have actual physical files of your content for your site. This is useful, for instance, with static site generators like Hugo or Jekyll or if you are doing a one-time export of your content rather than continuing to use the Wordpress backend for managing content. There are multiple ways to handle that.

Wordpress does provide a default export functionality, however the file it delivers is mostly useful for importing to another Wordpress site as it doesn't give you the rendered HTML in the manner the API does. For example, you can embed a YouTube video in Wordpress using just the URL of the video. The rendered content includes the iframe, but the export includes this in post metadata in the exported XML rather than in the text of the post. Luckily there are better ways to handle this.

If you wish to do a one-time export, many static site generators include tools to migrate off Wordpress. For example, Hugo has a [Wordpress to Hugo Exporter](https://github.com/SchumacherFM/wordpress-to-hugo-exporter). Likewise, if you're using Gatsby, there is a [WP Gatsby Markdown Exporter](https://github.com/tinacms/wp-gatsby-markdown-exporter) that you can run via the command line. Other SSGs have similar options.

There's another option if you either want to have fine-grained control over the export or you wish to continue to use the Wordpress backend but still want a file-based content source on the front end - write a conversion script that uses the API. Let's look at a simple example written in Node that utilizes the same simple Wordpress site from the prior section.

```javascript
const fetch = require('isomorphic-unfetch');
const TurndownService = require('turndown');
const yaml = require('js-yaml');
const fs = require('fs');
const turndownService = new TurndownService();

fetch('http://testsite.local/wp-json/wp/v2/posts')
    .then((r) => r.json())
    .then((posts) => {
        posts.forEach((post) => {
            let frontmatter = {
                title: turndownService.turndown(post.title.rendered),
                date: post.date,
                slug: post.slug
            };
            let postContents = '---\n' + yaml.safeDump(frontmatter);
            postContents += '---\n' + turndownService.turndown(post.content.rendered);
            fs.writeFileSync(`posts/${post.slug}.md`, postContents, 'utf8');
        });
    });
```

This example utilizes two libraries for managing the conversion. [Turndown](https://github.com/domchristie/turndown) takes the rendered HTML provided by the Wordpress API and turns it into Markdown. In my example, I only tested it with very simple content, so you may want to work closely with its configuration options as, by default, it removes content that it cannot convert to Markdown. It also uses [js-yaml](https://www.npmjs.com/package/js-yaml) to create the frontmatter for each post. In this example, it simply writes the file locally which would then be committed to the JAMstack site's repository. You could (relatively) easily incorporate similar code that uses the [GitHub API](https://developer.github.com/v3/), for instance, and writes the files into the repository to trigger a rebuild. Alternatively, this could be incorporated into a build process using something like [Netlify build plugins](https://www.netlify.com/build/plugins-beta/) to ensure new content is pulled whenever a build is triggered.

_Note: At [Stackbit](https://www.stackbit.com/), we're working on a project that could help with this process as well called [Sourcebit](https://github.com/stackbithq/sourcebit). While it is still a very early release and still in development at the time of this writing, we are exploring adding support for Wordpress as a source plugin._

## Option 3: Import Content to a Headless CMS

The prior two options have focused on leaving either the Wordpress backend in place for future content editing or doing a one time export to files. This option provides many of the comforts of the Wordpress backend that you may lose when editing a file-based option, while eliminating the need to continue to host and manage a Wordpress instance to maintain the backend.

The means of importing will differ depending on which headless CMS you choose. In the past I know that some CMS options have maintained tools specifically to import Wordpress while others had community projects that helped with the import process. At a minimum, a headless CMS provides some form of API that can be integrated with the Wordpress API, most likely for a one time import. For example, [this post](https://hoverbaum.net/2018/03/22/Wordpress-to-Contentful-migration/) walks through doing this for Contentful.

## What's Next?

Welcome to the JAMstack! The great thing about it is that, now that you are not tied to a monolithic application architecture, you are free to explore - and the ecosystem is vast! You'll likely want to explore how you can leverage serverless functions to handle some of the dynamic functionality that was once likely handled by some form of plugin. The good news is that developers tend to love the developer experience that a decoupled architecture like JAMstack and a headless CMS provides.

The one place where the experience can still need a little help is in the editing of content. Thankfully, tools like [Stackbit](http://stackbit.com/) are helping to bring the content editing experience to a level on par or above what Wordpress provides. If you're curious to see what I mean, try out the [live demo](https://www.stackbit.com/#demo) and then sign up to get [early access](https://www.stackbit.com/#early-access).
