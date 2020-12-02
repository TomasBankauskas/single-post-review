---
thumb_img_path: '/images/1580311255-voiceassistants570.png'
content_img_path: '/images/1580311259-voiceassistants.png'
template: post
title: Voice Assistants and the JAMstack
excerpt: >-
    Raymond Camden explores how to create an Alexa or Google Home integration with
    your JAMstack site by leveraging serverless functions that access the existing
    data.
date: '2020-01-29'
author: src/data/authors/raymond-camden.yml
subtitle: >-
    Raymond Camden explores how to create an Alexa or Google Home integration with
    your JAMstack site by leveraging serverless functions that access the existing
    data.
---

I've got over ten thousand Twitter followers, so that officially means I'm an "industry pundit", and therefore I can say with one hundred percent authority that voice assistants are the user interface of the future. Ok, in all seriousness I've got a pretty horrible track record of predicting industry trends, but I feel pretty safe saying that voice assistants are only increasing in usage (and functionality) and that I think we're rapidly approaching a time where we won't just ask if a company has a website or mobile app, but also what their voice support solution is like as well.

In this article I'll talk about what a voice assistant is and how it relates to your JAMStack projects.

## Basic Voice Assistant Concepts

Voice assistants involve a lot more than just speech recognition. A good voice assistant can understand the context and _intent_ of what you ask, and then use that understanding to drive a conversation between the user and your services. As a simple example of this, users do not need to speak a precise phrase in order to work with a good voice assistant. Instead they can speak as they would to any other human and the voice assistant will understand their intent and communicate it to your code.

When we speak about voice assistants, we generally speak about two main ones: Google Assistant and Amazon Alexa. Apple's Siri, while used quite heavily, must be tied to an app on the device, unlike Google Assistant and Alexa.

While a detailed look at how to build for Google and Amazon is outside the scope of this article, in general a voice assistant app (or skill as Amazon calls them) comes down to a few parts:

-   **Intents** are where you describe the kind of things you would say to the service. When I go to Starbucks, I'm generally going to ask about a product and order a product. I'm not going to ask about the weather. The topics of things a user may ask would be considered intents.
-   Intents are fleshed out with **utterances**. That's a fancy way of saying example phrases. "I'd like a coffee." "I want a coffee!" "Please give me a coffee!" "I'd like an espresso." These are all sample utterances. The nice thing is you don't have to provide every single possible combination. By using powerful AI and other Ph.D.-level computer science stuff, your voice assistant can figure out that "I'd like a damn coffee" is close enough to match the intent of asking for a product.
-   Intents can also support **variables** or dynamic aspects. Alexa calls these **slots**. For example, I might say "I want a coffee" versus "I want an espresso". While both are the same intent, which is me wanting to order something, the actual product (coffee or espresso) is the dynamic part.
-   The final aspect is your code that responds to the information sent by the assistant. What's cool is that the voice assistance platform will do the heavy lifting for you and just simply _tell_ your code, "the user wants to order something and the thing she wants is a coffee." Your code can then return a response and the voice assistant will handle speaking it out loud to the user.

