---
thumb_img_path: '/images/1575903021-openauthoringsm.png'
content_img_path: '/images/1575902973-openauthoring.png'
template: post
title: Creating a JAMstack Site with Open Authoring Using Netlify CMS
excerpt: >-
    Leverage the power of the community by creating a JAMstack site that anyone
    can edit and contribute using NetlifyCMS's open authoring.
date: '2019-12-09'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    Leverage the power of the community by creating a JAMstack site that anyone
    can edit and contribute using NetlifyCMS's open authoring.
---

Community is powerful. The internet has often succeeded by channeling that power into "crowdsourcing" for things like raising funds or even managing content. The most obvious example of crowdsourced content would be Wikipedia, but sites like Medium or [DEV](https://dev.to/) also harness community-driven content contributions. Many projects and companies also rely on their communities to improve their documentation.

When it comes to JAMstack sites, this community-driven content is often powered by straight GitHub forks and pull requests. This works well but requires a certain degree of technical knowledge as well as a bit of manual work (pulling the code, making the change, committing it, submitting the pull request and so on). This can be a real hindrance - especially if your goal is to get contributions from folks without a high degree of technical expertise.

However, a new feature of [Netlify CMS](https://www.netlifycms.org) called [open authoring](https://www.netlifycms.org/docs/open-authoring) makes this process as easy as editing content directly in the CMS - the forking and pull requests are all handled behind the scenes. In this post, I'm going to walk through the steps to set up open authoring using Netlify CMS on a site built originally with [Stackbit](https://www.stackbit.com/).

## What is Netlify CMS and Open Authoring?

Netlify CMS is an open source project maintained by Netlify. It is what's often called a git-based CMS. As a git-based CMS, Netlify CMS provides the UI and tools to maintain the content, but the content itself is stored as files within a git repository and versioning is handled by the repository. Under a typical deployment, user access might be managed by Netlify Identity (or a third-party integration) and you'd invite contributors who are granted access to your CMS admin to edit content. You might have a workflow in place, but editing content is still limited to a small group with specially granted access.

With a site designed to have "crowdsourced" content, you'd need access to be public so that anyone could submit content, but you'd also need to ensure that changes are reviewed and approved before going live. To address this, Netlify CMS released open authoring, which is currently a [beta feature only](https://www.netlifycms.org/docs/beta-features/#open-authoring). I first learned of the feature when [CSS Tricks adopted it](https://css-tricks.com/netlify-cms-open-authoring/) for editing some of their community-driven pages.

Here's a quick overview of how it works. Open authoring uses GitHub authentication, meaning essentially that anyone with a GitHub account can add or modify content on your site. Content edits are work by creating a fork of your project and, when they submit their change for review, submitting as a pull request. However, while the whole fork and pull request process underpins the feature, it is (mostly) transparent to the user who simply makes changes to the content in the CMS. This means that, other than requiring a GitHub account, contributing content should be easily accessible to anyone, regardless of their level of technical knowledge.

## The Example Site

The example we'll review for this tutorial is a site I just launched called [RageQuit.tips](https://ragequit.tips/) that is designed to be community resource on the topic of [burnout](https://www.psychologytoday.com/us/basics/burnout). Burnout is [defined](https://www.merriam-webster.com/dictionary/burnout) as "exhaustion of physical or emotional strength or motivation usually as a result of prolonged stress or frustration." It is generally associated with job stress and is something that many of us have faced, regardless what industry we work in. The idea for the site is to allow the community to share experiences and resources related to dealing with burnout.

[![RageQuit.tips](/images/1575903124-ragequitsm.png)](https://ragequit.tips/)

If you are interested in the topic of burnout, please check it out. And if you have experiences or resources you'd like to share, I invite you to [contribute](https://ragequit.tips/contribute/).

The site was built using the following technologies:

-   [Stackbit](https://www.stackbit.com/) - Stackbit allowed the site and CMS to be easily generated using a theme, which was later customized to meet the site's specific needs.
-   [Jekyll](https://jekyllrb.com/) - The underlying static site generator is Jekyll . This was chosen to make source contributions easier as it is one of the oldest and most widely known static site generators.
-   [Netlify CMS](https://www.netlifycms.org/) - As mentioned earlier, this is an open source, git-based CMS.
-   [Netlify](https://www.netlify.com/) - Netlify is used to deploy and host the site, but also maintains the hooks needed to authenticate into the CMS via GitHub.
-   [GitHub](https://github.com) - GitHub manages the repository but also handles the authentication.

Using this site's code as an example, let's explore the steps to enable open authoring on a Netlify CMS site.

## Getting Started

Stackbit provides a great (and free) tool that makes it easy to get started with a CMS-driven JAMstack site, including Netlify CMS. The best part, for the design-impaired like me, is that it comes with selection of attractive templates. I won't run through the process too deeply here, but basically you choose a theme, then a static site generator and finally a CMS. You can [try it out for yourself here](https://app.stackbit.com/create).

I picked Jekyll as the static site generator and, obviously, Netlify CMS. I chose [Libris](https://github.com/stackbithq/stackbit-theme-libris) as the theme. Libris is designed as a documentation site template that also has a blog. This worked well for the resources section and blog I was planning.

Out of the box, Stackbit deploys a fairly standard Netlify CMS configuration. So, once the deployment has finished, you will get the invitation email to collaborate on the content via Netlify CMS.

![Netlify CMS invite](/images/1575903100-cmsinvitesm.png)

### Resolving a Limitation

Before we proceed, I want to point out an issue that may trip you up as it did me initially. If you were to go ahead accept this invite and log in (though we will be changing the authentication later to support open authoring), you may notice a limitation of this template when using Netlify CMS. The "Documentation Pages" section displays no pages even though the repository has a number of pages. This is because, at the moment, collections in Netlify CMS do not support content in subfolders, although this is a feature that [should be added soon](https://github.com/netlify/netlify-cms/issues/513).

There are two potential solutions to this in the meantime. The first is to move documentation pages to the root of the the `docs` folder. Then make a small change to the Netlify CMS configuration to look for documentation pages in the `docs` folder rather than via the root of the site (it's preconfigured to look for any page across the site having `layout: docs` in the front matter).

```yaml
  - name: docs
    label: Documentation Pages
    folder: docs
    ...
```

The biggest drawback to this is that you'll also need to make changes to the documentation layout files to support this change. In particular, you'll need to modify how the templates generate the navigation of documentation sections.

The second solution, which is what I chose to do, is to make the change above and then duplicate the model for each subfolder in the Netlify configuration. You'll need to change the `name`, `folder`, and `label` values for each. So, for example, you might have the following as an additional content model:

```yaml
  - name: docs_faq
    label: Docs FAQ Section
    folder: docs/faq
    ...
```

While harder to maintain, the benefit of the second solution is that you can retain content in subfolders and avoid making difficult layout changes. In theory, once Netlify CMS supports this feature, you can just remove all the additional models.

## Configuring Netlify CMS for Open Authoring

Firstly, open authoring is a beta feature. So we need to change the project to use the beta release of the project. Open up `admin/index.html` and replace the source for `netlify-cms.js` with the beta release.

```html
<script src="https://unpkg.com/netlify-cms@beta/dist/netlify-cms.js"></script>
```

Next, open authoring requires that we use [GitHub authentication for the backend](https://www.netlifycms.org/docs/authentication-backends/#github-backend). So let's modify the Netlify CMS configuration for this and then enable open authoring. Open `admin/config.yaml` and change the `backend` to use `github` rather than the `git-gateway` and define the associated `repo` (note that the `repo` value does not need the `github.com` portion). Also add a value for `open_authoring` and set it to `true`. When you are finished, your `backend` should look something like this:

```yaml
backend:
    name: github
    branch: master
    repo: remotesynth/ragequit-tips
    open_authoring: true
```

The next change you'll need to make in the config is to change to an editorial workflow. This means that content must go through a review and approval process before being published. Because of the way open authoring works, this is required. In the root of the `config.yaml` file add `publish_mode` and set it to `editorial_workflow`. For instance, mine is right above `collections` and below the `public_folder`.

```yaml
---
media_folder: images
public_folder: /images
publish_mode: editorial_workflow
collections:
```

You'll also need to enable GitHub authentication via the [visitor access settings](https://docs.netlify.com/visitor-access/oauth-provider-tokens/#setup-and-settings) in your Netlify admin console. To do this, first you'll need to set up an OAuth app in GitHub. In GitHub, go to Settings > Developer Settings > [OAuth Apps](https://github.com/settings/developers). You'll need to provide a name and a URL (you can use your netlify.com domain if you like for now) and an authorization callback URL that should be set to `https://api.netlify.com/auth/done`.

![Adding an OAuth app in GitHub](/images/1575903121-oauthappgithubsm.png)

This should give you a client ID and secret, which you'll need to copy into Netlify.

![GitHub client ID and secret](/images/1575903114-githubclientidsm.png)

Next, in Netlify, go to Settings > Access Control > OAuth and then click the install provider button. It should default to GitHub and here you can paste in the client ID and secret provided by GitHub.

![Adding GitHub authentication](/images/1575903111-githubauthenticationsm.png)

If you commit these changes or test locally and go to your site's `admin`, you'll get the log in with GitHub option instead of log in with Netlify. After clicking that, you'll have to grant the site access via the GitHub OAuth process, but then you should have complete access to your admin as you did before. Note, though, that due to the editorial workflow, you'll need to save and then set the status to "Ready" before hitting "Publish" and pushing your change live.

![Changing the status of a document](/images/1575903118-netlifycmsstatussm.png)

That's it! Open authoring is now enabled and anyone can access your `/admin` and add or edit content. Their experience will be slightly different than yours though, so let's take a look at that.

## The End User Experience

Assuming someone now accesses your `/admin`, what's the experience going to be like?

When they get to the admin, they'll be prompted to log in with GitHub, same as you were. They can use an existing account or create one, and they will have to accept the permissions on their account.

![authorize permisions with GitHub](/images/1575903108-githubauthenticatesm.png)

Once they do, if this is the first time they are making edits, they will be asked to fork the repository. They will need to agree to fork it to proceed into the admin. (Note that I do think this language could be improved for non-technical users who may not be familiar with terms like "fork" but who sign up for GitHub to contribute nonetheless. I also think it could be useful to clarify that the the "Don't fork the repo" option is effectively a choice not to proceed.)

![fork the repository](/images/1575903106-forksm.png)

Once they accept and enter the admin, they'll need to follow the workflow to add or edit pages. For instance, to edit a page, they would make their edits and click the "save" button in the upper-left hand corner of the page.

![save your changes](/images/1575903127-savecmssm.png)

Once they've completed all of their changes, they will need change the status of the content to "In Review" via the drop-down in the upper-right hand corner of the page.

![in review status](/images/1575903116-inreviewsm.png)

This will submit the changes to be reviewed and accepted into the site as a pull request in GitHub, although that will be transparent to them. Adding new content follows a similar flow.

### Making It Easy to Edit Pages

It's unlikely you'll want to just dump folks into the `/admin` and let them figure things out. The best bet is to drop links on content that leads them directly to the pages they may want to edit or create in the CMS.

The good news is that this is just requires linking to the right spot in the `/admin`. It's just a matter of ensuring that the link goes to the proper collection or page within the CMS. For example, let's say you want a link to add a new post to the blog, you could use:

```html
<a href="/admin/#/collections/post/new" class="button">Add a Post to Our Blog</a>
```

This works because there is a collection with `name: post` in the `config.yml` for Netlify CMS. If you wanted to edit the specific blog post, you'd put the file name (through without the extension) instead of `new` in that URL path. Most static site generators offer page variables that could do this. In Jekyll, you could do:

```html
<a href="/admin/#/collections/post/{{page.name | replace: ".md", ""}}" class="button">Edit this post</a>
```

Let's look at one more example of something slightly more complicated. As you may recall from _much_ earlier in this post, in my case, I created a number of content mappings comprising the [resources section](https://ragequit.tips/resources/) of RageQuit.tips. In this section, I wanted you to be able to edit any existing page or add a page to the current section. The way I did this without needing to create a different layout template for each subsection was to standardize how the sections were named in the config based upon their subfolder. So, for example, `/resources/faq` would be defined as a content model of `resources_faq` in the CMS. I could then replace text within the path and link to the correct section in the CMS.

```html
{% assign collection_path = page.path | replace: '.md', '' %} {% assign collection_array = collection_path | split: "/" %}
<!-- the root content model name is just resources so checking if we aren't in the root -->
{% if collection_array.size >= 3 %} {% assign collection_path = collection_path | replace: "resources/", "resources_" %} {% endif %}
<!-- this is used to swap out the page name with new for the new post link -->
{% assign page_cms = page.name | replace: ".md", "" %}
<p>
    <a href="/admin/#/edit/{{collection_path}}" class="button">Edit this page</a>{% if collection_path != "resources/index" %}&nbsp;&nbsp;<a
        href="/admin/#/collections/{{collection_path | replace: page_cms, 'new'}}"
        class="button"
        >Add a New Page to This Section</a
    >{% endif %}
</p>
```

You can see more details about the current end-user editing experience in the [RageQuit.tips contribution guide](https://ragequit.tips/contribute/).

## A Powerful Tool for Enabling Community Contribution

Open authoring in Netlify CMS is a really great addition. I think it has some rough edges that might hinder non-technical users from contributing - things like the GitHub account requirement and the prompt to "fork", for instance. It is a beta feature after all. However, despite what the length of this post might imply (verbosity is my core competency), it's actually surprisingly easy to implement and use.

If you want to see the full source code of the demo I referenced, which includes all the necessary updates to the Netlify CMS content model and a number of other tweaks to the Stackbit generated template, you can [view it on GitHub](https://github.com/remotesynth/ragequit-tips).

With all that being said, I'd also like to invite you to contribute to [RageQuit.tips](https://ragequit.tips/). This isn't just a demo site, it's meant to be a true community resource for anyone coping with burnout. If you've experienced burnout, [share resources that helped you](https://ragequit.tips/resources/) or [add your story to the blog](https://ragequit.tips/blog/index.html). We can use our experiences to help others who may be coping with similar struggles.
