---
thumb_img_path: '/images/1587392762-hugo-sm.png'
content_img_path: '/images/1587392773-hugo.png'
template: post
title: Advanced Hugo Template Tips and Tricks
excerpt: >-
    Hugo's Go-powered templates can accomplish some very powerful templating
    tasks. In this post, we explore some tips and tricks for building advanced
    Hugo templates.
date: '2020-04-20'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    Hugo's Go-powered templates can accomplish some very powerful templating
    tasks. In this post, we explore some tips and tricks for building advanced
    Hugo templates.
---

[Hugo](https://gohugo.io/) is one of the most popular static site generators. It is a Go-based tool originally created by Steve Francia (now the Go product lead at Google) around 2013 - so it's been around for a while by JAMstack standards.

Hugo uses Go's [text](https://golang.org/pkg/text/template/) and [HTML](https://golang.org/pkg/html/template/) templates that underly a lot of the core features you'll use in every template, but it adds a [long list of functions](https://gohugo.io/functions/) that help you accomplish some pretty complex templating tasks. In this article, I'm going to discuss some of the things you may encounter or need as you develop more complex Hugo templates. This is by no means a comprehensive list, but they are things that I've personally needed (or needed help with) when developing with Hugo.

## Scoping

One of the things you will encounter regularly in Hugo once you get beyond the basics are issues around the current scope (sometimes also called context). If you've done any kind of Hugo templating, you'll be used to typing the leading `.` on a value or even the `.` by itself but never thought much about it.

The initial template scope is a `Page`. This is why you can generally access any [page variables](https://gohugo.io/variables/page/) without any additional scope. For example, if you want to output the title of a page, you simply put `{{ .Title }}`.

The most common time you'll encounter scope being changed is when looping over values with `range`. For example, if you are looping over pages on a [list template](https://gohugo.io/templates/lists/).

```html
{{ range .Pages }}
<li>
    <a href="{{.Permalink}}">{{.Title}}</a>
</li>
{{ end }}
```

In the above example, `.Permalink` and `.Title` refer to the current iteration of `.Pages` rather than the current page. This can get complex when you have multiple nested loops, but generally it makes sense. However, sometimes it is useful to change the base scope, while other times you are likely to encounter weird issues that are often related to scope. Let's look at these.

_Régis Philibert has a great deep dive into this topic that is worth checking out: [Hugo, the scope, the context and the dot](https://regisphilibert.com/blog/2018/02/hugo-the-scope-the-context-and-the-dot/)._

### with

First, let's look at changing the current scope using `with`. There are times when your code will be much easier to write and to understand if you change the scope. For example, let's imagine you have social accounts configured in your [`.Site.Params`](https://gohugo.io/variables/site/). Rather than write out the full path like `.Site.Params.Twitter` for each, you can use `with` to set the scope.

```html
{{ with .Site.Params }}
<div class="social">
    <a href="https://twitter.com/{{.Twitter}}"><i class="fa fa-twitter"></i></a>
    <a href="https://www.instagram.com/{{.Instagram}}"><i class="fa fa-instagram"></i></a>
    <a href="https://www.youtube.com/channel/{{.Youtube}}"><i class="fa fa-youtube"></i></a>
</div>
{{ end }}
```

Because of the use of `with` above, every variable within the block is scoped to `.Site.Params`.

Using `with` can also save you from having to write `if` statements to see if a parameter exists because the block gets skipped if the variable does not exist. In the below example, if `.Site.Params.Twitter` does not exist, the entire block is skipped (note that we then reference the variable as only the `.`).

```html
{{ with .Site.Params.Twitter }}
<a href="https://twitter.com/{{.}}"><i class="fa fa-twitter"></i></a>
{{ end }}
```

In this case, the block functions similarly to if it were surrounded by `{{ if isset .Site.Params "Twitter" }}`.

I have found `with` especially useful in combination with `GetPage` to scope output within a block to the loaded page content. We'll be discussing `GetPage` in just a bit.

### Scratch

I have to admit that for the longest time I never understood the need for [`.Scratch`](https://gohugo.io/functions/scratch/), but as your templates get more complex, you'll occasionally run into hard to figure out scope issues. It's even a little tough to describe scenarios where it is useful but, most often, when I received seemingly unexplainable errors related to undefined variables (ones that I _knew_ existed), it was usually because I was encountering a scoping issue where `.Scratch` is useful.

Most of these issues involve when you move into a different scope within a block, but then need to access some of the data outside that block (i.e. when in a different scope). Let's take the following code where, within a `with` block I need to set a variable. I should note that this example is purposefully contrived to create the problem in a way to make it clear the type of problems `.Scratch` solves.

```html
{{ with .Site.Params }} {{ $greeting := "hello" }} {{ end }} {{ $greeting }}
```

This will result in an error `undefined variable "$greeting"` even though we can see that it is being set. However, we can use `.Scratch` to set and get the variable, bypassing the scoping issues (note that I am using the `$` to get around the fact that the block is scoped to `.Site.Params` and thus does not have `.Scratch` in its scope).

```html
{{ with .Site.Params }} {{ $.Scratch.Set "greeting" "Hello" }} {{ end }} {{ .Scratch.Get "greeting" }}
```

As I said, this is an intentionally contrived example and it is worth noting that it can actually be solved by first defining the variable outside the `with` block so that it is declared within the same scope.

```html
{{ $greeting := "" }} {{ with .Site.Params }} {{ $greeting = "Hello" }} {{ end }} {{ $greeting }}
```

Still, as your templates get more complex you may into these sorts of issues in various places and it's good to be aware that `.Scratch` might be useful.

## GetPage

Sometimes you need to load the contents of another page on a template. For example, a blog post template may require author information that is contained in a page in the `/authors` directory. I could load my author information that exists at `/authors/brian-rinaldi.md` as follows:

```html
{{ with .GetPage "/authors/brian-rinaldi" }} {{.Title}} {{end}}
```

Many times you won't be loading a hardcoded file path. For example, if you are [managing relationships](/blog/git-based-cms-relationships/) between content items, you might have `author` as a frontmatter attribute on a `post`. For example, I may have something like:

```yaml
author: brian-rinaldi
```

In this case, I want to assemble the path that `GetPage` will load dynamically. If we had the full path, we could just load it as follows:

```html
{{ with .GetPage .Params.author }} {{.Title}} {{end}}
```

What if we need to dynamically generate the URL? In this case, I've found that using the [`print` function](https://gohugo.io/functions/print/) helps when assembling the string.

```html
{{ $author := print "/authors/" .Params.author }} {{ with .GetPage $author }} {{.Title}} {{end}}
```

## Complex Querying

If you've done any templating in Hugo, you've probably used the [`where` function](https://gohugo.io/functions/where/) to filter an array of results. For example, if I wanted only pages in the blog section, I might do something like this:

```html
{{ range where .Site.Pages "Section" "blog" }}
```

But one of the amazing things about the `where` statement is the ability to use it to filter an array you've already filtered and even combine it with other filters to do some pretty complex things. For example, in the following code, I am pulling pages in an "events" section, ordering them by descending date, then getting only those whose frontmatter indicate they are featured. I am skipping the first two results using the [`after` function](https://gohugo.io/functions/after/) and then randomizing the order using the [`shuffle` function](https://gohugo.io/functions/shuffle/) (of course, the random order only happens at build time).

```html
{{ $remaining := shuffle (after 2 (where (where .Site.Pages.ByDate.Reverse "Section" "events") ".Params.featured" true)) }}
```

Let's look at the code written another way that achieves the same result but makes it clearer what is going on:

```html
{{ $remaining := where .Site.Pages.ByDate.Reverse "Section" "events" }} {{ $remaining = where $remaining ".Params.featured" true }} {{
$remaining = after 2 $remaining }} {{ $remaining = shuffle $remaining }}
```

By layering `where` queries and combining them with other filtering and ordering functions, you can achieve very complex results.

### Intersect

One way to perform a complex query of results is using the [`intersect` function](https://gohugo.io/functions/intersect/), which will find results that overlap. You can use `intersect` as a function or you can use it within a query. For example, let's say I have pages with frontmatter that indicates which characters it discusses like so:

```yaml
titans:
    - Robin
    - Starfire
```

What if I want to get any pages that have one of either "Starfire" or "Raven"?

```html
{{ $titans := where .Site.RegularPages ".Params.titans" "intersect" (slice "Starfire" "Raven") }}
```

In this case, the results do not exclude pages that have other characters listed so long as they have at least one matching result (i.e. either "Starfire" or "Raven"). For purposes of example, I've hardcoded the values I want to look for, but in most cases you'd be basing this on a variable. For instance, perhaps I want to show related pages to the current page that discuss the same characters (while excluding the current page from the result):

```html
{{ if isset .Params "titans" }} {{ $titans := where (where .Site.RegularPages ".Params.titans" "intersect" .Params.Titans) ".Permalink" "ne"
.Permalink }}
<ul>
    {{ range $titans }}
    <li><a href="{{.Permalink}}">{{.Title }}</a></li>
    {{ end }}
</ul>
{{ end }}
```

## Index

The [`index` function](https://gohugo.io/functions/index-function/) is most commonly useful when you need to get a specific object in an array of data. For example, let's take the following data set:

```yaml
---
Robin:
    real_name: Dick Grayson
    species: human
Raven:
    real_name: Rachel Roth
    species: half-Azarathian/Half-Demon
Starfire:
    real_name: Koriand'r
    species: Tamaranean
Beast Boy:
    real_name: Garfield Mark Logan
    species: Metahuman
Cyborg:
    real_name: Victor Stone
    species: Cyborg
```

I could access the object for Raven via `.Site.Data.Titans.Raven`, but what if I needed to get that dynamically via a variable or frontmatter page parameter? In this case, `index` is very helpful:

```html
{{ $character := index .Site.Data.Titans .Params.Character }}
```

However, `index` can also be useful in cases where you need to pull a specific index from a data structure. For example, in the following case I need the object in the first record of a query result:

```html
{{ $events := where .Site.RegularPages ".Params.sessions" "intersect" $eventArr }} {{ $event := index $events 0 }}
```

## Where to Go From Here

Hopefully you find these tips helpful. Obviously, there's _a lot_ that I didn't cover. The first place to check for help is the [Hugo docs](https://gohugo.io/documentation/), which are very well written and comprehensive - always including a relevant code sample. I definitely recommend following [Régis Philibert's blog](https://regisphilibert.com/blog/) as he covers a lot of beginner and advanced Hugo topics (and thanks to him for his review of this post).
