---
template: theme
title: Fjord
show_header: false
meta_title: Fjord theme, best for writters
meta_description: >-
  The blog is a simple, polished template with a light color scheme, clean typography.
sections:
  - type: theme_hero_section
    component: ThemeHero
    section_id: FjordHero
    title: Fjord theme, best for writters
    description: >-
      The blog is a simple, polished template with a light color scheme, clean typography, and unique sidebar. It’s best suited for personal or small business blogs.
    img_url: /images/themes/fjord-theme.png
    actions:
      - label: Create Site
        url: 'https://app.stackbit.com/create?theme=fjord'
        has_arrow: true
        new_window: false
      - label: Live Preview
        url: 'https://staging.themes.stackbit.com/demos/fjord/'
        is_hollow: true
        has_arrow: false
        new_window: false
    bg_color: light
  - type: feature_highlight_section
    component: FeatureHighlight
    section_id: FjordFeatures
    title: Theme Features
    body: >-
      With Stackbit, you can have a eCommerce site up and running in less when 60 sec.
    items:
      - item_id: FocusReadability
        title: Focus on Readability
        body: >-
          Fjord theme focuses on readability, that’s why the content looks crisp and easy on the eyes. Is a clean and polished theme with a beautiful typography, light color scheme, and sidebar images. It’s created to enhance your content and provide an memorable experience for your blog readers.
        img_url: /images/themes/Focus-on-Readability-v2.png
        img_position: right
        actions:
          - label: Get Started
            url: 'https://app.stackbit.com/create?theme=fjord'
            is_hollow: false
            has_arrow: false
            new_window: false
      - item_id: UniqueSidebar
        title: Unique Sidebar
        body: >-
          Customize your sidebar for every page or blog post. Add eye-catching images to engage your readers.
        img_url: /images/themes/sidebar-v2.png
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
    title: Blogs using Fjord
    bg_color: light
    items:
      - title: Business blog
        img_url: /images/themes/nauticalbuoy-com.png
        url: 'https://www.nauticalbuoy.com/'
      - title: Personal blog
        img_url: /images/themes/rainsberger-ca.png
        url: 'https://www.rainsberger.ca/'
      - title: Personal blog
        img_url: /images/themes/alicekehoe-com.png
        url: 'https://alicekehoe.com/'
  - type: theme_showcase_section
    component: ThemeShowcase
    title: More Themes
    section_id: MoreThemes
    bg_color: blue
    themes:
      - src/data/theme_list/planty.yml
      - src/data/theme_list/diy.yml
      - src/data/theme_list/exto.yml
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
