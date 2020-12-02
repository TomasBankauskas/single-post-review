---
thumb_img_path: '/images/1587992832-contentslug-sm.png'
content_img_path: '/images/1587992838-contentslug.png'
template: post
title: What the Heck are Content Slugs and How Do I Use Them?
excerpt: >-
    What is a slug and why do so many CMS use them? How can they be useful when
    creating Jamstack sites using a headless CMS? We explore everything you ever
    wanted to know about the post slug.
date: '2020-04-27'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    What is a slug and why do so many CMS use them? How can they be useful when
    creating Jamstack sites using a headless CMS? We explore everything you ever
    wanted to know about the post slug.
---

The use of a "slug" pattern in content management systems (CMS) has been common for some time. Many of us may generally grasp what one is given the ubiquity of its usage in everything from Wordpress to Drupal to Jekyll. But, if you're like me, you may never have really thought about why they exist. In this post, we'll take a closer look at what the slug in a CMS is and why it exists.

Furthermore, in my experience, slugs are often a common point of failure, in particular in Jamstack sites, because they can be prone to simple typos or other mistakes that can cause site builds to break. So we'll also explore managing slugs in popular headless CMS and using them in Jamstack sites.

## Defining Slug

You may have been using slug fields in your content for ages but never really given much thought to what they are or why they exist. So let's take a quick look at that.

Years ago it was common to have URLs with identifiers, often passed as a URL parameter, to identify individual pages. For example, you might have a URL like `http://foo.bar/?id=12345`. The `id=12345` would often represent a database record ID for the content page being loaded. This has the problem of being not indicative of what the page actually contains and not being human readable. It is also considered detrimental to your page SEO as the URL also gives the search engine no indication what the page contains.

The slug helps resolve this problem by allowing a human readable (and frequently user generated) identifier for a piece of content. The term appears to have originated in Wordpress, having been adopted from the print publishing industry. Where a permalink represented the full URL that accessed a particular piece of content, including the domain, the path and the identifier (i.e `https://stackbit.com/blog/what-is-a-slug`), the slug is only the identifier portion (i.e. `what-is-a-slug`). Slugs are human readable, but, since they are intended for the URL, they should not contain any special characters or spaces.

