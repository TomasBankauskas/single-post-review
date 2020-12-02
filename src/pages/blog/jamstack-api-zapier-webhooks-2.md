---
thumb_img_path: >-
    /images/1579184242-buildyourownapinetlifyzapier570.png
content_img_path: >-
    /images/1579184254-buildyourownapinetlifyzapier.png
template: post
title: 'Build Your Own JAMstack API with Netlify Functions and Zapier Webhooks, Part 2'
excerpt: >-
    A step-by-step tutorial showing how to automatically update your JAMstack site
    with data connected to over 1500 services via Zapier webhooks and Netlify
    Functions.
date: '2020-01-20'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    A step-by-step tutorial showing how to automatically update your JAMstack site
    with data connected to over 1500 services via Zapier webhooks and Netlify
    Functions.
---

Sending data from a JAMstack application may take some work, but is usually fairly straightforward. Calling an API or serverless function just takes a little bit of standard JavaScript. But what about receiving data? When the application source is static, how does an API talk to our app?

There are a number of ways to achieve this, but, in this tutorial, we'll look at a solution that uses a combination of tools including [Webhooks by Zapier](https://zapier.com/engineering/using-webhooks/), [Netlify Functions](https://www.netlify.com/products/functions/) and the [GitHub API](https://developer.github.com/v3/). These tools will allow us to receive data from an external source, add the necessary details to our site's source and automatically rebuild the site with the new details.

