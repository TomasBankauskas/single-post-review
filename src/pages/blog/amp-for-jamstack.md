---
thumb_img_path: '/images/1584018700-ampsm.png'
content_img_path: '/images/1584018627-amp.png'
template: post
title: AMP for the JAMstack
excerpt: >-
    Despite the controversy that has surrounded it, AMP has become a requirement
    for certain types of sites. Stephen Keep shows us when and why you may need
    AMP and how to implement it on a Hugo site.
date: '2020-03-12'
author: src/data/authors/stephen-keep.yml
subtitle: >-
    Despite the controversy that has surrounded it, AMP has become a requirement
    for certain types of sites. Stephen Keep shows us when and why you may need
    AMP and how to get started implementing it on a Hugo site.
---

[AMP](https://amp.dev/), which stands for accelerated mobile pages, was originally created by Google in 2015. It was designed to compete with other similar initiatives like Facebook Instant Pages and Apple News, which used specialized caching to speed up the browsing experience for content on the web. However, since its early days, AMP has been caught up in controversy. In this post, we are going to look at:

-   What AMP is.
-   The controversy around AMP and why AMP still matters for many sites.
-   How to convert an Hugo theme to AMP.
-   How to test if the page is AMP compatible.

Let's dive in.

## What is AMP?

AMP is an initiative by Google to speed up the web. It is now a part of the [Open JS Foundation](https://openjsf.org/). Google created AMP to set some standards that would help create fast pages and improve the mobile web browsing experience. These standards came at a cost. To turn an HTML page into an AMP page there are many hoops to jump through.

For example, instead of using an `img` tag, AMP uses an `amp-img` tag. This is the same for other tags for things like forms, scripts, and videos. Once you have built the AMP page, Google will then cache it in their CDN. This means that the page will load fast for users. The downside is you do lose some control as a website owner.

You may be wondering, why should I make all these changes?

## Why does AMP matter?

There is one major reason why you would jump through these hoops and that is Google Search results. Google gives AMP pages special sections in the search results. Here is a list of AMP only sections on [Google Search](https://developers.google.com/search/docs/guides/about-amp):

-   **Top stories carousel** - If you want to appear in the top stories section on Google then you need an AMP page.
    ![top stories carousel](/images/1584017959-image9.png)
-   **Host carousel** - This allows you to include a carousel of items within your search result.
    ![host carousel](/images/1584018104-image1.png)
-   **Rich result** - Get a large image in the search results.
-   **Visual stories** - This is a new component that shows a full-screen slideshow in the search results.
    ![visual stories](/images/1584018142-image7.png)

Is this a good thing? Probably not. Google is pushing its technology and using Google search as a carrot. The trouble is once your competitors start making AMP pages what can you do? If you are building a news site, you will find it hard to compete in Google Search without an AMP page.

So how easy is it to convert a site to AMP? Let's look at how to do this for a [Hugo](https://gohugo.io/) theme.

## Getting Started with AMP in Hugo

For this tutorial, we are going to start with the same Hugo theme recommended on the [Hugo Quick Start page](https://gohugo.io/getting-started/quick-start/). You can install Hugo on Mac Linux using [Homebrew](https://brew.sh) or all supported platforms using the [binary](https://gohugo.io/getting-started/installing/#binary-cross-platform). Install Hugo by following the [installation instructions provided on their site](https://gohugo.io/getting-started/installing/).

Once Hugo is installed and ready to use, let's create a new Hugo site called "amp":

```bash
hugo new site amp
```

This will create a new directory with the Hugo site default files. Next, let's add a theme - we'll use the same one recommended in the quick start guide, Ananke. Go into the new directory, initialize git and add the theme:

```bash
cd amp
git init
git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke
```

We then need to set the theme in the config:

```bash
echo  'theme = "ananke"' >> config.toml
```

That is all we need for a basic site. You can now start the site by running the Hugo server:

```bash
hugo server -D
```

When you visit the <http://localhost:1313/> in your browser you will see a page like this:

![sample hugo page](/images/1584018240-image4.png)

### Testing the AMP changes

Before we start making changes to the theme, we need a way of validating the AMP page. This is very important because if Google finds a single AMP error, it will not add the page to the Google cache. This means your pages will not appear as AMP in the Google Search results.

The best way to test the AMP page is to use the [AMP validator chrome extension](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc/related). This will add a lightning bolt icon to Chrome. Showing any errors found, it looks like this:

![AMP chrome extension](/images/1584018274-image2.png)

If the page is AMP compatible you will see a Green Icon, like this:

![AMP chrome extension success](/images/1584018305-image10.png)

Now that we have a way to verify our AMP changes, let's convert the theme to AMP.

### Converting the theme to AMP

There are a few steps we need to perform to convert the Ananke theme to AMP. These include:

-   Set as an AMP page.
-   Add the AMP script.
-   Add the AMP boilerplate CSS.
-   Add a canonical link.
-   Make the CSS inline.
-   Make the JS AMP compatible.

You may notice a couple of CSS tasks above. There are very strict rules around CSS on AMP pages:

-   No external stylesheets.
-   Only one style tag on the page.
-   Up to 50kb of CSS in the style tag.

In my opinion, handling the CSS is the hardest part when converting the theme as it is at 82kb.

Let's go through each step to convert it.

#### 1. Set as an AMP page

To make the page AMP is straight forward all you need to do is add the keyword `amp` to the `html` tag at the top of the theme,nThe file you need to change is `baseof.html` and you can find this file in `themes/ananke/layouts/_default/`. Here is the top of the `_baseof` page:

```html
<!DOCTYPE html>
<html lang="{{ $.Site.LanguageCode | default "en" }}">
<head>
    ...
</head>
```

To convert this to an AMP page you need to add the keyword `amp` like this:

```html
<!DOCTYPE html>
<html amp lang="{{ $.Site.LanguageCode | default "en" }}">
<head>
    ...
</head>
```

Simple right! We have only just started if we load the page we can see that there are still 8 AMP errors we need to fix:

![amp errors](/images/1584018336-image8.png)

Let's start to fix them.

#### 2. Add the AMP script

The first fix we need to make is to add the AMP script tag. It is best to place this near the end of the `head` tag like this:

```html
<!DOCTYPE html>
<html amp lang="{{ $.Site.LanguageCode | default "en" }}">
<head>
    ...
    <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
...
```

Now that we have the AMP script loaded we can click on the lightning bolt icon in chrome. This will show us a list of all the 7 errors found on the page:

![AMP errors list](/images/1584018367-image6.png)

#### 3. Add the AMP boilerplate CSS

The next fix is to add the boilerplate styles used by AMP. Insert these above the script we added like this:

```html
<!DOCTYPE html>
<html amp lang="{{ $.Site.LanguageCode | default "en" }}">
<head>
    ...
    <style amp-boilerplate>
        body {
            -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        }
        @-webkit-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @-moz-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @-ms-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @-o-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
    </style>
    <noscript
        ><style amp-boilerplate>
            body {
                -webkit-animation: none;
                -moz-animation: none;
                -ms-animation: none;
                animation: none;
            }
        </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
...
```

AMP uses these styles to show a fade loading animation.

#### 4. Add a canonical link

This next fix is adding a [canonical link](https://pagedart.com/blog/what-is-a-canonical-url/) which should point to the URL of the page. If you are creating only an AMP page then this should be the same URL. If you have two versions of the website one HTML and one AMP, then use the HTML URL.

My recommendation is to create only an AMP page, not both an HTML and AMP page.

When mobile sites were first on the scene many websites created two pages. One that worked on desktop and one for mobile. These sites became difficult to maintain, with twice the work for new features. That is why I recommend to go all in and only have an AMP version of the page.

Previously, it was common for people to create separate AMP-specific versions of their pages due to the restrictions imposed. For example, you could not run custom JavaScript. AMP has evolved and [since August 2019](https://searchengineland.com/you-can-now-add-custom-javascript-to-amp-pages-320997) you can now add custom scripts. This reduces the need to maintain two versions. Yet, if you still need to support both HTML and AMP, Hugo can do thisby using the [custom output formats](https://gohugo.io/templates/output-formats/) feature, which allows you to output both an AMP and HTML version. This feature goes beyond the scope of this article.

We will create an AMP only site and set the canonical like this:

```html
<!DOCTYPE html>\ <html amp lang="{{ $.Site.LanguageCode | default "en" }}">\
<head>
    \ ...\
    <link rel="canonical" href="{{ .Permalink }}" />
    \
    <style amp-boilerplate>
        body {
            -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        }
        @-webkit-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @-moz-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @-ms-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @-o-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
    </style>
    <noscript
        ><style amp-boilerplate>
            body {
                -webkit-animation: none;
                -moz-animation: none;
                -ms-animation: none;
                animation: none;
            }
        </style></noscript
    >
    \
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    \</head
>\ ...
```

We are now down to two final errors, custom CSS and custom Javascript.

#### 5. Make the CSS inline

There are very strict rules for CSS in AMP pages. You can only have 50kb of CSS and there can be only one style tag on the page.

This theme has a CSS file of 82kb so we need to lose 32kb! This is one of the biggest challenges you will face when converting themes from HTML to AMP pages. Luckily, this project uses PostCSS so we can remove some of the unused CSS easily.

Once removing the unused CSS we need to inline the style like this:

```html
<!DOCTYPE html>
<head>
    ...
    <style amp-custom>
        ...;
    </style>
    ...
</head>
```

After removing all of the unnecessary styles I could get the file down to 36.4kb. In the theme, we will need to remove the links to the external style files and inline the style instead.

The `_baseof.html` template will look something like this:

```html
<!DOCTYPE html>
<html amp lang="{{ $.Site.LanguageCode | default "en" }}">
<head>
    ...
    <link rel="canonical" href="{{ .Permalink }}" />

    <style amp-custom>
        ...;
    </style>
    <style amp-boilerplate>
        body {
            -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        }
        @-webkit-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @-moz-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @-ms-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @-o-keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
        @keyframes -amp-start {
            from {
                visibility: hidden;
            }
            to {
                visibility: visible;
            }
        }
    </style>
    <noscript
        ><style amp-boilerplate>
            body {
                -webkit-animation: none;
                -moz-animation: none;
                -ms-animation: none;
                animation: none;
            }
        </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
...
```

The last step is to make the custom JavaScript AMP compatible.

#### 6. Make the JS AMP compatible

The first thing you need to do is add a custom amp component called `amp-script`. Add this to the head:

```html
<html amp lang="{{ $.Site.LanguageCode | default "en" }}">\
<head>
    \ ...\
    <script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>
    \</head
>\ ...
```

This will allow us to use the `amp-script` tag on the page. In the Ananke theme, there is only a single JavaScript file. That loads from a partial file called `site-scripts.html`. Here are the contents of that file:

```html
{{ $script := .Site.Data.webpack_assets.app }}\
{{ with $script.js }}\
 <script  src="{{ relURL (printf "%s%s" "dist/" .) }}"></script>\
{{ end }}
```

We need to change the code so that it loads amp-script like this:

```html
{{ $script := .Site.Data.webpack_assets.app }}\
{{ with $script.js }}\
 <amp-script  src="{{ absURL (printf "%s%s" "dist/" .) }}"></amp-script>\
{{ end }}
```

After making the final change check the validator. You should see that the page has only one error which is this:

![invalid protocol error](/images/1584018538-image5.png)

This is because we are not running the site over https. Running SSL on localhost is a complicated topic, but, assuming your host is configured for SSL, once you deploy the site, it will pass and the AMP page will be valid.

If you would like to see all the changes I made then you can see them [in this repo.](https://github.com/stephenkeep/hugo-amp-example)

## Wrapping Up

We have looked at why, despite the contriversies, you may still need to care about AMP and what it takes to make a Hugo theme AMP compatible. Although it's not always straightforward, it is possible to convert existing themes to support AMP. Depending on the industry your site is in you may have to include AMP pages and hopefully this tutorial has given you the guidance you need to get started.

#### About the Author

Steve Keep has worked in IT for over two decades, mostly as a software developer. He’s a web enthusiast who finds time to create sites using the latest technology. From IoT, mobile and AI he has been lucky enough to have worked with it all. He blogs about the web at [pagedart.com](https://pagedart.com).
