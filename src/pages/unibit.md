---
title: Unibit
subtitle: A superset of static site generators that converts to any of them.
sections:
    - content: >-
          Unibit's powerful transpiling engine enables you to write once and stay
          Static Site Generator agnostic. Themes will automatically work with new
          generators as they are added.
      title: One theme codebase converts to multiple Static Site Generators
      component: TextImage
      type: textimage
      bg_color: none
      section_id: convert
      actions: []
      image: '/images/1562441723-unibit.svg'
      bg_pattern: none
      img_position: right
    - content: >-
          We've provided plenty of documentation and examples to help you get
          started with Unibit themes. The Static Site Generator component of Unibit
          is open source and available as a CLI tool via npm.
      title: 'Documentation, examples and the open source Unibit CLI'
      component: TextImage
      type: textimage
      bg_color: blue
      section_id: text-image2
      actions:
          - has_arrow: true
            label: Get started in the docs
            url: 'https://docs.stackbit.com/unibit/'
            new_window: true
      image: '/images/1562441691-unibitdev.svg'
      bg_pattern: triangles
      img_position: left
    - content: >-
          Setup your local Unibit development environment in a few easy steps, if
          you've ever used a Static Site Generator you will feel right at home.
          Additionally you can start tinkering with our starter Themes right away in
          CodeSandbox.
      title: Develop locally or in CodeSandbox
      component: TextImage
      type: textimage
      bg_color: none
      section_id: text-image1
      actions:
          - has_arrow: true
            label: Install the Unibit CLI
            url: 'https://docs.stackbit.com/unibit/installation/'
            new_window: true
      image: '/images/1562709561-unibitdev.svg'
      bg_pattern: none
      img_position: right
    - content: |2-

        <div class="grid col-two">
          <div class="grid-item">
            <h3 class="item-title">Azimuth - A super sleek SaaS theme</h3>
            <div class="item-content">
              <p><a href="https://themes.stackbit.com/demos/azimuth" target="_blank"><img
                    src="https://themes.stackbit.com/images/azimuth-demo-1024x768.png" alt="Azimuth Demo"></a></p>
              <p><a class="button stackbit"
                  href="https://app.stackbit.com/create?theme=https://github.com/stackbithq/stackbit-theme-azimuth"
                  target="_blank">Create With Stackbit</a></p>
            </div>
          </div>
          <div class="grid-item">
            <h3 class="item-title">Exto - A portfolio theme with a blog</h3>
            <div class="item-content">
              <p><a href="https://themes.stackbit.com/demos/exto" target="_blank"><img
                    src="https://themes.stackbit.com/images/exto-demo-1024x768.png" alt="Exto Demo"></a></p>
              <p><a class="button stackbit"
                  href="https://app.stackbit.com/create?theme=https://github.com/stackbithq/stackbit-theme-exto"
                  target="_blank">Create With Stackbit</a></p>
            </div>
          </div>
          <div class="grid-item">
            <h3 class="item-title">Fjord - A minimal blogging theme</h3>
            <div class="item-content">
              <p><a href="https://themes.stackbit.com/demos/fjord" target="_blank"><img
                    src="https://themes.stackbit.com/images/fjord-demo-1024x768.png" alt="Fjord Demo"></a></p>
              <p><a class="button stackbit"
                  href="https://app.stackbit.com/create?theme=https://github.com/stackbithq/stackbit-theme-fjord"
                  target="_blank">Create With Stackbit</a></p>
            </div>
          </div>
          <div class="grid-item">
            <h3 class="item-title">Fresh - A personal theme with a blog</h3>
            <div class="item-content">
              <p><a href="https://themes.stackbit.com/demos/fresh" target="_blank"><img
                    src="https://themes.stackbit.com/images/fresh-demo-1024x768.png" alt="Fresh Demo"></a></p>
              <p><a class="button stackbit"
                  href="https://app.stackbit.com/create?theme=https://github.com/stackbithq/stackbit-theme-fresh"
                  target="_blank">Create With Stackbit</a></p>
            </div>
          </div>
        </div>
      title: Starter Theme Repos
      component: TextImage
      type: textimage
      bg_color: light
      section_id: Unibit Themes
      actions: []
      bg_pattern: triangles
      img_position: center
    - bg_color: none
      faq_items:
          - answer: >-
                Unibit is starting with support for converting to Jekyll, Hugo &
                Gatsby with more SSGs coming soon.
            question: What static site generators can Unibit convert to?
          - answer: >-
                Unibit is a superset of existing static site generators, it was
                initially built as an internal tool for developing Stackbit starter
                themes and when we realized how powerful it was we decided to make the
                spec and site generator open source.
            question: >-
                What's the difference between Unibit and <Enter name of static site
                generator>?
          - answer: >-
                We have released the Unibit CLI as a public repo which contains
                minified code because we're still doing some refactoring. We plan to
                release the clean code sometime late July 2019.
            question: What's the schedule for open sourcing?
          - answer: >-
                Unibit is a great fit for when you want to build a theme once and have
                it be available for people to use in a variety of different SSGs. A
                classic example would be you are a theme developer and want to sell
                Hugo/Jekyll/Gatsby/etc versions of the same theme - with Unibit you
                could write that theme just once.
            question: When should I use Unibit?
          - answer: >-
                Unibit is helpful when you want to code once and have your theme
                transpile to multiple different target static site generators. If
                you're set on a specific stack then skip Unibit and go directly to
                Uniform to easily integrate any theme with modern headless CMS.
            question: When shouldn't I use Unibit?
          - answer: >-
                Unibit is still a pretty young project so some things will naturally
                be missing. If you think a certain feature could be useful please
                [drop us a line](/contact).
            question: Why doesn't Unibit have feature X?
          - answer: >-
                We're working on adding conversion targets all the time. If there's a
                particular SSG you're looking for please [drop us a line](/contact).
            question: >-
                When are you adding <enter name of static site generator> as a
                conversion target?
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
menus: {}
template: custom
---
