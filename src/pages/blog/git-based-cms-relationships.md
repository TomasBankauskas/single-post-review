---
thumb_img_path: >-
    /images/1586785632-managing-content-relationships-sm.png
content_img_path: >-
    /images/1586785627-managing-content-relationships.png
template: post
title: Managing Content Relationships in Git-based Headless CMS
excerpt: >-
    Relationships between content items are key to developing a good content
    model. This post explores how to handle these relationships in a JAMstack site
    that uses a git-based content management system.
date: '2020-04-13'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    Relationships between content items are key to developing a good content
    model. This post explores how to handle these relationships in a JAMstack site
    that uses a git-based content management system.
---

Relationships are a key aspect of modeling content. They help represent complex content models without duplicating data, making it more maintainable, while also promoting the reuse of content. Relationships are a pretty standard part of representing content in a relational databases or in API-based headless CMS, which generally represent content that a manner similar to a database. However, git-based headless CMS store their content in files - generally a combination of Markdown, YAML and JSON - so representing relationships isn't as straightforward.

In this post, I will explain how relationships are handled when content and data are held in files. We'll look at how this can be done on your own, using files without a CMS, as well as using popular git-based headless CMS options like Forestry and Netlify CMS.

## Why Relationships?

Let's imagine a simple blog site that has multiple authors. The post data model might contain the following data:

-   Title
-   Date Posted
-   Description
-   Body
-   Author

In most cases, `author` will represent more than just a string with the name. However, we want to include a photo, a bio, social media profile links with our post. So let's update the content model:

-   Title
-   Date Posted
-   Description
-   Body
-   Author Name
-   Author Photo
-   Author Bio
-   Author Twitter

This works, but what happens when the author has 10 posts...or 100? The first problem is I will need to reenter the author information in each entry. The second problem is that I will need to update every entry each time any of this information changes. The third problem is that I want to display authors on a "contributors" page and there's no easy way to get just a list of authors.

This is where relationships come in. Instead of putting the information in each entry, I would create an author content type:

-   Name
-   Photo
-   Bio
-   Twitter

