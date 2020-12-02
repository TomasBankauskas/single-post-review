---
template: theme
title: DIY
show_header: false
meta_title: 'DIY theme, best for marketer’s'
meta_description: 'A marketer’s favorite modular template, featuring a wide variety of sections.'
sections:
  - type: theme_hero_section
    component: ThemeHero
    section_id: DiyHero
    title: Landing Page or Company Website
    description: >-
      A marketer’s favorite modular template, featuring a wide variety of
      sections, from product features to testimonials, call-outs, FAQ, pricing
      and blog — there’s much to discover and the possibilities are endless.
    img_url: /images/themes/diy-theme.png
    actions:
      - label: Create Site
        url: 'https://app.stackbit.com/create?theme=diy'
        has_arrow: true
        new_window: false
      - label: Live Preview
        url: 'https://staging.themes.stackbit.com/demos/diy/'
        is_hollow: true
        has_arrow: false
        new_window: false
    bg_color: light
  - type: feature_highlight_section
    component: FeatureHighlight
    section_id: DiyFeatures
    title: Theme Features
    body: >-
      With Stackbit, you can have a eCommerce site up and running in less when
      60 sec.
    items:
      - item_id: FlexibleTheme
        title: Super flexible theme
        body: >-
          You can create various sections for your landing page like
          testimonials, clients logotypes grid, pricing, team section, etc.
        img_url: /images/themes/diy-theme-modular.png
        img_position: right
        actions:
          - label: Get Started
            url: 'https://app.stackbit.com/create?theme=diy'
            is_hollow: false
            has_arrow: false
            new_window: false
      - item_id: PredefinedColors
        title: Comes with predefined colors and styles
        body: >-
          You can pick from preseleected colors and styles. Template styles
          include minimal, clasicc and bold. Pick what works best for your
          brand.
        img_url: /images/themes/diy-theme-customize.png
        img_position: left
        actions:
          - label: Get Started
            url: 'https://app.stackbit.com/create?theme=planty'
            is_hollow: false
            has_arrow: false
            new_window: false
  - type: site_demo_section
    component: SiteDemo
    section_id: DemoSites
    title: What You Can Create
    bg_color: light
    items:
      - title: App Landing Page
        img_url: /images/themes/diy-app.png
        url: 'https://diy-demo-app.netlify.app/'
      - title: Book Landing Page
        img_url: /images/themes/diy-book.png
        url: 'https://diy-demo-book-8fa72.netlify.app/'
      - title: Personal Landing Page
        img_url: /images/themes/diy-personal.png
        url: 'https://diy-demo-personal.netlify.app/'
  - type: theme_showcase_section
    component: ThemeShowcase
    title: More Themes
    section_id: MoreThemes
    bg_color: blue
    themes:
      - src/data/theme_list/azimuth.yml
      - src/data/theme_list/exto.yml
      - src/data/theme_list/fjord.yml
    actions:
      - label: Import an Existing Site
        url: 'https://app.stackbit.com/import'
        is_hollow: true
        has_arrow: false
        new_window: false
      - label: More Themes and Starters
        url: /themes
        is_hollow: true
        has_arrow: true
        new_window: false
---
