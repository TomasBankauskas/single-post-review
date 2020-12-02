---
hide_nav_bar: true
sections:
    - component: TextImage
      type: textimage
      bg_color: none
      section_id: intro
      actions: []
      image: '/images/1572393749-overview.gif'
      bg_pattern: none
      img_position: left
    - content: >-
          The control center will automatically detect when your project begins a
          rebuild at Netlify and then notifies you. This allow you to monitor the
          process until the updated site is live.
      title: Automatic rebuild detection
      component: TextImage
      type: textimage
      bg_color: blue
      section_id: detecting-builds
      actions: []
      image: '/images/1572310958-cms-update-2.gif'
      bg_pattern: triangles
      img_position: right
    - content: >-
          The control center lets you monitor your build logs as they happen,
          ensuring that you catch any warnings or build errors immediately.
      title: Live build log access
      component: TextImage
      type: textimage
      bg_color: none
      section_id: live-logs
      actions: []
      image: '/images/1572310989-live-logs-2.gif'
      bg_pattern: none
      img_position: left
    - content: >-
          All these features are available without ever needing to touch your site's
          source code. Just click the "Pick any Netlify project" button on this
          page, choose which projects you want to enable the control center on, and
          you are done!
      title: Easy integration
      component: TextImage
      type: textimage
      bg_color: blue
      section_id: easy-integration
      actions: []
      image: '/images/1572312631-easy-integration-2.gif'
      bg_pattern: squares
      img_position: right
    - bg_color: none
      component: Cta
      title: 'Ready to try it out? '
      actions:
          - has_arrow: false
            label: PICK ANY NETLIFY PROJECT
            url: '#'
            new_window: false
            class_name: sign-netlify
      type: cta
    - tweets:
          - url: 'https://twitter.com/raymondcamden/status/1191735801652097024'
            username: '@raymondcamden'
            avatar: '/images/1573069819-raymondcamden.jpg'
            name: Raymond Camden
            text: >-
                StackBit released a "widget" you can add to
                [@Netlify](https://twitter.com/netlify) sites to fire off builds,
                track them, etc. And it's freaking magical how nice it is and how easy
                it is to setup.
          - url: 'https://twitter.com/rockerest/status/1184580441774460929'
            username: '@rockerest'
            avatar: '/images/1571558778-ja4o3yrn400x400.jpg'
            name: Thomas Randolph
            text: >-
                Eliminate the unknowns between services with
                [@stackbithq](https://twitter.com/stackbithq)'s on-site widget that
                shows the status of everything it takes to make your site (and
                changes) live (w/[@ohadpr](https://twitter.com/ohadpr))
                [#jamstackconf](https://twitter.com/hashtag/jamstackconf)
          - url: 'https://twitter.com/hughdurkin/status/1184592856285171713'
            username: '@hughdurkin'
            avatar: '/images/1565857277-hughdurkin.jpg'
            name: Hugh Durkin
            text: "Pretty epic update from [@stackbithq](https://twitter.com/stackbithq) \U0001F60D Great to have [@Netlify](https://twitter.com/Netlify) build status in the same control center, too. Awesome to see how quickly [#JamStack](https://twitter.com/hashtag/JamStack?src=hash) products and platforms are evolving \U0001F680"
          - url: 'https://twitter.com/philhawksworth/status/1192007803570999296'
            username: '@philhawksworth'
            avatar: '/images/1573070238-yryrapxi.jpg'
            name: Phil Hawksworth
            text: >-
                The Control Center from Stackbit is brilliant!


                A great example of using [@Netlify](https://twitter.com/netlify)'s
                Snippet Injection and APIs to bring admin of your sites right into
                focus.
      bg_color: light
      component: Reviews
      bg_pattern: none
      type: reviews
      title: What are people saying?
      section_id: Reviews-live
    - type: netlifyimporter
      title: Netlify Importer Modal
      section_id: netlify-importer-section
      component: NetlifyImporter
    - bg_color: none
      faq_items:
          - answer: >-
                Go to the [On-Page Control
                Center](https://www.stackbit.com/control-center/) page on the Stackbit
                site and click the "Pick any Netlify Project." Select the project or
                projects you want to add the control panel to. Once the projects are
                updated at Netlify, your On-page Control Panel will be enabled.
            question: >-
                How do I add the On-page Control Center to my existing Netlify
                project?
          - answer: >-
                Any new Stackbit project will include the control panel automatically,
                so no need to do anything different. Just click the "View Site" button
                from within the [Stackbit
                Dashboard](https://app.stackbit.com/dashboard) once your new project
                has completed building and you should see the control center on the
                page.
            question: How do I add the On-page Control Center to a new Stackbit project?
          - answer: >-
                The control center has already been added to all of your existing
                Stackbit projects. To view the control center on your Stackbit
                project, go to the [Stackbit
                dashboard](https://app.stackbit.com/dashboard) and click the "View
                site" button. This will open the page with the necessary parameters to
                display the control center. Going forward, you can simply go to your
                site and the widget will appear.
            question: >-
                How do I add the On-page Control Center to my existing Stackbit
                project?
          - answer: >-
                The initial release of the control center will provide the ability to
                automatically detect and monitor your Netlify builds, view your build
                logs, and offer quick links to your Netlify admin and GitHub project
                page - all from within your website. These are the first features in a
                toolset we call Stackbit Live. You can learn more about some of the
                exciting upcoming features here: https://www.stackbit.com/live/
            question: What does the control center give me?
          - answer: >-
                Stackbit uses Netlify's [snippet
                injection](https://docs.netlify.com/site-deploys/post-processing/snippet-injection/)
                functionality to inject a small JavaScript file on your page at build
                time. If you have concerns about how this might impact your site's
                performance, see then next FAQ item.
            question: How does the control center work?
          - answer: >-
                The Stackbit On-Page Control Center was designed specifically to have
                a negligible impact on your sites performance by serving from a CDN
                and avoiding any unnecessary API calls for anyone who is not a
                Stackbit admin. The initial authentication check happens only when the
                `?stackbit` parameter is added to the site URL. Assuming the user is
                logged into Stackbit, the status is cached in browser local storage so
                that subsequent requests do not require either the authentication
                request or the URL parameter. If both the URL parameter and the local
                storage do not exist, the control center JavaScript exits.
            question: Will the control center impact my site's performance?
          - answer: >-
                The logged in state may be lost if local storage is cleared, the page
                is open in an "incognito window" or a different browser/device. Go to
                your [Stackbit dashboard](https://app.stackbit.com/dashboard) and
                click on the "View Site" button. This will open the page with the
                proper URL parameter (`?stackbit`) that triggers the authentication
                check and displays the control center.
            question: The control center stopped displaying. What can I do?
          - answer: >-
                The control center can be added to any site deployed to Netlify
                regardless of what tool they were built with - even if they weren't
                built with a static site generator!
            question: What static site generators does the control center support?
          - answer: >-
                The Stackbit Control Center will work on any JAMstack site -
                regardless of whether it uses a CMS or, if it does, which CMS it uses.
                A link to the connected CMS is available for sites created via the
                Stackbit site creation tool.
            question: What CMS does the control center support?
          - answer: >-
                We're sorry to hear that. If you imported your project from Netlify,
                all you need to do is go to your [Stackbit
                dashboard](https://app.stackbit.com/dashboard) and choose "Remove from
                Stackbit" for that project. Alternatively, you can go into your
                Netlify admin and remove the control center snippet from [snippet
                injection](https://docs.netlify.com/site-deploys/post-processing/snippet-injection/).
                In the meantime, we'd also love to hear from you about how we could
                make this tool more useful to you.
            question: I decided that I don't want the control center. How do I remove it?
      title: FAQ
      section_id: faq
      component: Faq
      type: faq
    - bg_color: none
      component: Cta
      title: Add the Control Center to your Netlify sites!
      actions:
          - has_arrow: false
            label: PICK ANY NETLIFY PROJECT
            url: '#'
            new_window: false
            class_name: sign-netlify
      type: cta
template: landing
title: The Control Center for JAMstack sites
actions:
    - has_arrow: false
      label: PICK ANY NETLIFY PROJECT
      url: '#'
      new_window: false
      class_name: sign-netlify
subtitle: Automatically detect and monitor Netlify builds directly from your site
scripts:
    - /assets/js/netlify_import.js
---