And then the `author` field of the post content type would actually be a reference to the author record. In a database, this might be a foreign key reference to the ID of the author (i.e. the author record's primary key). But what if the author is just an entry in a JSON file or even just Markdown file with frontmatter?

## Manually Managing Relationships in File-based Content

_View the code for this example at <https://github.com/remotesynth/content-relationships-manual>._

First, let's look at how you might define these sorts of relationships in a site where the content is manually edited without a CMS. My example will be a simple blog in which I share non-controversial opinions about Star Wars 😉. Below is my new blog in all it's beautifully designed glory!

![sample star wars blog](/images/1586786161-star-wars-blog-sm.png)

When you drill into each page, we display not just the post content and author, but a list of related posts.

![sample star wars blog](/images/1586786192-star-wars-blog-single-sm.png)

To achieve this, the blog has two types of content: posts and authors. Each post will have only one author but each post can also be related to any number of other posts. Here is a sample author page which only has their name and bio as the body:

```yaml
---
title: Brian Rinaldi
---
Love Star Wars but not a "super fan."
```

And here's a sample blog post:

```yaml
---
title: The Last Jedi Was Good
date: 2020-04-01
author: brian-rinaldi
related_posts:
    - return-of-skywalker-awful
    - han-shot-first
---
Did it have flaws? Yes. Was it light years better than RoS? Absolutely.
```

I chose to manage the references to the related content objects via a file name. So `brian-rinaldi` refers to `/authors/brian-rinaldi.md` and `han-shot-first` refers to `/posts/han-shot-first.md`. Let's look at an example of how to display this data on the post detail page. In this example, I am using Hugo, but you might use similar logic in whatever static site generator (SSG) you choose.

```html
<h2>{{ .Title }}</h2>
{{ $author_page := print "/authors/" .Params.Author }}
{{ with .Site.GetPage $author_page }}
    <p><em>By {{.Title}}</em></p>
{{ end }}
{{.Content}}

<h4>Related Posts</h4>

<ul>
{{ range $postname := .Params.Related_posts }}
    {{ $post_page := print "/posts/" $postname }}
    {{ with $.GetPage $post_page }}
        <li><a href="{{.Permalink}}">{{ .Title }}</a></li>
    {{ end }}
{{ end }}
</ul>
</html>
```

First I assemble the URL of the author page and then use `.Site.GetPage` to load it. The `with` block scopes the content within to the page, thus `.Title` outputs the title of the author content. I do a similar thing with related posts, except that instead of a single relation, I am looping over an array of related items (the use of `$.GetPage` is just to work around scoping issues).

This works, but it's likely in most cases you'll be managing this sort of content via a CMS, so let's look at how to do this. Note that our examples will focus on relationships between page-based content, though many of the same principles will apply when a relationship includes a data file.

## Managing Relationships in Netlify CMS

_View the code for this example at <https://github.com/remotesynth/content-relationships-netlifycms>._

Let's first look at how to manage these sorts of relationships in [Netlify CMS](https://www.netlifycms.org/). Netlify CMS is an open source, git-based CMS. It obviously can be deployed to Netlify, but this is not a requirement. Let's look at how we'd set up the example above to be using Netlify CMS. I will focus on defining and managing the relationships rather than the nuts and bolts of getting Netlify CMS up and running.

Netlify CMS defines its content model via a `config.yaml` configuration file placed within the `admin` directory. For this site, we only need two collections: one for the posts and one for the authors. Here are the complete collections from my configuration.

```yaml
collections:
    - name: post
      label: Posts
      folder: content/posts
      create: true
      slug: '{{slug}}'
      fields:
          - widget: string
            name: title
            label: Title
            required: true
            hint: >-
                The title of the blog post
          - widget: date
            name: date
            label: Date
            required: true
            hint: >-
                The date the post is published
          - widget: string
            name: slug
            label: Slug
            required: true
            hint: >-
                The post URL (do not include folder or file extension)
          - widget: relation
            name: author
            label: Author
            required: true
            hint: >-
                The author of the post
            collection: author
            valueField: slug
            searchFields: ['title']
            displayFields: ['title']
          - widget: relation
            name: related_posts
            label: Related Posts
            required: false
            multiple: true
            hint: >-
                Other related posts
            collection: post
            valueField: slug
            searchFields: ['title']
            displayFields: ['title']
          - widget: markdown
            name: body
            label: Content
            required: true
            hint: Page content
    - name: author
      label: Authors
      folder: content/authors
      create: true
      slug: '{{slug}}'
      fields:
          - widget: string
            name: title
            label: Name
            required: true
            hint: >-
                The name of the author
          - widget: string
            name: slug
            label: Slug
            required: true
            hint: >-
                The post URL (do not include folder or file extension)
          - widget: markdown
            name: body
            label: Content
            required: true
            hint: Author bio
```

The key pieces of this, from a relationships point of view, are the `author` and `related_posts` fields. These use the [relation widget type](https://www.netlifycms.org/docs/widgets/#relation), which allows users to select a reference to another collection via the CMS user interface. Here's what that looks like - notice the difference between `author`, which is a single value reference, and `related_posts`, which has `multiple: true` thereby allowing multiple reference selections.

![The Netlify CMS relationships UI](/images/1586786241-netlifycms-ui-sm.png)

As you can see from the image above, the user can search for related items either by pulling the dropdown or by typing and filtering. The multiple select is smart enough to only show options that have not yet been selected. The configuration has different options for the field in the related content that it performs the search on (`searchFields`) and the fields that it displays in the UI (`displayFields`) - both allow for multiple fields to be defined. In my case, I am using just the `title` field for both authors and posts.

So far, that's pretty simple, but the `valueField` leads us into into the trickier part. In the manual solution above, we used the slug of the file to link the objects. However, Netlify CMS does not allow you to select the filename or slug for the `valueField` - it must be a field defined in the frontmatter.

If you were paying very close attention, you may have noticed an additional field named `slug` in both the `post` and `author` content types defined in the `config.yaml`. This is a string containing the posts slug to be used by the SSG but also by Netlify CMS to manage the relationship value placed into the frontmatter. In doing so, the exact same Hugo code used to load pages will still work.

The issue with this is, as you can imagine, that it is very fragile. First, my code loading the page assumes that the slug and filename match. Since `slug` is just a textfield in the CMS, it is prone to easy typos. I could change the code to search for posts based on the `title` value and then load the page using `GetPage` on the result, but regardless it is still prone to typos and mistakes.

## Managing Relationships in Forestry

_View the code for this example at <https://github.com/remotesynth/content-relationships-forestry>._

[Forestry](https://forestry.io/) is another popular, commercial git-based CMS option. The basic setup of Forestry is simple. I can import the manual relationships project I created above and choose Hugo as my SSG and Forestry will automatically look at the content and map out the data models in its system for you, placing all of these settings in a `.forestry` directory in your project. Below is the default editing for a post.

![default editing in Forestry](/images/1586786277-forestry-defaults-sm.png)

As you can see, while Forestry is extremely smart in recognizing fields, it isn't able automatically see that the `author` and `related_posts` represent relationships. Instead, `author` is just a string value and `related_posts` is an array of string values. However, we can override these - let's see how.

To start with, I can open one of the posts and, from the menu icon in the top-right-corner, choose "Create Template" to create a [frontmatter template](https://forestry.io/docs/settings/front-matter-templates/) based upon the content model.

![create a new frontmatter template](/images/1586786310-forestry-create-template1.png)

I'll name my template "Posts".

![name the frontmatter template](/images/1586786351-forestry-create-template2.png)

This will generate a frontmatter template as shown below, which I can edit via the UI.

![the generated template](/images/1586786380-forestry-create-template3.png)

However, I need to make some changes that can't be made via the UI, so I'll need to pull the code down and edit it. Once I've fetched the code from GitHub, the generated file can be found at `.forestry/font_matter/templates/posts.yml`. It has the following contents:

```yaml
---
label: Posts
hide_body: false
fields:
    - type: text
      name: title
      label: title
    - type: datetime
      name: date
      label: date
    - type: text
      name: author
      label: author
    - type: list
      name: related_posts
      label: related_posts
```

This file needs a little help. Let's add a `config` option to each that contains `required: true` to `title`, `date` and `author`. For example, our title will look like this:

```yaml
- type: text
  name: title
  label: title
  config:
      required: true
```

Next, I need to edit the `author` type. Rather than `type: text` this should be [`type: select`](https://forestry.io/docs/settings/fields/select/) so that it will create a drop down of options. Then within the `config` I define a `source` of type `pages` that pulls from the `authors` section as shown below:

```yaml
- type: select
  name: author
  label: author
  config:
      required: true
      source:
          type: pages
          section: authors
```

The `related_posts` is already using the [sortable list field type](https://forestry.io/docs/settings/fields/#sortable-list-field), which is what I need. However, I need to configure it to use a select-style entry rather than text and to pull that select from the list of posts. The configuration for this looks similar to the code above.

```yaml
- type: list
  name: related_posts
  label: related_posts
  config:
      use_select: true
      source:
          type: pages
          section: posts
```

The last step is to force posts to use this template by modifying the `.forestry/settings.yml` file. Under the section for `posts`, I'll add the `template` setting as follows:

```yaml
- type: directory
  path: content/posts
  label: Posts
  create: all
  match: '**/*'
  templates:
      - posts
```

Once I check everything back into GitHub, I can see that my dropdowns are working properly.

![editing a post in Forestry](/images/1586786464-forestry-editing.png)

You may notice that my existing references to authors and related posts have now disappeared or show "Invalid Reference." This is because Forestry adds the full relative path to each related file rather than just the slug. I can either edit this manually for each post via the UI or in the code. For example, here's the updated frontmatter for one of my posts:

```yaml
title: Han Shot First
date: 2020-03-31
author: authors/brian-rinaldi.md
related_posts:
    - posts/last-jedi-was-good.md
    - posts/return-of-skywalker-awful.md
```

## The Problem with Relationships in Git-based CMS

The main issue with these solutions is that they are very brittle. Some of them require the user to manually enter the proper slug, which is prone to typos and mistakes. However, even in the best case scenario where the CMS helps to ensure the validity of the data, the content can be easily overridden as it is just text-based data in a flat file. All it takes is someone manually editing a file or even deleting it for it to potentially break.

Because of the file-based nature of content in a git-based CMS, there really is no way to guarantee [referential integrity](https://en.wikipedia.org/wiki/Referential_integrity). Thus, it is important that your templates account for this so that a broken relationship does not cause the build to fail. Be sure to verify whether a referenced page, data file or data value exists before using it.

## Where to Go From Here

While it may be impossible to guarantee the integrity of relationships in file-based content, relationships are still critical to building an extensible and maintainable content model. Regardless of your git-based CMS solution, there are tools to help you, so definitely reference the documentation when building your content schema. In addition, some of the problems I discussed in the prior section are very similar to the ones I discussed in my prior post about [best practices for the JAMstack with API-based headless CMS](https://www.stackbit.com/blog/jamstack-api-based-cms/), where I discuss things like handling invalid content (including linked objects) and defensive coding strategies when building templates.