There's a lot more to this of course and I'd encourage you to read this great Smashing Magazine article on the topic for a deeper look, ["Creating Voice Skills For Google Assistant And Amazon Alexa"](https://www.smashingmagazine.com/2019/12/voice-skills-google-assistant-amazon-alexa/)

Typically the process to create a voice assistant comes down to:

-   Configuration on the platform side. So for example, with Alexa I use a web site to define my skill, write out my intents and utterances, and so forth.
-   I then write the code to process and respond to requests. Again, the voice assistant is doing the hard work. My code literally listens for a request that specifies the intent and any variables. I can do whatever my business logic needs and then return a JSON packet. The voice assistant takes that simple JSON result and speaks it to the user.

## JAMstack Voice Assistants

So how does this apply to the JAMstack?

We already know that moving to static assets does not mean giving up on dynamic aspects of your site. That certainly applies to voice assistants as well. When we build with the JAMStack, we can take our data and create HTML from it - that's a given. We can also generate JSON data that can be consumed by third parties. That's one way in which a 'static' site could have a simple, read-only API available. (If your JAMStack engine outputs an RSS feed for your blog, then you're already doing that!)

Given that we know we can work with data in our JAMStack site, how does this apply to building a voice assistant?

First off, the most direct answer would be to use serverless. You can (for the most part) do anything with a serverless platform so that would certainly suffice to handle adding a voice assistant to your static site. But where I think things can get more interesting is a closer, one-to-one correlation between your site data and your voice assistant.

Consider a simple Eleventy site that uses product data to build web pages. You could have the following as a [global data file](https://www.11ty.dev/docs/data-global/):

```javascript
[
    {
        name: 'A cat',
        price: 10,
        description: 'block of text'
    },
    {
        name: 'Another cat',
        price: 9,
        description: 'block of text'
    },
    {
        name: 'More cats',
        price: 21,
        description: 'block of text'
    },
    {
        name: 'Even More cats',
        price: 6,
        description: 'block of text'
    }
];
```

Using Eleventy's ["pages from data"](https://www.11ty.dev/docs/pages-from-data/) feature, you can generate a set of HTML files for each of the products above. The end result could then be a set of URLs like:

```
mysite.com/products/a-cat
mysite.com/products/another-cat
mysite.com/products/more-cats
mysite.com/products/even-more-cats
```

It would be nice if our site's related voice assistant could use the **exact** same data source files. In that scenario, I could address Alexa like so:

"Alexa, ask my site what products are available"

"Our site has 'A cat', 'Another cat', 'More cats', and 'Even more cats'"

Given that the JSON data includes prices, you could even support this example:

"Alexa, ask my site what products cost less then ten dollars"

"Our site has the following products at that price: 'Another cat' and 'Even more cats'"

In this imagined scenario, editing that core JSON file means you can control both the HTML view of your site as well as the voice-driven view of your site. (And some platforms like [Stackbit](https://www.stackbit.com/) and [Netlify CMS](https://www.netlifycms.org/) help you edit the data in your browser, making it available to non-technical editors.)

Perhaps the only truly difficult (or convoluted) aspect to this scenario is letting your serverless code have access to the same JSON data driving the site. Here's where things can get a bit complex. As always, I like to remind folks that adopting the JAMStack doesn't always mean everything is simpler.

-   The first issue you run into is that the JSON used is not necessarily available in the final static site. In Eleventy's example, it's used to build the site, but not used in the final site.
-   That's no problem though - you could build a page meant for the final site that has the JSON. You could literally output the global data as is, or you could massage that data a bit. It's possible you may have values there you don't want public.
-   Ok, so now you have JSON at mysite.com/products.json, but then your serverless function needs to hit it. You could make a HTTP request. In other words, Alexa fires a HTTP request to your serverless endpoint for your voice assistant, your code makes a HTTP request to your site, and then return the right data. This immediately raises a red flag for me, but it's not necessarily a bad idea either. You could also store it in RAM and if your skill is active, it wouldn't need to be re-fetched. The reason for the network request is that even if your serverless function lies at `mysite.com/functions/foo`, it isn't on the same filesystem as `mysite.com/products.json`. Netlify has a possible solution for this (and thank you [@\_munter](https://twitter.com/_munter_) for the tip!) - [build functions](https://github.com/netlify/build#lifecycleonbuild). You could use the build plugin process to provide the JSON data to the serverless functions _before_ the functions get deployed.

If you've done this and have your JSON data available, what does the code look like for a simple voice assistant? Keeping in mind we're simplifying things quite a bit, here's what that code could look like as a Netlify serverless function.

```js
function getProducts() {
    /*
	 I would get access to the products from the static site data, 
	 going to fake it for now:
	*/
    return 'cats, dogs, and lizards';
}

exports.handler = function (event, context, callback) {
    /*
	Alexa info is in event.body. It's a JSON packet contaning a lot of
	information with the primary thing we want being intent
	*/
    let intent = '';
    if (event.body.request && event.body.intent) intent = event.body.intent.name;

    let text = '';

    if (!intent) {
        text = 'Hello World';
    } else if ((intent = 'GetProducts')) {
        text = 'Our products are ' + getProducts();
    }

    let response = {
        version: '1.0',
        response: {
            shouldEndSession: true,
            outputSpeech: {
                type: 'PlainText',
                text: text
            }
        }
    };

    callback(null, {
        statusCode: 200,
        response
    });
};
```

Alexa sends information about the request in a JSON packet to your endpoint. Part of that request will typically include the intent, Alexa's interpretation of what the user asked. In the sample code above, I look for an intent named `GetProducts` and if it was used, I return a list of products.

As I said above, how the serverless code gets access to your static site data will depend on the platform. You absolutely could use a HTTP request to load the data, but it would be more performant to use your build process to provide the data to the function instead.

## Where To Go From Here

While I think we're all already thinking a lot about the ways we can add features to the JAMStack, I hope this article inspires you to consider integrating a voice assistant as well. I'd love to hear from folks who may be doing this already (and again, I mean something with "tight" integration between HTML and voice) so please be sure to drop me a comment below!

As a reminder, check out that [excellent Smashing Magazine](https://www.smashingmagazine.com/2019/12/voice-skills-google-assistant-amazon-alexa/) article for a deeper look at the setup. You can also check out [my examples](https://www.raymondcamden.com/tags/alexa/) of Alexa skills for inspiration!
