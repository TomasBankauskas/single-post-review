---
thumb_img_path: >-
    /images/1567035139-hugo-stackbit-tutorial-part-1-thumb.jpg
content_img_path: >-
    /images/1567035128-hugo-stackbit-tutorial-part-1.jpg
template: post
title: 'Tutorial: Adding Stackbit to a Hugo theme (part 1/2)'
excerpt: >-
    In this tutorial I'm going to walk you through converting an open source Hugo
    theme into a Stackbit Uniform theme. You can do this with any Hugo site and
    once it's done you can import the theme into Stackbit, connect it to a
    headless CMS and deploy to Netlify in just 1 click.
date: '2019-08-14'
author: src/data/staff/rob.yml
subtitle: >-
    In this tutorial I'm going to walk you through converting an open source Hugo
    theme into a Stackbit Uniform theme. You can do this with any Hugo site and
    once it's done you can import the theme into Stackbit, connect it to a
    headless CMS and deploy to Netlify in just 1 click.
---

# Adding Stackbit to a Hugo theme

Stackbit recently announced [Custom Themes](https://www.stackbit.com/blog/announcing-custom-themes-and-so-much-more/). Stackbit already has lots of pre-built themes to choose from but what if you want to use your own theme? Or use a theme built on a static site generator that isn't currently supported by Stackbit? That's where custom themes comes in.

Before you start you can try importing the final version of the theme we are going to recreate. Click this link: https://app.stackbit.com/create?theme=https://github.com/JugglerX/hugo-serif-theme - Magic!

## Quick Overview

In this tutorial I'm going to use this Github repo as a reference. https://github.com/stackbithq/uniform-hugo-tutorial

We are going to use this theme as a base. This is a regular Hugo theme without Stackbit added. We are going to convert it to a Uniform theme using the following process.

1. Add a `stackbit.yaml` file with a basic configuration
2. Define [page models](https://docs.stackbit.com/uniform/page-models/) and [field models](https://docs.stackbit.com/uniform/content-models/) for our markdown files and define [data models](https://docs.stackbit.com/uniform/data-models/) for the config.toml and JSON data files in the `data` folder.
3. Use the Stackbit CLI validator tool to help test and debug.
4. Import the converted theme it into Stackbit and connect a CMS.

### Download the repo

Fork the repo at `https://github.com/stackbithq/uniform-hugo-tutorial` to your own Github. Clone it down to your local.

### Do a dummy import into Stackbit.

Using your forked repo, let's try and import the theme into Stackbit without any modifications.

1. Signup or Login to Stackbit.com
2. Visit the custom theme importer - https://app.stackbit.com/create
3. Paste your Github repo

At this point you will see the validator fails.

![](/images/1565753960-no-stackbit-file.png)

Lets go ahead and add the stackbit.yaml

## Create a stackbit.yaml file

Create a new file called `stackbit.yaml` in the projects root (same level as the README.md) and add the following fields.

```
stackbitVersion: ~0.2.0
ssgName: custom
```

Since we are importing our own custom theme, we need to set the `ssgName` field to `custom` - If you don't set this the convertor will attempt to use default values which are not suitable for a Hugo theme.

Commit and push this change to you Github repo. Try and import the theme into Stackbit again. The stackbit.yaml file will now be found, but you will encounter a variety of validator errors. Progress.

### Install the validator

Instead of each time having to import the theme into Stackbit there is a faster way to test our theme. Install the [Unibit CLI](https://docs.stackbit.com/unibit/unibit-cli/)

```
npm install -g @stackbit/unibit
```

Now you can validate the theme locally. Run the following command from the directory containing the stackbit.yaml.

```
unibit validate
```

The CLI validator also provides more robust errors and hints. You can see that we are missing quite a few required fields in the stackbit.yaml.

### Add required fields to the stackbit.yaml

Read the [stackbit.yaml documentation](https://docs.stackbit.com/uniform/stackbit-yaml) for information on the available fields.

Go ahead and add the following fields to the stackbit.yaml

```
stackbitVersion: ~0.2.0
ssgName: custom
publishDir: exampleSite/public
buildCommand: cd exampleSite && hugo --gc --baseURL "/" --themesDir ../.. && cd ..
uploadDir: images
staticDir: exampleSite/static
pagesDir: exampleSite/content
dataDir: exampleSite
```

pagesDir is required. It tells Stackbit where to look for markdown files. Typically the markdown files are turned into your sites pages, blog posts etc. In this theme the .md files are located inside of `exampleSite/content` so let's set `pagesDir: exampleSite/content`.

**Note:** If you install a Hugo theme as a "sub theme" then you probably wouldn't have the exampleSite folder here. Modify your paths to these folders accordingly.

Re-run the validator.

```
unibit validate
```

All the basic required fields should be validating, and it's now attempting to load the first pages and match them with content models. So you should be seeing an error at the "Validating Pages" step now.

## Adding Content Models

For a CMS to edit your site it needs to understand the content in a structured format that can be mapped to a database and or GUI interface.

In the stackbit.yaml we are going to write our first [content models](https://docs.stackbit.com/uniform/content-models/). Content models can be either [page models](https://docs.stackbit.com/uniform/page-models/) or [data models](https://docs.stackbit.com/uniform/data-models/). Typically page models are markdown files with front-matter and data models are JSON/YAML/TOML files. Both page models and data models may have nested [field models](https://docs.stackbit.com/uniform/field-models/)

Add a `models` field to the stackbit.yaml. All page and data models are nested under this field.

```
stackbitVersion: ~0.2.0
ssgName: custom
publishDir: exampleSite/public
buildCommand: cd exampleSite && hugo --gc --baseURL "/" --themesDir ../.. && cd ..
uploadDir: images
staticDir: exampleSite/static
pagesDir: exampleSite/content
dataDir: exampleSite
models:
	...
```

### Page Models

Take a look at the themes content folder located in `exampleSite/content` It contains several markdown files, some are in folders. Some of these markdown files use particular layouts and have different front-matter.

We need to provide page models for all of the files. A page model is not required for each individual file, but to create logical groupings that represent "content types"

### 404 page model

Let's add the first page model for the 404 page.

Inside of `models` field create a new [page model](https://docs.stackbit.com/uniform/page-models/) with the name "pagenotfound".

```
models:
	pagenotfound:
		type: page
		label: '404'
		file: 404/_index.md
		hideContent: true
		singleInstance: true
		fields:
		  - type: string
		    name: title
		    label: Title
		    description: The title of the page.
```

We defined a page model called "pagenotfound". You can use whatever name you like for the top level key. The content model type is specified by `type: page`. The label is used to help identify the page type in the CMS. In the case of the 404 page, there is only 1 page of this type in the theme, so we used `file: 404/_index.md` to point to a single file. Since it is a single file we set `singleInstance: true`, this let's the CMS know we can't create more of these pages and it also prevents the validator from trying to re-match this file if other page models use glob matching.

Inside of the page model are the [field models](https://docs.stackbit.com/uniform/field-models/) which are defined under the `fields` key. You must define a field model for each front-matter field in the markdown file. In this case we define one field model for the "title" which is of the type string. This will create a text input field in the CMS.

Run the validator and the 404 page should pass.

### Homepage page model

```
	home:
		type: page
		label: Home
		file: _index.md
		hideContent: false
		singleInstance: true
		fields:
		  - type: string
		    name: title
		    label: Title
		    description: The title of the page.
		    required: true
		  - type: image
		    name: intro_image
		    label: Intro Image
		    description: Image displayed at in the pages intro section
		  - type: boolean
		    name: intro_image_absolute
		    label: Overflow intro image
		    description: Should the image overflow or be contained
		  - type: boolean
		    name: intro_image_hide_on_mobile
		    label: Hide the intro image on mobile
		    description: Hide the intro image on mobile screen sizes
```

The homepage is similar to the 404. It's a singleInstance page model which has a few extra fields.

There are few new field model types. `image` and `boolean`. image type creates a file upload widget in the CMS and boolean creates a checkbox or toggle widget.

### Basic pages model

Next we will model the About Us `exampleSite/content/about.md` and Contact Us `exampleSite/content/contact.md` pages.

Things get a little more interested here. We want to be able to create new basic pages in the CMS, for example a good ol "privacy policy" page. So instead of modelling a specific file, we are creating an abstraction of a reusable "basic page"

```
basicpage:
    type: page
    label: Basic Page
    match: '*.md'
    exclude: _index.md
    fields:
      - type: string
        name: title
        label: Title
        description: The title of the page.
      - type: date
        name: date
        label: Date
      - type: string
        name: layout
        label: layout
      - type: string
        name: menu
        label: Menu
```

The main difference with this page model is the `match` and `exclude` fields. Instead of using `file`, we use match and exclude which allow us to glob match any files that meet particular requirements. In this case we want to target any file in the top level content folder except for the `_index.md` (which is the homepage and has a different page model)

There is a new field type of `date` which creates a date picker widget in the CMS.

### Services page model (services list)

```
services:
	type: page
	label: Services Overview
	file: services/_index.md
	singleInstance: true
	fields:
	  - type: string
	    name: title
	    label: Title
	    description: The title of the page.
	    required: true
	  - type: image
	    name: intro_image
	    label: Intro Image
	    description: Image displayed at in the pages intro section
	  - type: boolean
	    name: intro_image_absolute
	    label: Intro Image Position
	    description: Should the image overflow or be contained
	  - type: boolean
	    name: intro_image_hide_on_mobile
	    label: Intro Image Hide On Mobile
	    description: Hide the intro image on mobile screen sizes
```

### Service page model (single service pages)

```
service:
    type: page
    label: Service
    folder: services
    fields:
      - type: string
        name: title
        label: Title
      - type: date
        name: date
        label: Date
      - type: image
        name: image
        label: Image
      - type: boolean
        name: draft
        label: Draft
      - type: boolean
        name: featured
        label: Featured
```

The service pages live in `services` folder along with the `_index.md` used by the services page model. In the basicpage page model we used `exclude: _index.md` too explicitly exclude the \_index.md. That's an option here as well but because we set `singleInstance: true` on the services page model that file is automatically removed from the possible matches. So in this case we don't have to exclude \_index.md. Both approaches are OK.

### Teams page model (team list)

```
  teams:
    type: page
    label: Team Overview
    file: team/_index.md
    singleInstance: true
    fields:
      - type: string
        name: title
        label: Title
        description: The title of the page.
        required: true
      - type: image
        name: intro_image
        label: Intro Image
        description: Image displayed at in the pages intro section
      - type: boolean
        name: intro_image_absolute
        label: Intro Image Position
        description: Should the image overflow or be contained
      - type: boolean
        name: intro_image_hide_on_mobile
        label: Intro Image Hide On Mobile
        description: Hide the intro image on mobile screen sizes
```

### Team page model (team single)

```
team:
    type: page
    label: Team
    folder: team
    exclude: _index.md
    fields:
      - type: string
        name: title
        label: Title
      - type: date
        name: date
        label: Date
      - type: image
        name: image
        label: Image
      - type: string
        name: jobtitle
        label: Job Title
      - type: string
        name: linkedinurl
        label: Linkedin URL
      - type: boolean
        name: draft
        label: Draft
      - type: boolean
        name: featured
        label: Featured
      - type: number
        name: weight
        label: Weight
```

## Validating Page Models

Now we have defined page models for all of our content let's run the validator again and just check in.

```
unibit validate
```

The validator takes all of the files it finds inside of the `pagesDir` and attempts to find a matching page model inside the `models` field. If the validator finds a file with no matching page model defined in the stackbit.yaml it will throw an error.

If all files have an associated page model it will proceed to validate the field models inside each.

At this stage you should be seeing a few field level validation errors.

```
Validating Pages
✔ matching pages to models
✔ pagenotfound ⇔ 404/_index.md
✔ home ⇔ _index.md
✔ basicpage ⇔ about.md
✔ basicpage ⇔ contact.md
✔ services ⇔ services/_index.md
✖ service ⇔ services/accounting.md
  → [weight] "weight" is not allowed
✔ service ⇔ services/business-advisory.md
✔ service ⇔ services/business-sales.md
✔ service ⇔ services/mergers.md
✔ service ⇔ services/superannuation.md
✖ service ⇔ services/tax-preperation.md
  → [weight] "weight" is not allowed
✔ teams ⇔ team/_index.md
✔ team ⇔ team/peter-van-eijk.md
✔ team ⇔ team/sage-kirk.md

⚠ 2 errors found
```

It looks like we've missed a field definition for the front-matter field "weight" in the service page model.

Update the service page model and add the weight field.

```
  service:
    type: page
    label: Service
    folder: services
    fields:
      ...
      - type: number
        name: weight
        label: Weight
```

## Ready To Import

We've modelled all of the pages in our theme.

Visit https://app.stackbit.com/create and import your theme.

There is still more work to do modelling our config and data files but we can leave that for now. You do not have to model data for the theme to import and work with Stackbit. It just means these files will not yet be editable in the CMS.

## Choose a CMS and deploy!

You can choose to connect to any CMS at this point. For now let's try DatoCMS. Choose DatoCMS and click "connect accounts". You will need a DatoCMS account, but it should prompt you authenticate or signup or in-app. Once you've connected DatoCMS click "create your project"

Stackbit is now going to convert and build the theme for DatoCMS and deploy it to Netlify.

Once the site is built you can login to DatoCMS and explore the CMS. Go ahead, edit some of the fields or the content. These changes will be published to your live Netlify site.

## Wrapping Up

That's the first stage to importing a 3rd party Hugo theme into Stackbit. In the next tutorial I'll cover modelling the data and config files and exploring some more advanced field models including object references to better model our menus.

### Documentation

-   The full Uniform spec is available in our docs https://docs.stackbit.com/uniform/
-   The code for this tutorial is available on our Github https://github.com/stackbithq/uniform-hugo-tutorial

### Tutorial Part 2

[Tutorial: Adding Stackbit to a Hugo theme (Part 2/2)](https://www.stackbit.com/blog/hugo-stackbit-tutorial-part-2)