Yoast, creators of popular SEO plugins for Wordpress, have a good [intro to slugs](https://yoast.com/slug/) that also covers their SEO impact. [This wiki](https://en.ryte.com/wiki/Slug) has a more in depth look at both the term and its usage.

## Using the Slug in Static Site Generators

Pretty much every static site generator defaults to using the filename as the default slug. Most of them also offer some additional configuration for how the default slug is determined, thereby overriding the filename-based slug. In addition, most static site generators offer a `slug` front matter field that can be used to override the slug on a per page/post basis. For example, let's imagine a page on `mysite.com` in the `/blog` directory that has a filename of `whats-slug.md`. However, the front matter has defined `slug: what-is-a-slug`. In this case, the generated site will use `http://mysite.com/blog/what-is-a-slug` as the permalink (i.e. the URL) for the page.

Here are a few examples for some of the popular static site generator options and how they handle slugs and permalinks.

-   Hugo has [granular control](https://gohugo.io/content-management/urls) for how the default permalink and slug of a page/post is managed. In addition, you can define either a `slug` or `url` [front matter overrides](https://gohugo.io/content-management/organization/#override-destination-paths-via-front-matter).
-   Jekyll relies on a default file-naming for posts but also offers [granular control](https://jekyllrb.com/docs/permalinks/) for how slugs and permalinks are determined for posts. If you would like to override how these are determined on a per post basis, you need to use the [front matter `permalink` option](https://jekyllrb.com/docs/front-matter/).
-   Gatsby's default behavior is to use the file name as the slug, with the URL directory being the path. Overriding that on a per post basis requires the [gatsby-plugin-slug](https://www.gatsbyjs.org/packages/gatsby-plugin-slug/) plugin.

## Creating a Slug in Netlify CMS

In Netlify CMS there is, unfortunately, no configurable slug type for content models. This means that the front matter slug field isn't treated any differently than any other front matter string.

Since Netlify CMS is a git-based headless CMS, it will generate an actual file when creating content. By default, it generates the slug for new pages, posts or uploads based upon the title. You can [configure how these slugs are generated](https://www.netlifycms.org/docs/configuration-options/#slug-type) in the site config. This doesn't give the user access to a slug field in the content though.

A front matter slug in Netlify CMS would simply be a [`string` widget](https://www.netlifycms.org/docs/widgets/#string). While Netlify CMS does not allow you to generate the slug or validate that it is unique, you can add a `pattern` validation to ensure that it meets certain criteria like not using special characters or spaces. The below snippet from a Netlify CMS configuration validates a slug field based upon a regex pattern taken [from here](https://www.regextester.com/96861):

```yaml
- widget: string
  name: slug
  label: Slug
  required: true
  pattern: ['^[a-z0-9]+(?:-[a-z0-9]+)*$', 'A slug can have no spaces or special characters']
  hint: >-
      The post URL (do not include folder or file extension)
```

It's worth noting that Netlify CMS also supports [custom widgets](https://www.netlifycms.org/docs/custom-widgets/) and these _may_ allow for the creation of a custom slug widget.

## Creating a Slug in Contentful

Within Contentful, a slug is simply a specialized text field. The good news is that it has features like auto-populating based on the title and it validates for uniqueness. To create a slug field, first create a new text field as part of your content model.

![Creating a slug field in Contentful](/images/1587993056-contentful-create-field-sm.png)

Click the "Create and configure" button and then select the "Appearance" tab and choose slug.

![Modifying the appearance of a slug field in Contentful](/images/1587993061-contentful-field-appearance-sm.png)

You can see below how a slug auto-populates as a user types in the title field.

![Typing a slug in contentful](/images/1587993065-contentful-typing.gif)

To learn more about the slug field in Contentful visit [this blog post](https://www.contentful.com/blog/2019/11/29/creating-automated-slug-with-contentful/).

## Creating a Slug in Sanity

Sanity also has a [slug type](https://www.sanity.io/docs/slug-type). In Sanity, you'd define this in `/schemas/schema.js`. A basic implementation would like like this simple blog post schema below:

```javascript
{
  title: "Blog",
  name: "blog",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string"
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title"
      }
    },
    {
      title: "Body",
      name: "body",
      type: "text"
    }
  ]
}
```

The `source` option defines what field Sanity will use to generate the slug. As you can see below, the slug isn't auto-generated from the `title` field, but, instead, will generate when a user clicks on the "generate" button.

![Generating a slug in Sanity](/images/1587993069-sanity-slug-sm.png)

Sanity also provides a number of different customization options. For example, the `slugify` option lets you specify a custom function for converting the source into a slug and the `isUnique` option lets you supply a custom function to determine if the slug value is unique. For more details on those, check out [Sanity's documentation](https://www.sanity.io/docs/slug-type).

## Best Slug Practices When Using the Jamstack with a Headless CMS

As we've noted, the slug is important for readability and for SEO. Having a configurable slug in posts and pages can also be useful when creating Jamstack sites that rely upon a headless CMS. You'll want your content editors to be able to create pages dynamically within the CMS, which means that paths and slugs should rarely ever be hardcoded in your template code. For example, don't create an "About Us" page template that looks specifically for the "About Us" content record. Instead, create a standard page template that looks for any content that uses the standard page content model in the CMS and determines the path based upon the slug.

This also means that you can have different content types with dynamic links that follow the same slug patterns but differ in their presentation. For example, imagine a site with content models for blog, standard pages and landing pages.

-   The blog post may follow a permalink pattern of `/blog/{slug}`;
-   The standard page may follow a permalink pattern of `/{slug}`;
-   But a landing page may also follow a permalink pattern of `/{slug}`.

Even though the standard page and landing page may have the same slug pattern, they have different content models and are assigned a different layout. While the slug would have to be unique across both standard and landing pages, your content editors will be free to create pages of differing types without breaking your site.

Following these patterns will benefit you in the long run to make your site flexible in meeting your long term needs without requiring constant code changes to support new content.
