---
thumb_img_path: >-
    /images/1579184242-buildyourownapinetlifyzapier570.png
content_img_path: >-
    /images/1579184254-buildyourownapinetlifyzapier.png
template: post
title: 'Build Your Own JAMstack API with Netlify Functions and Zapier Webhooks, Part 1'
excerpt: >-
    A step-by-step tutorial showing how to connect a JAMstack site to over 1500
    services via Zapier webhooks and Netlify Functions.
date: '2020-01-16'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    A step-by-step tutorial showing how to connect a JAMstack site to over 1500
    services via Zapier webhooks and Netlify Functions.
---

We've gotten so used to everything having an API that it can be a little bit disorienting when you encounter a situation where you cannot accomplish a task via an API. This can be especially difficult in the JAMstack world where any dynamic functionality is accomplished via an API of some sort - the A in JAM stands for APIs after all. In this post, I want to talk about a solution that can work in many cases where either an API doesn't exist or it doesn't necessarily do exactly what you want to achieve.

I have been using [Zapier](https://zapier.com/) for some time. Like similar services such as [IFTTT](https://ifttt.com/), it allows you to mash up tasks in a "when X event happens do Y" type of fashion. For example, I have used it to do things like automatically sign someone up for a mailing list when they register for an event I'm running or run a new Netlify build at a particular time each day. However, Zapier also has a feature called [Webhooks](https://zapier.com/engineering/using-webhooks/) that allow you to kind of "create your own API" by connecting the webhook to any service Zapier integrates with. (Note: IFTTT also offers [webhooks](https://ifttt.com/maker_webhooks) that seem to work similarly.)

In this tutorial, I'll show you how to set up webhooks by Zapier to send information to a third-party service and how to integrate them into your JAMstack site using [Netlify Functions](https://www.netlify.com/products/functions/). This combination allows you to quickly and easily create dynamic functionality on your JAMstack site and create services that do things existing APIs may not even support.

> Note webhooks by Zapier are currently a premium feature.

The sample code from this post is available at [https://github.com/remotesynth/webhooks](https://github.com/remotesynth/webhooks).

## Sending Data via a Webhook

The first scenario we'll look at is creating a webhook with an endpoint that receives data from your site and passes that data to an existing service Zapier supports.

### Configuring a Webhook in Zapier

Let's start by creating a new webhook as an endpoint within Zapier. To start, make a new Zap and search for Webhooks by Zapier. Then for the type of trigger event choose "Catch Hook", which will give us a Zapier endpoint URL to post to.

![choosing a trigger event](/images/1579184329-sendconfigurestep1sm.png)

When you continue to the next step, Zapier will give you your endpoint URL. This is where we will send our GET or POST requests to.

![webhook endpoint URL](/images/1579184334-sendconfigurestep2sm.png)

If you had complex data the child key could help you select only the data under a specific key but, for our purposes, it won't be necessary. The best thing to do here is to plug the URL into something like [Postman](https://www.getpostman.com/) and send a sample request. You'll see why in a moment. In my case, this will be a simple API that takes only a name and email.

![sending sample data via postman](/images/1579184337-sendconfigurestep3sm.png)

The webhook should return a success status. It doesn't really matter what data you send, the webhook is designed to take whatever data and pass it along. Back in Zapier, click continue and you should see a request with sample data - this is why we sent the sample request. You can send additional requests and they will be listed here. Choosing one will allow you to map the data sent to the remainder of the zap. Click "Test & Continue" to move on to the next step.

![sample data in Zapier](/images/1579184340-sendconfigurestep4sm.png)

In this example, we'll be doing something fairly simple, which is to pass the data into a Google Sheet. So, obviously you'll need the sheet set up. It's best to include headers as it makes mapping the data much easier. You can see my columns map to the data I sent to the webhook.

![empty Google Sheet with headers](/images/1579184342-sendconfigurestep5sm.png)

Next, for the "Do this..." step in Zapier search for Google Sheets. Choose "Create Spreadsheet Row" for the Action Event.

![configuring Google Sheets in Zapier](/images/1579184345-sendconfigurestep6sm.png)

You'll need to choose your account - you may need to authenticate and grant Zapier permissions here as well.

![choosing Google account in Zapier](/images/1579184347-sendconfigurestep7sm.png)

Once the Google account is selected, you can choose the spreadsheet you want to use (I chose the simple sheet I created earlier), then worksheet within that spreadsheet and finally map the columns (based on the column headers) to the sample data from our previous POST to the Zapier webhook endpoint.

![configuring Google Sheets in Zapier](/images/1579184351-sendconfigurestep8sm.png)

Ok. We're done in Zapier - just click "Test & Continue" to finish and then enable your Zap. Next we need to set up the Netlify function that will be used by our JAMstack site to call the Zapier webhook endpoint.

### Creating the Netlify Function

Netlify Functions are serverless functions that run on AWS that can help turn your site from a static site to a JAMstack site by connecting with APIs or performing dynamic tasks. While this can obviously be accomplished by using a straight serverless cloud function on any provider, the benefit of Netlify Functions is that it simplifies the testing and deployment within the context of a JAMstack application.

To start, create a folder to place our Netlify functions (I named mine `lambda` but you can name it anything). Next, create a `netlify.toml` configuration file at the root of the site and add the following configuration to tell Netlify where to find our functions.

```toml
[build]
  functions = "./lambda"
```

Now let's create our function. We'll be using [Axios](https://github.com/axios/axios) to handle our HTTP requests, so you'll need to install that first using `npm install axios --savedev`. Then create a `.js` file in our `lambda` folder. It doesn't matter what it is called but I named mine `zapierSend.js`. Let's look at the source for that file and I'll explain it.

```javascript
const axios = require('axios');

exports.handler = async (event, context, callback) => {
    try {
        if (!event.body) {
            return {
                statusCode: 500,
                body: 'Name and email are required.'
            };
        }

        const body = JSON.parse(event.body);
        const email = body.email;
        const fullName = body.fullName;
        if (!email) {
            return {
                statusCode: 500,
                body: 'email parameter required'
            };
        }
        if (!fullName) {
            return {
                statusCode: 500,
                body: 'name parameter required'
            };
        }

        return axios({
            method: 'post',
            url: 'https://hooks.zapier.com/hooks/catch/2422393/otw0s6l/',
            data: {
                email: email,
                fullName: fullName
            }
        })
            .then((res) => {
                console.log(res);
                return {
                    statusCode: 200,
                    body: JSON.stringify(res.data)
                };
            })
            .catch((err) => {
                return { statusCode: 200, body: JSON.stringify(err.response.data.errors[0]) };
            });
    } catch (err) {
        [];
        return { statusCode: 500, body: err.toString() };
    }
};
```

This is a fairly standard Netlify function whose primary function is to wrap the HTTP request performed by Axios. The first part looks for required values within the `event` object that is passed in, which in our case are `fullName` and `email`. We'll be passing these when we call the function from JavaScript within our application just as we did earlier with Postman. If the request is successful, we pass back any data sent with a status code of 200 or if it fails we return the error with a status code of 500.

#### Testing the Function

Now let's test the function using [Netlify Dev](https://www.netlify.com/products/dev/). Netlify Dev is functionality within the [Netlify CLI](https://github.com/netlify/cli) that makes it easy to do local testing of your JAMStack site that is deployed to Netlify, including local testing of functions.

I've noticed that testing of functions locally generally requires that the function exist on Netlify first, so if you haven't deployed the function yet, do so. After that, any changes can be tested locally without needing to redeploy. Once that's done, start your site locally using `netlify dev` and then open a tool like Postman and create a new POST request. Assuming the site is running on port 8888 (which is the default for Netlify Dev), the URL for the function should be `localhost:8888/.netlify/functions/zapierSend`. You'll need to pass the JSON payload as well as shown below.

![Sending a sample request to our Netlify Function](/images/1579184354-sendconfigurestep9sm.png)

If everything is set up correctly, you should receive a success status back. Now it's time to call the function from within our application.

#### Calling the Function

Let's create a simple form to submit name and email.

```html
<h1>Sending a Webhook</h1>
<form id="sendWebhookForm" onsubmit="return sendWebhook(this);">
    <label for="fullName">Name:</label> <input type="text" name="fullName" /> <label for="email">Email:</label>
    <input type="email" name="email" />
    <input name="sendInfo" type="submit" value="Submit" />
</form>
```

We'll be sending the request from the browser using Axios, so we'll also need to load the Axios library as well as a script that will contain the `sendWebhook()` function that is called by our form.

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="main.js"></script>
```

The `sendWebhook()` function called when the form is submitted is a very simplistic HTTP request to our Netlify Function.

```javascript
function sendWebhook(form) {
    axios
        .post('/.netlify/functions/zapierSend', {
            email: form.email.value,
            fullName: form.fullName.value
        })
        .then(function (response) {
            if (response.data.status === 'success') {
                form.sendInfo.disabled = true;
                form.email.value = '';
                form.sendInfo.value = 'Saved!';
            } else {
                alert('We apologize, there was a problem registering you.');
            }
        })
        .catch(function (error) {
            alert('We apologize, there was a problem registering you.');
        });

    return false;
}
```

I should note that for the purposes of example, this code doesn't include much in the way of validation and error checking. It sends a POST request with the form details to our Netlify Function which then passes that to the Zapier Webhook and, if everything is successful, posting the information to our Google spreadsheet.

![Our data in a Google Sheet](/images/1579184357-sendconfigurestep10sm.png)

## Next Steps

The awesome thing is that this same process could allow you to easily connect your JAMstack application to any of the services that 1,500+ apps that Zapier has integrations with. This makes a lot of things possible that may have been either difficult or even impossible using existing APIs. You can explore the full code at [https://github.com/remotesynth/webhooks](https://github.com/remotesynth/webhooks).

In the next part, we'll flip things around. What if, rather than receiving data from your application, you want to use a webhook to send data to your application?
