---
thumb_img_path: '/images/1576502135-jamstack-2020-sm.png'
content_img_path: '/images/1576502146-jamstack-2020.png'
template: post
title: What to Expect from the JAMstack in 2020 - Bryan Robinson
excerpt: >-
    An interview with Bryan Robinson, host of the That's My JAMstack podcast, on
    what he saw in 2019 and what he thinks we can expect in 2020 from the
    JAMstack.
date: '2019-12-18'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    An interview with Bryan Robinson, host of the That's My JAMstack podcast, on
    what he saw in 2019 and what he thinks we can expect in 2020 from the
    JAMstack.
---

2019 definitely seemed to be a pivotal year for the JAMstack. New companies cropped up (yep, [us included](https://www.stackbit.com/)), [JAMstack_conf_sf](https://jamstackconf.com/sf/) was the biggest event yet and lots of new tools seemed to gain momentum daily. In this series of posts, we're asking some well-known members of the JAMstack community what they thought about this past year and what they think you can expect for the year to come. This edition features [Bryan Robinson](https://twitter.com/brob), host of the [That's My JAMstack podcast](https://thatsmyjamstack.com/).

![Bryan Robinson](/images/1576683864-bryanrobinson.jpg)

### Tell us about yourself and what you do? Does JAMstack play a role in your day-to-day work?

I’ve been doing web design and development for almost 14 years now. Most recently, I managed a design and development team for a small agency before striking out on my own to create educational resources for developers and designers.

In my life at an agency, we used some JAMstack concepts for small projects with clients that either didn’t want or didn’t need our proprietary CMS. Since starting my educational company, I use the JAMstack for all my projects. One of my favorite things about the JAMstack for creating educational content is that I feel safer making quick one-off projects, since I don’t have to worry about the server if the idea fizzles.

### What is your current JAMstack stack? What tool(s) have you most excited?

My current “stack” is [11ty](https://www.11ty.dev/) for a static site generator and Netlify for hosting and serverless functions.

I’ve been using 11ty for most of the past year and it’s easily the best fit for my personal development philosophy. The closer I am to the HTML the happier I am. I’m a bit “old school” in that I still enjoy statically-served HTML pages and 11ty gives that to me with very little fuss. Since it’s written in Node, it makes extending it with custom plugins or data simple for someone like me that works mostly framework-less.

Speaking of frameworks, the fact that 11ty is agnostic to front-end frameworks means I can progressively enhance my content with JavaScript in little ways with whatever tool I need. Sometimes that’s just vanilla JS, or sometimes with a framework like Vue or Preact.

Beyond my personal, bespoke opinions, I’m really excited to add a few new tools to my tool belt. I’m playing with more headless CMSs (which pair nicely with 11ty data files). I’ve also really enjoyed playing with “serverless databases.” I’ve been specifically playing with [FaunaDB](https://fauna.com/) and have really enjoyed the experience.

### What changes did you see, for better or worse, in 2019 related to the JAMstack ecosystem?

The JAMstack really exploded in 2019. The industry’s perception of the JAMstack went from a cool concept that was fun to play with in your spare time to something that was viable for many professional situations.

With the increase in those exploring the JAMstack and the different use cases that now utilize this new way of thinking, I think it’s important to remember that the JAMstack isn’t always the “right tool for the job.” If you find yourself jumping through too many hoops, it might be time to explore a monolith architecture again.

I’m a fan of the [“Rule of Least Power”](https://blog.logrocket.com/what-the-rule-of-least-power-means-for-modern-developers-b846010a8595/). When picking the right tool for the job, reach for the least power until you reach a situation where you need more. In our JAMstack world it might look something like this:

-   Is the site mostly content? -> Static Site Generator/Markdown
-   Do I need some dynamic content? -> “Cloud Database”
-   Do I need simple timed action? -> IFTTT/Serverless Function/Build Hook
-   Do I need complex actions run multiple times a day with many different pieces of functionality? -> Might be time for your own server...

As we explore the edge cases of our stack, it’s important to remember to look for the right tool...even if it’s not a JAM solution.

### What changes in 2020 do you see forthcoming that will have an impact on adoption of or day-to-day development using the JAMstack?

I think 2020 is going to be a crucial year for long-term growth of the JAMstack. We’re seeing great growth amongst companies created for use on the JAMstack, but I see 2020 as a proving ground of profitability for them. Whether venture capital funded or bootstrapped, it’s important for there to be a thriving ecosystem of solutions out there so that agencies, enterprise and application developers feel comfortable making the conversion.

My hope is that the amazing companies that are going strong right now continuing going strong and are profitable. The JAMstack depends on a healthy ecosystem of services and APIs to make it completely viable, so hopefully we’ll see this trend continue in 2020 and these companies will become (or continue to be profitable). If they are, I think 2020 will be another massive year of adoption in the industry for the JAMstack.
