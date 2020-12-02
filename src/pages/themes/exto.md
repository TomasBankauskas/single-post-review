---
template: theme
title: Exto
show_header: false
meta_title: Exto portfolio theme
meta_description: >-
  The blog is a simple, polished template with a light color scheme, clean typography.
sections:
  - type: theme_hero_section
    component: ThemeHero
    section_id: ExtoHero
    title: Exto theme, create your portfolio today
    description: >-
      This portfolio theme allows visual artists, photographers, designers to create a clean, eye-catching online presence to showcase their work.
    img_url: /images/themes/exto-theme.png
    actions:
      - label: Create Site
        url: 'https://app.stackbit.com/create?theme=exto'
        has_arrow: true
        new_window: false
      - label: Live Preview
        url: 'https://staging.themes.stackbit.com/demos/exto/'
        is_hollow: true
        has_arrow: false
        new_window: false
    bg_color: light
  - type: feature_highlight_section
    component: FeatureHighlight
    section_id: ExtoFeatures
    title: Theme Features
    body: >-
      With Stackbit, you can have a eCommerce site up and running in less when 60 sec.
    items:
      - item_id: FocusReadability
        title: Modular Template
        body: >-
          The portfolio template has all the necessary sections you could need for your site. And the best part you could easily rearrange these sections as you see fit with Stackbit studio.
        img_url: /images/themes/exto-theme-modular.png
        img_position: right
        actions:
          - label: Get Started
            url: 'https://app.stackbit.com/create?theme=exto'
            is_hollow: false
            has_arrow: false
            new_window: false
      - item_id: UniqueSidebar
        title: Customize Template With Ease
        body: >-
          Chose from light or dark color modes and from predefined colors list to adjust the website to your liking.
        img_url: /images/themes/exto-theme-customization.png
        img_position: left
        actions:
          - label: Get Started
            url: 'https://app.stackbit.com/create?theme=exto'
            is_hollow: false
            has_arrow: false
            new_window: false
      - item_id: WysiwygEditing
        title: WYSIWYG Editing
        body: >-
          With Stackbit studio, you can change images, text, create pages, create new sections, arrange sections, preview your changes without writing a single line of code.
        img_url: /images/exto-customize-wysiwyg.png
        img_position: right
        actions:
          - label: Get Started
            url: 'https://app.stackbit.com/create?theme=exto'
            is_hollow: false
            has_arrow: false
            new_window: false
  - type: site_demo_section
    component: SiteDemo
    section_id: DemoSites
    title: Sites Using Exto Theme
    bg_color: light
    items:
      - title: UX Designer/Developer
        img_url: /images/themes/alexsantos-design.png
        url: 'https://alexsantos.design/'
      - title: Freelance technical writer
        img_url: /images/themes/davidgarcia-dev.jpg
        url: 'https://davidgarcia.dev/'
      - title: Web design company
        img_url: /images/themes/thinkdesign-com.jpg
        url: 'https://thinkdesign.com/portfolio/'
  - type: theme_showcase_section
    component: ThemeShowcase
    title: More Themes
    section_id: MoreThemes
    bg_color: blue
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
        url: /themes
        is_hollow: true
        has_arrow: true
        new_window: false
---
