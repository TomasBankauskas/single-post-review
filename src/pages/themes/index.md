---
template: custom
title: Themes Gallery
subtitle: Choose a theme and combine a static site generator and CMS into your own Jamstack. We create the site on Github & Netlify.
show_footer_cta: false
meta_description: "Choose a theme and combine a static site generator and CMS into your own Jamstack. We create the site on Github & Netlify."
meta_title: Stackbit Themes Gallery
sections:
  - type: theme_showcase_section
    component: ThemeShowcase
    section_id: ThemesPage
    themes:
      - src/data/theme_list/planty.yml
      - src/data/theme_list/diy.yml
      - src/data/theme_list/fjord.yml
      - src/data/theme_list/exto.yml
      - src/data/theme_list/azimuth.yml
      - src/data/theme_list/starter.yml
      - src/data/theme_list/fresh.yml
      - src/data/theme_list/ampersand.yml
      - src/data/theme_list/vanilla.yml
      - src/data/theme_list/libris.yml
    actions: []
  - type: cta
    component: Cta
    section_id: ready-to-try-stackbit
    bg_color: blue
    title: Import Your Own Theme
    body: Import a custom theme from a public GitHub repo.
    actions:
      - has_arrow: false
        label: Import Custom Theme
        url: 'https://app.stackbit.com/import'
        new_window: false
---
