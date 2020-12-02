---
title: 'An Open Letter to Matt Mullenweg: What folks often get wrong about Jamstack'
meta_title: Stackbit Blog | An Open Letter to Matt Mullenweg
meta_description: >-
  WordPress Co-Founder Matt Mullenweg claims the Jamstack isn’t ready for prime
  time, here’s what he’s missing
subtitle: >-
  ### WordPress Co-Founder Matt Mullenweg claims the Jamstack isn’t ready for
  prime time, here’s what he’s missing.
date: '2020-09-04'
author: src/data/staff/ohad.yml
excerpt: >-
  WordPress Co-Founder Matt Mullenweg claims the Jamstack isn’t ready for prime
  time, here’s what he’s missing
scripts: []
template: post
thumb_img_path: images/letter.png
content_img_path: images/letter.png
---

Richard MacManus had an interesting email exchange with Matt Mullenweg, creator of WordPress and co-founder/CEO of Automattic, about the Jamstack. It resulted in an Aug 31, 2020, [writeup in TheNewStack](https://thenewstack.io/wordpress-co-founder-matt-mullenweg-is-not-a-fan-of-jamstack/). I have a deep appreciation for Matt’s role in shaping web publishing but also feel that his points (e.g. “JAMstack is a regression for the vast majority of the people adopting it”) are a bit misleading. Matt chooses to compare a modern **architecture** like the Jamstack to a monolithic **product** like WordPress. I don’t expect a recently popularized architecture to provide the tailored features that a 15-year-old product has. We should be asking whether Jamstack is a better architecture than LAMP and what gaps currently exist with products and solutions built on top of the Jamstack.

#### How does the Jamstack compare to the status quo?

A growing number of developers, [1 million alone on Netlify](https://www.netlify.com/blog/2020/08/03/celebrating-1-million-developers-whats-next-for-netlify-and-the-jamstack/), believe the status quo of maintaining and depending on web servers has to change. We can build a better web by adopting a modern approach that materially improves security and performance, lowers the cost of scaling, and delivers a superior developer experience. We achieve this by serving our website from a CDN, adopting a git-centric workflow, leveraging modern build tools, and automating builds/deploys. How does this compare to the LAMP stack? It may have made sense to keep your content database, admin source code, site rendering code, and other utilities all on a shared hosting server back when cPanel was how we installed software. The price we’ve all paid for this monolithic approach has been slow websites that often get hacked/defaced and a developer experience that leaves much to be desired.

When AWS introduced EC2 in 2006 it didn’t persist drives, lacked load balancers, felt expensive, and was annoying in several different ways. At the same time, EC2 was an innovative abstraction of computing power that ushered in the paradigm-shifting era we now call cloud computing. Disruptive innovation is important and can, at times, appear inferior early on. The question is, what lens are you looking through, and what are your goals. **I believe the Jamstack is the newest disruptive innovation - it's not broken or incomplete, just relatively low level and new.**

More specifically I’d like to address some of Matt’s criticism of the Jamstack,

#### Rebuilding bigger sites can be slower

While the Jamstack as an architectural approach is fairly mature, the underlying tools like static site generators and deployment platforms are still undergoing very active development and optimization due to the Jamstack’s mass adoption. Shorter build and rebuild times are a function of tools being improved and optimized vs. something that necessitates the rethinking of the entire architecture. It's inspiring to see the progress being driven by developments like build parallelization, build cache, partial rebuild, incremental static regeneration, and more.

Additionally, longer rebuild times are currently overrepresented as a problem because people often wait for their websites to build in order to see what their content and code changes look like. This is typical with nontechnical people who make the rational decision of NOT running a local dev server but more importantly it’s already being addressed by Jamstack ecosystem players offering live previews and integrating those into broader Jamstack platforms.

#### It’s fragile because we’re putting together a dozen services

In terms of architecture, the Jamstack isn’t more fragile than older stacks, which depended on a multitude of pieces - LAMP, Java, and almost any other old-school framework depended on tons of frameworks, libraries, and tools for everything from building to caching and serving.

WordPress has been adopted as a kind of universal solution for creating all sorts of websites. However, as a product, it is a monolith optimized mainly for blogging. The solution itself suffers from having a lot of its valuable functionality being implemented by or heavily dependent on 3rd party plugins that make the overall solution hard to maintain, keep secure, and be performant. A quick Google search tells us that it’s common for a WordPress website to rely on dozens (sometimes upwards of 50) 3rd party plugins ([source](https://www.wpbeginner.com/opinion/how-many-wordpress-plugins-should-you-install-on-your-site/))

A more modern approach championed by the Jamstack is to create a new breed of products and services on top of a modern architecture that introduces more elegant, stable, and developer-friendly ways to create a multitude of different websites - anything from blogs to e-commerce, PWAs to corporate websites and more.

Additionally, Jamstack websites are infinitely more resilient and self-sufficient than your average website because they are hosted on a CDN. A dependency on a commercial service can, at worst, break the ability to update a website or disable a specific functionality (e.g. a payment gateway API). This rarely, if ever, will take down a complete Jamstack site, unlike a vulnerable plugin in a monolithic architecture that can take an entire website down. With server-side processes abstracted into microservice APIs, surface areas for attacks are reduced, and you leverage the domain expertise of specialist third-party services.

#### Lower usability and functionality

I have to agree - the current state of Jamstack tools in 2020 is still focused mainly on developers who are comfortable spending time in the command line. The good thing is that we have multiple players starting to build products and solutions on top of these lower-level tools. The main culprit here is that you still need to be a developer to really create and work on a Jamstack website. This is an area I’m personally passionate about and it's why I started Stackbit.

We’re still paying the price for unbundling the publishing stack. Separating content from rendering from hosting has a ton of benefits that make Jamstack websites faster, more secure, easier to scale, and have a better developer experience. These benefits accrue mostly to developers and DevOps/IT folks - we’ve neglected the other side of the equation - marketers, content editors, etc. These aren’t people who are going to enjoy authoring in Markdown, editing strings in a headless CMS, or asking their developers to generate a deploy preview of their homepage headline change so they can get sign-off from management. The Jamstack will need better tools to address these, and many other, challenges. Additionally, we will see platforms/solutions emerge that re-aggregate the UX/Product of a monolithic CMS (aka what marketers need) with the inner workings of the Jamstack (what developers want).

#### Where is the Jamstack headed

I couldn’t be more excited about the disruptive innovation that is the Jamstack, we have most of the core concepts figured out and are feverishly working as a community to improve everything that isn’t there yet. We have folks working on making the Jamstack faster and easier, building complete Jamstack platforms, enabling A/B testing and personalization, and creating themes, workflows, plugins, etc. We came together around a single belief that is echoed from the marketing material of most Jamstack companies - Let’s make the web better.

Richard Macmanus wrote that “Matt Mullenweg has a point that JAMstack is a set of solutions, rather than being a monolithic system like WordPress”. Jamstack is an architecture and what we have now is just an initial set of tools within this architecture - our ecosystem has barely even begun building solutions. When thinking of tools vs. solutions I like the following analogy “If an architecture is Japanese wood joinery and a tool is a chisel, a solution is a team of carpenters using the chisel and other tools to build a home”. The solutions I’m most excited about are those that will enable cross-functional teams to collaborate and build modern Jamstack websites, which is why I co-founded Stackbit.

The achievements of WordPress in terms of market share and how it democratized early web publishing are amazing. When it comes to architecture I think it was best in class for the early 2000s but it’s time to move forward. We already see cohorts of websites where Jamstack adoption crosses 20% - it's no longer a question of if the Jamstack becomes the predominant architecture for the web but a question of when. The cliche is a cliche but it also rings true - **First, they ignore you, then they laugh at you (we are here), then you win**.

_My name is Ohad, in 2011 I dropped a snapshot of my WordPress site into an [S3 bucket](https://bit.ly/3cIPYOP) and never looked back. I’ve been fascinated with where the web is heading ever since and co-founded Stackbit in 2019 to build the first solution for creating and working on Jamstack websites. I’m also an early investor in Netlify and sit on their board of directors._

Matt - If you’re reading, let’s [connect](https://twitter.com/ohadpr).

With sincerity and admiration,  
Ohad Eder-Pressman  
Co-founder & CEO - Stackbit
