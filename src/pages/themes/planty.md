---
template: theme
title: Planty
show_header: false
meta_title: 'Planty - eCommerce theme, best for stores'
meta_description: >-
  A simple and clean eCommerce template for any kind of store, powered by
  Snipcart
sections:
  - type: theme_hero_section
    component: ThemeHero
    section_id: PlantyHero
    title: 'Planty - eCommerce theme, best for stores'
    description: >-
      A simple and clean eCommerce template for any kind of store, powered by
      Snipcart.1
    img_url: /images/themes/planty-theme.png
    actions:
      - label: Create Site
        url: 'https://app.stackbit.com/create?theme=planty'
        has_arrow: true
        new_window: false
      - label: Live Preview
        url: 'https://staging.themes.stackbit.com/demos/planty/default/'
        is_hollow: true
        has_arrow: false
        new_window: false
    bg_color: light
  - type: feature_highlight_section
    component: FeatureHighlight
    section_id: PlantyFeatures
    title: Planty Features
    body: >-
      With Stackbit, you can have a eCommerce site up and running in less when
      60 sec.
    items:
      - item_id: ModularTheme
        title: Everything you need to start a store
        body: >-
          With an e-commerce template, you’ll get everything you need from
          product listing, categorization, FAQ page, About page, promo, and
          testimonials sections for your online store.
        img_url: /images/themes/planty-theme-modular.png
        img_position: right
        actions:
          - label: Get Started
            url: 'https://app.stackbit.com/create?theme=planty'
            is_hollow: false
            has_arrow: false
            new_window: false
      - item_id: ModularTheme
        title: Sell online with your shopping cart
        body: >-
          Create a Snipcart account, add your Snipcart API key to the site’s
          configuration to enable Cart actions, and you are ready to sell.
        img_url: /images/themes/planty-theme-ecommerce.png
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
    title: Demo Stores
    items:
      - title: Swag store
        img_url: /images/themes/planty-swag.png
        url: 'https://swag-demo-store-96b22.netlify.app/'
      - title: Coffee store
        img_url: /images/themes/planty-coffee.png
        url: 'https://coffee-demo-estore-97649.netlify.app/'
    bg_color: light
  - type: theme_showcase_section
    component: ThemeShowcase
    title: More Themes
    section_id: MoreThemes
    bg_color: blue
    themes:
      - src/data/theme_list/azimuth.yml
      - src/data/theme_list/diy.yml
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
