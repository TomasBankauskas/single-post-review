---
thumb_img_path: '/images/1589897443-markdownsm.png'
content_img_path: '/images/1589897446-markdown.png'
template: post
title: What is Markdown and Why Does it Matter to the Jamstack?
excerpt: >-
    Markdown is so ubiquitous in the Jamstack that many people confuse the M in
    the JAM acronym to mean Markdown rather than markup. But how did this happen
    and why does Markdown play such a big role in Jamstack development?
date: '2020-05-19'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    Markdown is so ubiquitous in the Jamstack that many people confuse the M in
    the JAM acronym to mean Markdown rather than markup. But how did this happen
    and why does Markdown play such a big role in Jamstack development?
---

Markdown has become so ubiquitous to developers that it is often taken for granted and assumed that just about anyone creating content is familiar with it. However, once you move out of developer circles, it becomes much less common that anyone has ever heard of it, much less used it. The primary means of authoring content for the average non-developer is still Word or a tool with a similar authoring experience (ex. Pages or Google Docs).

If you're unfamilar with Markdown but find yourself writing or editing content for Jamstack sites, you may be wondering what all this weird formatting is all about. In this post, I hope to offer some background on what Markdown is and the role it typically plays in the Jamstack.

## A Brief History of Markdown

Markdown was originally [released in 2004 by John Gruber](https://daringfireball.net/projects/markdown/) who was already very well known for his Apple-focused blog. He created the syntax in collaboration with Aaron Swartz, co-founder of Reddit.

![John Gruber's original Markdown](/images/1589897495-gruber-markdown.png)

Markdown has two parts:

1. A syntax for marking up plain text documents.
2. A tool (originally written in Perl) to convert this markup into valid HTML.

The idea was that Markdown would not only be easy to write, with a relatively limited and simple syntax, but more importantly it would be easy to read. This contrasted with writing in straight HTML which has a tag-based markup that can be verbose and make readability difficult, especially if you are unfamiliar with the meanings of each tag.

While other markup languages like BBCode, Textile, AsciiDoc, and ReStructuredText already existed, Markdown caught on and was adopted by sites like GitHub, Reddit and StackOverflow for formatting content. Like other markup languages such as Textile, Markdown had no official specification, which led to one of Markdown's most enduring and confusing aspects.

### Markdown "Flavors"

The original Markdown Perl script that is still available on John Gruber's site for download was last updated in late 2004. Markdown had some issues, which [Jeff Atwood detailed back in 2009](https://blog.codinghorror.com/responsible-open-source-code-parenting/), but they were never addressed by the "official" Markdown. This lead to improvements being made within each individual Markdown implementation. Each of these Markdown variants are often referred to as flavors.

The most accurate list I can find identifies [36 flavors of Markdown](https://github.com/commonmark/commonmark-spec/wiki/markdown-flavors), each with its own particular syntax variations. Those of us with experience in Markdown have likely encountered these differences. They often become visible in small rendering differences when copying Markdown from one program to another.

These issues led to the creation of the [CommonMark specification](https://commonmark.org/), which aimed to create a clear and evolving standard for Markdown syntax. While this has lead to some programs and Markdown implementations to adopt the standard, the adoption has been far from universal. Thankfully, in most cases the rendering differences tend to be small.

## Markdown and Static Site Generators

Jekyll was one of the earliest static site generators that gained widespread adoption, partly because it was the default tool supported in GitHub Pages. Jekyll moved from Textile markup to Markdown in 2008 with the release of [v0.1.3](https://jekyllrb.com/docs/history/#v0-1-3). Most of the popular static site generators that followed also supported Markdown by default.

Developers had become increasingly comfortable with Markdown because of its adoption on sites that were popular with them. Thus, one of the early draws of static site generators for creating sites - particularly blogs - was the ability to author content using Markdown. Eventually, Markdown became so embedded in the ecosystem of static site generators that, with the introduction of the term JAMstack (now Jamstack), many people still confuse the M in the JAM acronym for Markdown (so much so that I once wrote a post on [that topic alone](https://remotesynthesis.com/blog/m-is-for-markup)).

### Front matter

One of the benefits of Markdown was that it was flexible enough to meet almost any content-related task as, in most cases, it was implemented to allow for any arbitrary HTML. However, this didn't completely meet the needs of static site generators. Posts and pages often needed some form of properties or metadata that contained data associated with the content. This introduced the concept of front matter.

Front matter is generally YAML, TOML or JSON data placed at the beginning of a Markdown file that contains any metadata associated with that file. It could include things such as SEO attributes of a post, which template to use to render a page, or complex structures of navigation or taxonomies. There really isn't a limitaton on what is allowed in front matter.

Here's a very simple example of YAML frontmatter you might find in a Jekyll post:

```yaml
---
layout: default
title: What is Markdown?
date: 2020-05-20 12:34
author: Brian Rinaldi
---
This is my post.
```

In some cases, this front matter can contain the majority of the content of a page. For example, a site's home page can often have long and complex front matter that defines content for the various sections and sub-sections within the design.

## Markdown in the Modern Jamstack

Markdown's central place in static site generators means that it remains a key ingredient in modern Jamstack applications. This has hardly diminished as Jamstack applications have moved towards headless CMS for managing content.

### Markdown in Headless CMS

There are two main types of headless CMS: git-based and API-based. (Not sure what the differences are? I [explain them here](https://docs.stackbit.com/best-practices/api-versus-git-based-cms/).) Regardless of which type you choose, you will end up working with Markdown on some level.

Since a git-based CMS adds a content management layer over your existing file-based content, a key component of any git-based CMS is a Markdown editor. For example, here is the Markdown editor built into Netlify CMS:

![Editing Markdown in Netlify CMS](/images/1589897532-netlifycms-markdown-sm.png)

Rather than require that all content writers and editors know Markdown, the git-based CMS provides a WYSIWYG (What You See Is What You Get) style editor for managing Markdown-based content. This mimics the experience of WYSIWYG HTML editors common in traditional CMS with the difference being, of course, that the resulting source is written Markdown syntax.

Similarly, API-based CMS will generally provide a WYSIWYG-style Markdown editor for long form text content. For example, here is the Markdown editor inside Contentful:

![Editing Markdown in Contentful](/images/1589897569-contentful-markdown.png)

One key distinction is that most API-based CMS also provide some form of structured long-form content. For instance, in Contentful it is called Rich Text or in Sanity it is called Block Content. While the WYSIWYG editors generally looks similar to their comparable Markdown editor, the underlying source is very different, instead relying on some form of rich text specification that, in the case of a web site, would need to be converted to HTML.

Why the difference? Why not use Markdown for rich text? The key thing here is that Markdown is designed to be converted to HTML. API-based headless CMS are designed to create content that can drive more than just web pages. This means that the end result of the structured text might not always be HTML. In addition, these rich text specifications generally have support for things that Markdown does not, like linking objects in the CMS, as one example.

### MDX

Markdown's inability to easily embed complex UI elements has led to a further expansion of the Markdown ecosystem with the creation of [MDX](https://mdxjs.com/). While Markdown can generally accept any arbitrary HTML in use cases that Markdown syntax doesn't cover, this still presented a problem for React-based sites that require React components instead of standard HTML.

![MDX homepage](/images/1589897599-mdx-site-sm.png)

MDX aims to solve that problem by allowing the author to embed [JSX](https://reactjs.org/docs/introducing-jsx.html), which are effectively a JavaScript representation of HTML, into Markdown text. With the widespread usage of React-based static site generators like Next.js and Gatsby, usage of MDX has grown. It remains very much a developer-centric solution though, and not something one would anticipate that a non-developer content author or editor would need to become familiar with.

## Where to Go From Here

If you already know Markdown, then hopefully this was a good look at the ecosystem that relies on it. If you are new to Markdown, then hopefully this offered some good background on what it is and how to use it. Regardless, I wanted to leave you with some resources and tools related to using Markdown.

-   [Mastering Markdown](https://guides.github.com/features/mastering-markdown/) - a comprehensive overview of Markdown and usage of the GitHub flavored Markdown syntax.
-   [CommonMark Markdown Tutorial](https://commonmark.org/help/) - a good reference for a common flavor of Markdown syntax. It'll teach you the basics that cross the various implementations and has a good interactive tutorial for learning Markdown syntax.
-   [Typora](https://typora.io/) - an excellent editor (still in beta and free) for writing and reading Markdown available for MacOS, Windows and Linux.
-   [Paste as Markdown](http://markitdown.medusis.com/) - for when you need to quickly convert rich text copied (ex. from the browser) to Markdown.
-   [Word to Markdown converter](https://word2md.com/) - while far from perfect, this tool can help in a crunch to comnvert Word documents.
-   [Deckset](https://www.deckset.com/) - a tool I enjoy for creating full slide decks using only Markdown (Mac only).