> Check out [Part 1](https://www.stackbit.com/blog/jamstack-api-zapier-webhooks-1/) of this series that covered sending data from your application using a Zapier Webhook and Netlify Functions.

> Note webhooks by Zapier are currently a premium feature.

The sample code from this post is available at [https://github.com/remotesynth/webhooks](https://github.com/remotesynth/webhooks).

## Setting Up the Netlify Function

The sample we'll build will use Zapier to watch a list of RSS feeds for changes and then notify a Netlify function that will add the new post title and URL to a data file containing an array of posts. This will then cause the site to update and rebuild.

Let's start by creating the Netlify function. This will allow us to test and establish the API that our Zapier webhook will need to talk to before setting up Zapier. The reason for doing this first is that having an endpoint URL to test the webhook in Zapier against will simplify the process of configuring everything.

To start, create a folder to place our Netlify functions (I named mine `lambda` but you can name it anything). Next, create a `netlify.toml` configuration file at the root of the site and add the following configuration to tell Netlify where to find our functions (i.e. the `lambda` folder we created earlier).

```toml
[build]
  functions = "./lambda"
```

Next create a file named `zapierReceive.js` inside the `lambda` folder. This will be contain the code for our function.

### A Quick Aside

Before I continue, I will share a quick story because it helps to illustrate the mental shift you often need to make when working with the JAMstack and serverless. Initially, I figured this example would be quite simple - I'd just load a local JSON file, use the file system API to update it and - whamo! - success!

Some of you may be like, "Wait, that'd never work!" And you'd be right. The first problem is that the function, which exists in AWS, would not have access to the file system on Netlify. Second, in a "real world" situation, your data would likely be loaded and used within various templates that are pre-rendered as part of the static site generator's build process. This means that, even if I had access to the filesystem on Netlify, any change would get overwritten from a rebuild triggered by my git repository.

So, what we really would want would be to write the changes into the git repository (mine is on GitHub) and this change would then automatically trigger Netlify to rebuild the site which would use my updated data file.

### Creating the Function

Now that I better understood what I wanted to build, I had to find a way to get my Netlify function to talk to GitHub. Thankfully, GitHub has a toolkit called [Octokit](https://developer.github.com/v3/libraries/) with a [REST implementation using JavaScript](https://github.com/octokit/rest.js) that I could plug into my Node-based function. The [documentation](https://octokit.github.io/rest.js/) may seem overwhelming as the API can do so many things, but using the search I was fairly quickly able to find the methods I needed. To install it, use `npm install @octokit/rest --savedev`.

The first step is to go into the [developer settings in your GitHub profile](https://github.com/settings/tokens) and create an access token that we can use to authenticate with the API since we'll be wanting write access to the repo. You'll want to give the token access to write and read packages.

![Setting up a token in GitHub](/images/1579533388-receiveconfigurestep1sm.png)

Copy the token and head to the Netlify admin for this site (you'll need to set the site up if you don't have an existing one). Go to Settings > Build & Deploy > Environment. Create a new environment variable containing the token so that we can access it from our function code without exposing it publicly.

![Setting up a token in GitHub](/images/1579533393-receiveconfigurestep2sm.png)

Now let's look at the contents of `zapierReceive.js`. There's a lot going on, but I'll explain it as best I can.

```javascript
const Octokit = require('@octokit/rest'),
    owner = 'remotesynth',
    repo = 'webhooks';

exports.handler = async (event, context, callback) => {
    try {
        const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
        if (!event.body) {
            return {
                statusCode: 500,
                body: 'Title and link are required.'
            };
        }
        const body = JSON.parse(event.body);
        const newItem = {};
        newItem.title = body.title;
        newItem.link = body.link;
        if (!newItem.title) {
            return {
                statusCode: 500,
                body: 'title parameter required'
            };
        }
        if (!newItem.link) {
            return {
                statusCode: 500,
                body: 'link parameter required'
            };
        }
        let path = 'links.json';
        return octokit.repos
            .getContents({
                owner,
                repo,
                path
            })
            .then((res) => {
                console.log(res);
                let buff = Buffer.from(res.data.content, 'base64');
                let linksRaw = buff.toString('utf-8');
                let linksJSON = JSON.parse(linksRaw);
                let message = 'Updated links';
                let content = '';
                let sha = res.data.sha;
                linksJSON.links.push(newItem);
                linksRaw = JSON.stringify(linksJSON);
                buff = Buffer.from(linksRaw);
                content = buff.toString('base64');
                return octokit.repos
                    .createOrUpdateFile({
                        owner,
                        repo,
                        path,
                        message,
                        content,
                        sha
                    })
                    .then((res) => {
                        return {
                            statusCode: 200,
                            body: '{"success":"true"}'
                        };
                    });
            });
    } catch (err) {
        [];
        return { statusCode: 500, body: err.toString() };
    }
};
```

The first few lines import Octokit and set variables for the username and repository that I'll be connecting to. We begin the function by instantiating Octokit using the Netlify environment variable we set up earlier for auth. Next we do some very basic validation to ensure that a title and URL have been sent. After that, we use Octokit to call the GitHub API and get the existing contents of the file we intend to change, which is returned as Base64 (perhaps there's another method for this that doesn't return Base64, but this worked fine for my purposes). When that succeeds, we add the new item to the array, convert it back to JSON and then use Octokit to write the contents back to GitHub with a commit message.

Phew! 😫 Honestly, it was far easier to write than it is to explain.

### Testing the Function

Now that the function is written, we can use [Netlify Dev](https://www.netlify.com/products/dev/) to run the function locally and a tool like [Postman](https://www.getpostman.com/) to test it. In my experience, testing of functions locally with Netlify Dev generally requires that the function exist on Netlify first, so if you haven't deployed the function yet, do so. After that, any changes can be tested locally without needing to redeploy. Once that's done, start the site locally using `netlify dev`, which will run the site as well as the functions for local testing.

Assuming you are running Netlify Dev using the default settings, the URL to test the function should be `localhost:8888/.netlify/functions/zapierReceive`. Go ahead and plug that into Postman, along with the JSON payload to ensure everything is running properly.

![Testing the function in Postman](/images/1579533396-receiveconfigurestep3sm.png)

If you get back success, then we're good to move on to the next step. It's worth noting that even though we called this locally, it is making a change to your GitHub which repository would be reflected on your site.

### Deploying to Netlify

You probably already deployed the function to test it, but there is one problem you may encounter. We're using Octokit but it isn't installed on our instance running the function. So if you called your public URL via Postman right now, you should get an error. There are multiple solutions to this.

-   Run the npm install as a prebuild or build step. You can find more details about how to do this in the [support post here](https://community.netlify.com/t/functions-and-node-modules/2323/4). Keep in mind that this may factor into your build minutes, which can incur charges if this process will run frequently.
-   Create a pre-bundled function that includes the dependencies as part of a build step using [Netlify Lambda](https://github.com/netlify/netlify-lambda).
-   Deploy an [unbundled function](https://docs.netlify.com/cli/get-started/#unbundled-javascript-function-deploys) using the Netlify CLI and `netlify deploy`.

Once we've deployed our function with the necessary dependencies, we should be able to call our function on Netlify from within Postman using a URL structure like `[My Netlify URL]/.netlify/functions/zapierReceive`. This should update your list of URLs and cause the site to rebuild with the new URL added.

## Setting Up the Webhook in Zapier

Now that we have an endpoint to post to (i.e. our Netlify Function), we can set the rest of the process up in Zapier. Start by making a new zap and search for "RSS by Zapier" and then choose "New Items in Multiple Feeds". This task will watch a list of RSS feeds and run when it sees new posts.

![Setting up the Zap in Zapier](/images/1579533399-receiveconfigurestep4sm.png)

Next, we'll choose our feeds. I chose a couple of my favorite developer-focused sites.

![Choosing feeds to watch](/images/1579533401-receiveconfigurestep5sm.png)

Once you've set the feeds you want, the next step is to map the RSS data to the fields you want to send to the webhook. In our case, we just need `title` and `link` parameters.

![Mapping RSS data in Zapier](/images/1579533405-receiveconfigurestep6sm.png)

Once this step is complete, you can click "Test & Continue" to move on to configuring the webhook.

For the "Do this..." portion of the setup, we need to search for and choose the "Webhooks by Zapier" task. Once that is chosen, select "POST" as the "action event" option. This specifies the method by which data will be sent to our endpoint.

![Setting up the webhook Zapier](/images/1579533408-receiveconfigurestep7sm.png)

After clicking "Continue" you will specify the URL of the endpoint at Netlify and map the data coming from the webhook to parameters that will be sent to the endpoint. Enter the URL of your function at Netlify here and choose a payload type of JSON. Then map the existing `title` and `link` parameters to `title` and `link` parameters in the data. The remaining configuration options can be left at their default settings.

![Setting up the webhook Zapier](/images/1579533412-receiveconfigurestep8sm.png)

Clicking continue will allow you to test and ultimately save your configuration. Assuming the function returns success, you can enable our zap. Once the zap is running, you should eventually see links added to the JSON on your site and reflected on the site itself if you have that data mapped to a layout. For example, here's mine (beautifully designed) after leaving the zap running for a while.

![links displaying on the page](/images/1579533418-receiveconfigurestep9sm.png)

## Next Steps

Obviously, this is a very basic example of what you might do using these tools. There are 1,500+ apps that Zapier integrates with, so that's an enormous amount of sources you can integrate with to pull data into your site. For example, you could automatically pull in new images posted to Instagram and push those images to a gallery on your site. Or you could pull in data from a Google Sheet making it easy for an editor to update a list of data that appears on the site. These are just a couple of ideas and, while using Zapier isn't necessarily required to accomplish any of these, it does simplify the process and help you avoid digging into the ins and outs of each specific API.

If you'd like to check the sample code for this and the [prior tutorial](https://www.stackbit.com/blog/jamstack-api-zapier-webhooks-1/), it can be found at [https://github.com/remotesynth/webhooks](https://github.com/remotesynth/webhooks)
