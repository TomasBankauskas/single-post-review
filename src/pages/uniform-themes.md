---
title: Custom Themes
subtitle: Turn themes into CMS-powered websites with Stackbit's custom theme model
sections:
    - content: >-
          Let Stackbit do the heavy lifting of provisioning your theme's content
          model with a growing selection of headless CMS and pulling the content for
          you in the format your static site generator expects it.
      title: Easily integrate with modern headless CMS
      component: TextImage
      type: textimage
      bg_color: none
      section_id: integrate
      actions: []
      image: '/images/1562441747-uniform.svg'
      bg_pattern: none
      img_position: left
    - content: >-
          Give your users, clients or company the ability to create fast, secure and
          low-maintenance CMS-powered websites in a single click.
      title: Turn themes into CMS-powered websites
      component: TextImage
      type: textimage
      bg_color: light
      section_id: create
      actions: []
      image: '/images/1562441639-createwithstackbit.png'
      bg_pattern: triangles
      img_position: right
    - content: >-
          We use a powerful content model you define in stackbit.yaml to convert
          content, front matter and data into the format your static site generator
          expects.
      title: All it takes is a single config file
      component: TextImage
      type: textimage
      bg_color: none
      section_id: stackbityaml
      actions:
          - has_arrow: true
            label: Get started in the docs
            url: 'https://docs.stackbit.com/uniform/'
            new_window: true
      image: '/images/1562441664-stackbityaml.svg'
      bg_pattern: none
      img_position: left
    - content: >-
          All themes with structured schema driven by Markdown page files with YAML
          front matter and JSON/YAML/TOML data/config files can use Uniform and
          Stackbit.


          You can also use [Unibit](/unibit)'s powerful transpiling engine to write
          a theme once and stay static site generator agnostic.
      title: >-
          Bring your new & existing themes no matter what static site generator they
          use
      component: TextImage
      type: textimage
      bg_color: blue
      section_id: ssgagnostic
      actions:
          - has_arrow: true
            label: See examples
            url: 'https://docs.stackbit.com/example-uniform-themes/'
            new_window: false
      image: '/images/1562551616-themes.svg'
      bg_pattern: triangles
      img_position: right
    - section_id: 'StarterThemes'
      bg_color: light
      component: ThemeShowcase
      title: Starter Themes
      themes:
        - src/data/theme_list/diy.yml
        - src/data/theme_list/exto.yml
        - src/data/theme_list/fjord.yml
      actions:
        - label: Import an Existing Site
          url: 'https://app.stackbit.com/import'
          is_hollow: true
          has_arrow: false
          new_window: false
        - label: More Themes and Starters
          url: 'https://app.stackbit.com/create'
          is_hollow: true
          has_arrow: true
          new_window: false
      type: theme_showcase_section
    - bg_color: none
      faq_items:
          - answer: >-
                Uniform is starting with support for Contentful, DatoCMS, Forestry &
                NetlifyCMS with more CMS coming soon.
            question: What headless CMS does Uniform support?
          - answer: CMS.
            question: What is the plural of CMS
          - answer: >-
                No more! Define a Uniform content model once in the stackbit.yaml file
                and Stackbit maps your content to every CMS. So you now actually have
                time to pick up a new hobby like growing Bonsais, playing Rocket
                League or start an Etsy shop.
            question: Do I still need to go into the CMS and define content schemas?
          - answer: >-
                You likely know Amazon has a patent on that single click, or maybe
                it's only for eCommerce? At any rate we're more like 2-3 clicks but
                constantly looking for ways to reduce those clicks.
            question: >-
                Can me, my customers and/or my company really create CMS-powered
                websites from my themes with a single click?
          - answer: >-
                It helps Stackbit understand how your theme expects to get its content
                and data. We provision whichever CMS you choose with the content model
                for your theme and when it's time to build we transform the content
                (did you know some CMS don't support default values, have unique
                naming conventions for variables, etc) and prepare it for your theme
                and generator.
            question: What's the deal with this stackbit.yaml file?
          - answer: Our almanac said we should use YAML so we didn't ask any questions.
            question: >-
                I don't like YAML files why didn't you go with
                JSON/TOML/XML/CFG/Hexdump?
          - answer: >-
                Let's do this! If there's a particular CMS you're looking to use
                please [drop us a line](/contact).
            question: I love AmazingCoolFunkyCMS why don't you support it?
      title: FAQ
      section_id: faq
      component: Faq
      type: faq
    - tweets:
          - url: 'https://twitter.com/Jonny_Goodwin/status/1108768178899951616'
            username: '@Jonny_Goodwin'
            avatar: '/images/1566230159-jonny-goodwin.jpg'
            name: Jonny Goodwin
            text: >-
                [@stackbithq](https://twitter.com/stackbithq) allows you to easily
                deploy a static site backed with a CMS. Amazing service.
          - url: 'https://twitter.com/MikeStopford1/status/1171060449946849280'
            username: '@MikeStopford1'
            avatar: '/images/1570526957-mike.jpg'
            name: Mike Stopford
            text: >-
                If setting up and deploying a
                [#JAMStack](https://twitter.com/hashtag/JAMStack?src=hashtag_click)
                website feels like a lot of work, check out 

                [@stackbithq](https://twitter.com/stackbithq). 5 minutes and you’re
                good to go. Thanks to [@syntaxfm](https://twitter.com/syntaxfm) for
                that knowledge.
          - url: 'https://twitter.com/Abbie2020/status/1163473062152593408'
            username: '@Abbie2020'
            avatar: '/images/1566230899-abigail-rumsey.jpg'
            name: Abigail Rumsey
            text: "\U0001F469‍\U0001F4BBTbh, creating, hosting and deploying a React website is quite daunting when you're fairly new to the [#JamStack](https://twitter.com/hashtag/JamStack?src=hash). Then I stumbled across \n[@stackbithq](https://twitter.com/stackbithq) and I've got the beginnings of a site ready to go in 5 minutes!"
          - url: 'https://twitter.com/DerekAGilbert/status/1121109630153674752'
            username: '@DerekAGilbert'
            avatar: '/images/1565857388-derekgilbert.jpg'
            name: Derek Gilbert
            text: >-
                Using [@stackbithq](https://twitter.com/stackbithq) for the first time
                after getting into the beta. This is a game changer everyone.
                [#JamStack](https://twitter.com/hashtag/JamStack?src=hash)
      bg_color: blue
      component: Reviews
      bg_pattern: squares
      type: reviews
      title: What People Are Saying
      section_id: reviews
    - bg_color: light
      component: Cta
      title: Ready to try Stackbit?
      actions:
          - has_arrow: false
            label: Try it now!
            url: 'https://app.stackbit.com/create'
            new_window: false
      type: cta
      section_id: ready-to-try-stackbit
template: custom
---
