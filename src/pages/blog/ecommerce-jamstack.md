---
thumb_img_path: '/images/1584623183-ecommercesm.png'
content_img_path: '/images/1584623058-ecommerce.png'
template: post
title: Getting Started with Ecommerce and the JAMstack
excerpt: >-
    A look at some of the options for building an ecommerce site using the
    JAMstack including a demo that shows how to easily build am ecommerce site
    using a headless CMS and Snipcart.
date: '2020-03-19'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    A look at some of the options for building an ecommerce site using the
    JAMstack including a demo that shows how to easily build am ecommerce site
    using a headless CMS and Snipcart.
---

Just a handful of years ago, when I was deeply enthralled with something called "static sites" and "static site generators," the idea of building an ecommerce site using these tools seemed a little bit ridiculous. Everything required for an ecommerce site shouted "_Dynamic!_" - including maintaining a product library to creating a shopping cart. However, the modern JAMstack, with its rich array of services and APIs makes building ecommerce site surprisingly easy.

In this post, we'll look at some of the options for building an ecommerce site using the JAMstack. Then we'll dig into a demo to show how easily it can be built using modern tools for managing the content and enabling the shopping cart and checkout functionality.

## Options for Ecommerce

The good news is that you have a ton of options when it comes to choosing how to enable ecommerce on your JAMstack site using headless ecommerce solutions. Headless ecommerce, much like a headless CMS, decouples the tooling and management needed for a storefront and checkout from the frontend.

Traditional solutions, like Magento for instance, were used to develop both the frontend and the backend. Instead, headless ecommerce solutions provide APIs and SDKs for integrating any frontend with the managed backend. The benefit of this approach is that it gives complete flexibility to how the frontend is built (or what kind of frontend it is - be it a mobile site, mobile app or something else entirely). More importantly for us, it enables us to build a blazing fast frontend using the JAMstack.

There are a ton of options out there and, to be honest, it can be tough to discern the exact differences. Two of the main differences I found were in how they charge (percentages and/or monthly fees) as well as the tool's management features, which are often tied to your expected volume of sales.

Some headless ecommerce options include:

-   [Snipcart](https://snipcart.com/) - Snipcart's offering focuses on ease of integration and a plan based solely on transaction fees without additional monthly subscription costs.
-   [Foxy.io](https://www.foxy.io/) - Like Snipcart, Foxy.io is designed to be easy to integrate, but their pricing model is focused around a fixed monthly subscription with a set amount of included transactions.
-   [Commerce.js](https://commercejs.com/) - Unlike the prior options, Commerce.js doesn't have a drop-in shopping cart and checkout solution but is designed for those that want to build a fully-customized cart and checkout experience from scratch using their APIs.

These are just a few options of many, so it pays to do your research. Let's look at how to integrate one of these services into a JAMstack site.

## Enabling Ecommerce Using Snipcart

For my example, I decided to use Snipcart. One nice option that Snipcart has is that test development is always free.

### Setting Up the Sample Site

Here's what my simple store looks like. I only have 5 products.

![The Sample App - RemoteStore](/images/1584622819-sanitysm.png)

If you want to try the site yourself, it's available at [https://snipcart-demo.netlify.com/](https://snipcart-demo.netlify.com/) (the checkout process is running in test mode). The sample code is also available on GitHub at [https://github.com/remotesynth/ecommerce-demo-snipcart](https://github.com/remotesynth/ecommerce-demo-snipcart).

The site was built with Hugo and has only two templates - one for the home page and one for the product page. The products are managed using [Sanity](https://www.sanity.io/) as a headless CMS.

![Product content in Sanity](/images/1584622819-sanitysm.png)

The only data model is for a product which has very basic data structure as shown below.

```javascript
{
    title: "Product",
    name: "product",
    type: "document",
    fields: [
      {
      title: "Title",
      name: "title",
      type: "string",
      validation: Rule => Rule.required()
      },
      {
      title: "Price",
      name: "price",
      type: "number",
      validation: Rule => Rule.required()
      },
      {
        title: "Description",
        name: "description",
        type: "string",
        validation: Rule => Rule.required()
      },
      {
        title: "Image",
        name: "image",
        type: "image",
        validation: Rule => Rule.required()
      },
      {
        title: "Body",
        name: "body",
        type: 'text',
        validation: Rule => Rule.required()
      }
    ]
  }
}
```

To enable integration of Sanity content with my Hugo site, I am using a new project called [Sourcebit](https://github.com/stackbithq/sourcebit) that pulls the content and images into my local site. For details on how that works, please check my [introduction to Sourcebit tutorial](https://www.stackbit.com/blog/data-driven-jamstack-sourcebit/).

### Integrating Snipcart

Adding Snipcart took very little time. Once I signed up for an account, here are the steps I followed to add a fully functioning cart and checkout process to my site. Keep in mind that this is a basic integration without taking advantage of any of the [customization options](https://docs.snipcart.com/v3/setup/customization) Snipcart allows.

#### Step 1: Add the Snipcart CSS and JavaScript files.

The CSS file can go in the head block in my `baseof.html` template (which serves as the base for all templates).

```html
<link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.8/default/snipcart.css" />
```

I placed the `div` that will hold the injected HTML that runs the cart and checkout right before my closing `body` tag. The `div` needs a data attribute that contains your public key from Snipcart.

```html
<div hidden id="snipcart" data-api-key="MY_PUBLIC_KEY"></div>
<script src="https://cdn.snipcart.com/themes/v3.0.8/default/snipcart.js"></script>
```

#### Step 2: Add the product data attributes to the "add to cart" link/button.

I added the ID (which I just based on the title of the product), the price, description, title and image to the data attributes. These all get passed to Snipcart.

```html
<a
    href="#"
    class="image-holder__link snipcart-add-item"
    data-item-id="{{ anchorize .Title }}"
    data-item-price="{{ .Params.price }}"
    data-item-url="{{ .RelPermalink }}"
    data-item-description="{{ .Params.description }}"
    data-item-image="/images/products/{{ .Params.image }}"
    data-item-name="{{ .Title }}"
></a>
```

That's it! 🎉 We can now add to cart and run through a checkout.

![Add to cart](/images/1584622809-addtocart.gif)

Technically, our store is functional. However, there's some finishing touches that it requires.

#### Step 3: Add a checkout button.

Right now, the only way for a customer to view their cart or proceed to checkout is to add an item. Let's fix that by adding a button to open the cart and proceed to checkout. On my page header in `baseof.html` I added the following link with the styles added to enable it to open our cart.

```html
<a class="btn btn-primary checkout snipcart-checkout">Click here to checkout</a>
```

Easy! But I wanted it to also display the number of items in the cart, which just required a little tweaking of the link HTML.

```html
<a class="btn btn-primary checkout snipcart-checkout">Click here to checkout (<span class="snipcart-items-count"></span>)</a>
```

The `span` is automatically populated with the number of cart items.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ub5HV_-E-u0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Now, we're really done! 🙌🏻

I should note here before we finish that in order for the checkout process to complete successfully, I also needed to add my domain in the [account settings on Snipcart](https://app.snipcart.com/dashboard/account/domains).

![Adding a domain on Snipcart](/images/1584622804-adddomainsm.png)

## Where To Go From Here

As I stated, this is the very basic implementation of Snipcart, without much customization and with a very simple product set. For example, products might have different size or personalization options, or you would likely need to set up shipping (unless the product is digital, which is also supported). Or you may need to take advantage of features like discounts, inventory management, abandoned cart recovery. Or perhaps you need to enable more complex functionality via the [SDK](https://docs.snipcart.com/v3/sdk/basics). There's obviously a lot more we could explore. Still, it's pretty amazing that tools like Snipcart and other headless ecommerce tools can offer developers a means of implementing a shopping cart and checkout process in just a few lines of code.
