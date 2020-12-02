---
template: custom
title: How it Works
subtitle: 'Take a behind-the-scenes look at how Stackbit helps you make the web, better.'
show_header: true
show_footer_cta: true
sections:
  - type: hero_image_section
    component: HeroImage
    url: images/knowledgeable-pine.png
    max_width: 496
  - section_id: lorem-ipsum
    component: IfThen
    title: Under the Hood
    body: >-
      Whether you're a developer trying to get started on the Jamstack, a
      marketer looking to leverage modern web tech, or an agency developer eager
      to get clients off of their old, legacy systems, Stackbit is for you.


      We make creating, updating, and collaborating on Jamstack sites as easy as
      point and click. Stackbit handles all the details for you behind the
      scenes so your site can be more powerful, and you can be free to focus on
      your work.
    items:
      - title: Create a new Jamstack site
        subtitle: When you want to...
        body: >-
          Stackbit connects and provisions your choice of static site generator,
          headless CMS and deployment platform to get your website up and
          running in 60 seconds
        type: if_then_item
      - title: Easily edit your website
        subtitle: When you want to...
        body: >-
          Stackbit gives you a [Studio
          experience](https://www.stackbit.com/blog/announcing-stackbit-studio/)
          that incorporates a live preview, inline editing, and more, without
          you having to write a single line of code
        type: if_then_item
      - title: A/B test on the Jamstack without a developer
        subtitle: When you want to...
        body: >-
          Stackbit saves you multiple developer days by empowering you to set
          up, edit and publish variants with a few clicks
        type: if_then_item
      - title: Collaborate with your team
        subtitle: When you want to...
        body: >-
          Stackbit invites developers, marketers, content editors and
          stakeholders to work in concert on code, content and a flexible
          publishing workflow
        type: if_then_item
    bg_color: none
    type: if_then_section
  - title: 'Use your Jamstack site as is, and keep it yours forever.'
    section_id: lorem-ipsum
    component: Text
    content: >-
      Stackbit doesn't require you to make a ton of changes to your Jamstack
      site to enable it with all of the cutting edge functionality you're
      looking for.


      And even better than that, once your site is Stackbit enabled, you can
      take it with you wherever you want. There's no lock-in because Stackbit
      isn't a walled garden — we believe in an open ecosystem.
    actions: []
    bg_color: none
    bg_pattern: none
    type: text
  - section_id: ''
    component: ThemeShowcase
    title: Stackbit Right Now
    body: >-
      Create a fully-featured Jamstack site in seconds from one of our themes,
      or import an existing site
    themes:
      - src/data/theme_list/planty.yml
      - src/data/theme_list/diy.yml
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
  - section_id: ''
    component: CtaBlock
    title: Is Stackbit Right for Me?
    body: >-
      If you build websites, we certainly think so! We’ve put together some
      materials to help our core audiences get the most out of Stackbit and the
      Jamstack.
    items:
      - title: For Agencies & Freelancers
        body: >-
          If you create websites for a living, you know how challenging it can
          be to hand off a site and trust that your client can rely on it.
          Stackbit takes that a step further — your clients will love updating
          their site with our inline editor and collaborating with their
          internal stakeholders.
        ctaText: 'Stackbit for Agencies & Freelancers '
        ctaLink: 'https://www.stackbit.com/agencies'
        type: cta_block_item
      - title: For Marketers
        body: >-
          Deploy marketing sites, internal facing pages, single page apps, and
          more on the Jamstack while giving your stakeholders the best possible
          editing, feature testing and mobile experience. Marketers can now
          yield the power of the Jamstack without learning how to code.
        ctaText: Stackbit for Marketers
        ctaLink: 'https://www.stackbit.com/marketers'
        type: cta_block_item
      - title: For Any Developer
        body: >-
          If you've spent some time working with the Jamstack, you know how
          frustrating it can be to glue everything together. Maybe you've
          wondered if advanced features like live previews and A/B testing are
          even possible. Choose one of our starter themes or import your own, to
          see how it all fits together with Stackbit.
        ctaText: Try it Out
        ctaLink: 'https://app.stackbit.com/create'
        type: cta_block_item
      - title: If You’re New to the Jamstack
        body: "Stackbit makes it dead simple to start using the best technology of the web,\_known and loved as the Jamstack. If your journey is just beginning, we can help\_— our docs site and blog are constantly updated with guides and helpful how-tos.\_Simply pick a theme and start playing around with the features in our Studio."
        ctaText: Select a Theme
        ctaLink: 'https://app.stackbit.com/create'
        type: cta_block_item
    bg_color: none
    type: cta_block_section
meta_description: 'Take a behind-the-scenes look at how Stackbit helps you make the web, better.'
meta_title: Stackbit | Under the Hood
---
