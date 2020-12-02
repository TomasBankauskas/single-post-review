---
thumb_img_path: >-
    /images/1567036444-hugo-stackbit-tutorial-part-2-thumb.jpg
content_img_path: >-
    /images/1567036512-hugo-stackbit-tutorial-part-2.jpg
template: post
title: 'Tutorial: Adding Stackbit to a Hugo Theme (part 2/2)'
excerpt: >-
    This is part 2 of our tutorial on adding Stackbit to an existing Hugo theme.
    In this tutorial we will model our Hugo themes data and configuration files.
    We also cover some more advanced model types including Object models and
    object field models.
date: '2019-08-26'
author: src/data/staff/rob.yml
subtitle: >-
    This is part 2 of our tutorial on adding Stackbit to an existing Hugo theme.
    In this tutorial we will model our Hugo themes data and configuration files.
    We also cover some more advanced model types including Object models and
    object field models.
---

# Tutorial: Adding Stackbit to a Hugo Theme (part 2/2)

This is the second part of a 2 part tutorial on adding Stackbit to an existing Hugo theme. [Read Tutorial Part 1](https://www.stackbit.com/blog/hugo-stackbit-tutorial)

## Adding Config & Data Files

In [Part 1](https://www.stackbit.com/blog/hugo-stackbit-tutorial) we modelled all the markdown files in our theme, but what about data and config files?

Data models can be used to model any .JSON, .YAML and .TOML files located under the `dataDir`. Depending on your theme and ssg the data might be content for your theme, data for components and also the theme configuration file.

### features.json

The tutorial theme https://github.com/stackbithq/uniform-hugo-tutorial has a list of "highlights" on the homepage. They are the boxes that appear at the bottom ie "Free Consultation" etc.

These highlights use a Hugo data file located in `data/features.json`.
The data file looks like this.

```json
// data/features.json

{
    "highlights": [
        {
            "title": "Free Consultation",
            "description": "New clients recieve an obligation free consultation.",
            "image": "images/features/noun_branding_1885335.svg"
        },
        {
            "title": "Certified Accountants",
            "description": "All members of our team are certified accountants.",
            "image": "images/features/noun_The Process_1885341.svg"
        },
        {
            "title": "Tax Compliance",
            "description": "We stay up to date on the latest changes to the tax code.",
            "image": "images/features/noun_3d modeling_1885342.svg"
        }
    ]
}
```

features.json contains a highlights object, which contains an array of objects. We are going to use a [list field type](https://docs.stackbit.com/uniform/field-models/#list_field_type) with a nested [object field type](https://docs.stackbit.com/uniform/field-models/#object_field) to model this data.

```yaml
features:
    type: data
    label: Features
    file: features.json
    fields:
        - type: list
          name: highlights
          items:
              type: object
              label: Highlight
              labelField: title
              fields:
                  - type: string
                    name: title
                    label: Title
                  - type: string
                    name: description
                    label: Description
                  - type: image
                    name: image
                    label: Icon
```

Data models follow a very similiar format to page models but importantly they use `type: data` instead of `type: page`.

Earlier in the tutorial we set the `dataDir` to `dataDir: exampleSite` (at the top of our stackbit.yaml). When we match a data model to the file it's going to be relative to this directory. So in this case we use the matching open `file: features.json` to match the data file.

### contact.yaml

.yaml files are also valid data sources. Here is the data model for `data/contact.yaml`

```
  contact:
    type: data
    label: Contact Info
    file: contact.yaml
    fields:
      - type: string
        name: email
        label: Email
      - type: string
        name: phone
        label: Phone
```

## Configuration Files

Most ssgs have a configuration file. Stackbit treats config files as normal data models. Here is the data model for the themes config file located at `exampleSite/config.yaml`.

**This code example does not yet include the menus.**

```yaml
config:
    type: data
    label: Config
    file: config.toml
    fields:
        - type: string
          name: title
          label: Title
          required: true
        - type: string
          name: baseURL
          label: Base URL
          description: Hostname (and path) to the root
          hidden: true
        - type: string
          name: languageCode
          label: Language Code
          hidden: true
        - type: string
          name: themesDir
          label: Themes Directory
          hidden: true
        - type: string
          name: theme
          label: Theme Name
          hidden: true
        - type: object
          name: params
          label: Params
          description: Site parameters
          required: true
          fields:
              - type: string
                name: google_analytics_id
                label: Google Analytics ID
              - type: string
                name: google_tag_manager_id
                label: Google Tag Manager ID
              - type: object
                name: logo
                label: Params Logo
                fields:
                    - type: image
                      name: standard
                      label: Logo Desktop
                      description: the path of the desktop logo image
                      required: true
                    - type: image
                      name: mobile
                      label: Logo Mobile
                      description: the path of the mobile logo image
                    - type: string
                      name: alt
                      label: Logo Alt Text
              - type: object
                name: homepage_meta_tags
                label: Homepage Metatags
                fields:
                    - type: string
                      name: meta_description
                      label: meta_description
                    - type: string
                      name: meta_og_title
                      label: meta_og_title
                    - type: string
                      name: meta_og_type
                      label: meta_og_type
                    - type: string
                      name: meta_og_url
                      label: meta_og_url
                    - type: string
                      name: meta_og_image
                      label: meta_og_image
                    - type: string
                      name: meta_og_description
                      label: meta_og_description
                    - type: string
                      name: meta_twitter_card
                      label: meta_twitter_card
                    - type: string
                      name: meta_twitter_site
                      label: meta_twitter_site
                    - type: string
                      name: meta_twitter_creator
                      label: meta_twitter_creator
```

### Modelling Hugo Menus

This theme has 2 menus. `main` and `footer` which can be viewed in the `config.yaml`

```
# exampleSite/config.yaml

...

[menu]
  # Main Menu
  [[menu.main]]
    name = "Services"
    url = "/services/"
      weight = 1

  [[menu.main]]
      name = "Team"
      url = "/team/"
      weight = 2

  # Footer Menu
  [[menu.footer]]
    name = "Home"
    url = "/"
      weight = 1

  [[menu.footer]]
    name = "Contact"
    url = "/contact/"
      weight = 2


```

Here we are going to use a [Object Model](https://docs.stackbit.com/uniform/object-models/). Ie a content model of `type: object` and we are going to reference it using an [Object Model Field](https://docs.stackbit.com/uniform/field-models/#object_model_field).

```yaml
# stackbit.yaml
...
models:
  ...
  site_menus:
    type: object # object model
    label: Site Menus
    fields:
      - type: list
        name: main
        label: Main menu
        description: List of items for Main menu
        items:
          type: site_menu_item
      - type: list
        name: footer
        label: Footer menu
        description: List of items for Footer menu
        items:
          type: site_menu_item
  site_menu_item:
    type: object
    label: Site Menu Item
    labelField: name
    fields:
      - type: string
        name: identifier
        label: Identifier
      - type: string
        name: name
        label: Title
        description: The title of the menu item
        required: true
      - type: string
        name: url
        label: URL
        description: The URL the menu item links to
        required: true
      - type: number
        name: weight
        label: Weight
        description: Position for sorting
      - type: string
        name: parent
        label: Parent Menu Identifier
        description: The parent of an entry should be the identifier of another entry.
```

We've created 2 object models. "site_menus" is a list of menu objects. It includes Main Menu and Footer Menu, which include an object model reference to "site_menu_items".

"site_menu_items" is a single object, with the 4 fields that are used in a Hugo menu item.

Now in the CMS you can add new top level Menus ie Sidebar Menu, and you can add, edit and delete individual menu items from existing menus.

Finally we need to add a reference to "site_menus" to the data model for `config.yaml`

```yaml
# stackbit.yaml
...
models:
  ...
  config:
  	...
  	- type: site_menus # references the object model we created in the previous step
	  name: menu
	  label: Menus
```

## Wrapping Up

Now we've modelled both the themes pages and data. The Uniform theme conversion is complete.

Visit https://app.stackbit.com/create and import your theme again.

## Documentation

-   The full Uniform spec is available in our docs https://docs.stackbit.com/uniform/
-   The code for this tutorial is available on our Github https://github.com/stackbithq/uniform-hugo-tutorial
