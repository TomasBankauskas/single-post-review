---
thumb_img_path: '/images/1584975258-sourcebit-plugin-sm.png'
content_img_path: '/images/1584975204-sourcebit-plugin.png'
template: post
title: Build Your First Sourcebit Plugin
excerpt: >-
    Sourcebit is a fully-extensible open source project that can connect any data
    source with a JAMstack site. In this post, we'll learn how you can build a
    plugin to connect to a data source, target SSG or transform data.
date: '2020-03-23'
author: src/data/authors/brian-rinaldi.yml
subtitle: >-
    Sourcebit is a fully-extensible open source project that can connect any data
    source with a JAMstack site. In this post, we'll learn how you can build a
    plugin to connect to a data source, target SSG or transform data.
---

[Sourcebit](https://github.com/stackbithq/sourcebit) is a new, MIT-licensed open source project that aims to make it easy for developers to integrate third-party data sources into their JAMstack site. In my [last post](https://www.stackbit.com/blog/data-driven-jamstack-sourcebit/), I discussed what Sourcebit is and how to get started using it.

Sourcebit has three types of plugins: source plugins; target plugins; and transformation plugins. A source plugin would connect to an API or data source. Source plugins already exist for [Sanity](https://github.com/stackbithq/sourcebit-source-sanity) and [Contentful](https://github.com/stackbithq/sourcebit-source-contentful). A target handles preparing the content/data output for the static site generator (SSG). Target plugins already exist for [Hugo](https://github.com/stackbithq/sourcebit-target-hugo), [Jekyll](https://github.com/stackbithq/sourcebit-target-jekyll) and [Next.js](https://github.com/stackbithq/sourcebit-target-next). Finally, transformation plugins will transform data pulled from a source before it is output for a target. An [assets](https://github.com/stackbithq/sourcebit-transform-assets) plugin already exists to download assets and update the links in the data to the local file URL.

All of this works amazingly if you use one of the preexisting plugins, but what if you want to connect to a source that is not yet supported? Or what if you want to support an SSG that doesn't yet have a target plugin? Well, thankfully, Sourcebit is designed to allow you to build your own plugins. You could even get them added to the [plugin registry](https://github.com/stackbithq/sourcebit/wiki/Plugin-registry) and make them available to any Sourcebit user. In this tutorial, I'll walk you through the steps for building your own plugin.

## The Sample Project

Sourcebit does already provide a [sample plugin](https://github.com/stackbithq/sourcebit-sample-plugin) that is well documented to help illustrate the various methods and requirements for building a plugin. However, I'd been experimenting with using the [Wordpress API in JAMstack apps](https://www.stackbit.com/blog/wordpress-to-jamstack/), so for this tutorial I thought I would try to build a basic Wordpress API source plugin.

You can find the source for the Wordpress source plugin at <https://github.com/remotesynth/sourcebit-source-wordpress>. While it has some important limitations that are explained in the [README](https://github.com/remotesynth/sourcebit-source-wordpress/blob/master/README.md), it is a fully functional plugin that will pull pages, posts and assets from a Wordpress API URL specified by the user during the interactive setup and configuration process.

The plugin utlizes two libraries:

-   [Node WPAPI](https://github.com/WP-API/node-wpapi) helps simplify working with Wordpress API methods within Node.
-   [Turndown](https://github.com/domchristie/turndown) turns HTML into Markdown. This is necessary because the Wordpress API delivers everything from titles to the body in rendered HTML. Note that, while configurable, Turndown can cause a loss in fidelity between the HTML and Markdown.

As you can see in the following video, here I am importing content from a local Wordpress installation to a Hugo site.

<iframe width="560" height="315" src="https://www.youtube.com/embed/5GgDkZiVnyw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 
Let's see how this was built.

## The Two Parts to a Plugin

It's worth thinking of your plugin as consisting of two separate parts: the first part handles collecting information from the user that is necessary to configure the plugin; and the second part is the code that actually performs the plugin action after the configuration is set.

### The First Part - Collecting Necessary Information

As mentioned earlier, Sourcebit has an interactive setup and configuration process. Rather than force users to configure it via a YAML configuration file or JavaScript, Sourcebit asks for the necessary information it needs via the command line and then generates a completed configuration file.

For example, in my Wordpress plugin the only configuration needed is to collect the Wordpress REST API URL to connect to. Your plugin may require much more complex configuration and, it's worth noting, the configuration process can be as simple or complex as you need it to be. For instance, the Contentful plugin needs things like API keys, environments and workspaces to know which data to connect to, so it asks multiple questions - some even based upon data from API responses.

There are two methods and one object that define how the configuration information for your plugin is collected and managed: the `options` object; the `getOptionsFromSetup` method; and the `getSetup` method.

> You can get more details about each of the below methods in the [Sourcebit plugin API documentation](https://github.com/stackbithq/sourcebit/wiki/Plugin-API).

#### The `options` object

The [`options` object](https://github.com/stackbithq/sourcebit/wiki/Plugin-API#options-object) defines data and configuration options that are available within your plugin. Each key in this object represents the name of a value (i.e. an option) you can use within your plugin code. Each option can include specific keys that define how that option is used and stored. Let's look at an example.

```javascript
module.exports.options = {
    wpapiURL: {
        env: 'WPAPI_URL',
        private: true
    },
    watch: {
        default: false,
        runtimeParameter: 'watch'
    }
};
```

In the Wordpress plugin, the `wpapiURL` is the option that will contain the URL the Wordpress API that we wish to connect to. I have not provided a `default`, but I did set the value to `private`, which means that Sourcebit will save it to a `.env` file rather than the configuration file. This can help prevent users from accidentally committing secret key information to their public repositories. The `env` key represents the name of the value within the `.env` file.

The `watch` option, however, defines a value representing a runtime parameter that can be specified by the user when running via the CLI. I have supplied a default of `false`, but this can be overridden via a command line parameter. Most source plugins will include this `watch` option as it is how Sourcebit enables live updates to be pulled from the data source (more on that later).

#### The `getOptionsFromSetup` method

The [`getOptionsFromSetup` method](https://github.com/stackbithq/sourcebit/wiki/Plugin-API#getoptionsfromsetup-function) runs when the setup process has finished and is primarily concerned with providing the answers that the user supplied during that process.

In the Wordpress plugin, there is only one answer, `wpapiURL`, that needs to be provided.

```javascript
module.exports.getOptionsFromSetup = ({ answers, debug, getSetupContext, setSetupContext }) => {
    return {
        wpapiURL: answers.wpapiURL
    };
};
```

#### The `getSetup` method

The [`getSetup` method](https://github.com/stackbithq/sourcebit/wiki/Plugin-API#getsetup-function) is where you'll define the interactive setup process for the user when configuring your plugin. This is where you will ask the questions required to get the configuration information you need from the user and where you can verify any connections your plugin requires before continuing.

The type of questions you may need to ask and the verifications you may need to make will depend largely on what type of plugin you are creating - a source, target or transformation plugin. Sourcebit provides the method with all the tools that it uses to generate the interactive setup process, meaning that you are free to customize this experience as you need to.

-   The `chalk` variable contains an instance of the [chalk library](https://github.com/chalk/chalk), which gives each plugin access to an array of text styling options for the CLI. You can reference the [chalk library documentation](https://github.com/chalk/chalk#usage) for details on how to use it.
-   The `ora` variable contains an instance of the [ora library](https://github.com/sindresorhus/ora), which provides a spinner tool used to inform the user when an action is loading as well as confirmation and error responses. For more information on how to use it, check the [ora library documentation](https://github.com/sindresorhus/ora#usage).
-   The `inquirer` variable contains an instance of the [inquirer.js library](https://github.com/SBoudrias/Inquirer.js), which provides the interface for the question and answer interaction via the CLI that is integral to the interactive setup process. Each inquirer prompt can contain questions that offer an [array of properties to customize the behavior](https://github.com/SBoudrias/Inquirer.js#question). In addition, inquirer.js provides a number of different [built-in prompt types](https://github.com/SBoudrias/Inquirer.js#prompt-types). Inquirer also allows for custom prompt types. For instance, some Sourcebit plugins rely on the [inquirer table prompt](https://github.com/eduardoboucas/inquirer-table-prompt) type to allow for selecting options in a table-like format.

Let's look at an example. For this initial version of the Wordpress plugin, there is only one question: "What is the root URL for your Wordpress API?" This question cannot be left empty and will default to any existing value if the setup was run previously (this is in the `currentOptions` variable). Once a user submits the response, we need to verify that the API is available at the URL provided and either show a success or a fail response.

```javascript
module.exports.getSetup = ({ chalk, context, currentOptions, data, debug, getSetupContext, inquirer, ora, setSetupContext }) => {
    return async () => {
        const answers = {};
        const { wpapiURL } = await inquirer.prompt([
            {
                type: 'input',
                name: 'wpapiURL',
                message: 'What is the root URL for your Wordpress API?',
                validate: (value) => (value.length > 0 ? true : 'The URL cannot be empty.'),
                default: currentOptions.wpapiURL
            }
        ]);
        answers.wpapiURL = wpapiURL;
        const spinner = ora('Verifying space...').start();
        try {
            let site = await WPAPI.discover(answers.wpapiURL);
        } catch (error) {
            spacesSpinner.fail();
            throw error;
        }
        spinner.succeed();
        return answers;
    };
};
```

Assuming everything succeeds, the user's answers are returned and Sourcebit will continue the setup process for additional plugins.

### The Second Part - Pulling and Normalizing Data

Once Sourcebit collects the information from the user during the interactive setup process, it generates a configuration file written in JavaScript. This configuration file supplies the information necessary to allow Sourcebit to collect content and data from the selected data sources. This happens when a `sourcebit fetch` is called via the command line or Sourcebit's `fetch()` method is called within the application code. In order for this to work, the plugin API provides two methods to pull the data and to normalize it to a format expected by Sourcebit.

However, it is first important to realize two things about these methods and the pulling data:

-   Sourcebit also calls both of these methods during the configuration process. This provides details that are used within other aspects of the configuration process. For instance, in order to properly configure a target plugin, Sourcebit needs to know the data models that the source plugin provides. Sourcebit also shows sample entries via the command-line to assist when mapping source content to a target. To do this, Sourcebit gets the data and holds it in memory.
-   To help prevent API overuse and even potential charges associated with that, Sourcebit caches data in a `.sourcebit.cache.json` file. This cache is written during the `fetch` process and retrieved from cache prior to subsequent calls. This functionality is enabled by default when `fetch` is executed with the `--watch` flag, or when `watch: true` is set in the `options` object. Alternatively, you can manually enable it with the `--cache` flag or by setting `cache: true` in `options`.

#### The `bootstrap` method

The [`bootstrap` method](https://github.com/stackbithq/sourcebit/wiki/Plugin-API#bootstrap-function) is executed during the configuration process, to get data models and sample data, and when the plugin starts during the fetch process, to pull content and data. As such, it is not required and may not exist for target or transformation plugins but would typically be necessary when creating a source plugin.

This method is also responsible for defining the logic necessary to enable the `--watch` flag to pull updated content from the API. This allows Sourcebit to provide the live updating functionality whereby changes made in a CMS are immediately reflected in the site.

The `bootstrap` method is provided the following parameters:

-   `log` is a function for writing log messages that may be visible by the user depending on their verbosity settings.
-   `debug` is a method for writing debug output to the console that are only visible when Sourcebit is being run in debug mode via the `--debug` flag.
-   `getPluginContext` is a function that gets the content and data available within Sourcebit for this plugin (i.e. entries pulled from the source plugin that may already exist in the cache).
-   `setPluginContext` is a function that allows you to overwrite the existing data stored by Sourcebit for this plugin (for example, if an entry was updated).
-   `options` is an object that contains:
    _ Configuration values set by the user during setup and stored in the main configuration file.
    _ Configuration values set by the user but stored in the `.env` file due to their private nature. \* Options passed when to `fetch` either via the command line or via code. This includes the `watch` flag that indicates that the plugin should watch for continue watching for changes in the source data.
-   `refresh` is a function called when changes are made to the data Sourcebit holds, such as when a change is detected during `watch`.

Let's look at the `bootstrap` method within the Wordpress plugin as an example (I'll explain the code following).

```javascript
module.exports.bootstrap = async ({ debug, getPluginContext, log, options, refresh, setPluginContext }) => {
    const context = getPluginContext();
    const site = await WPAPI.discover(options.wpapiURL);

    if (context && context.entries) {
        log(`Loaded ${context.entries.length} entries from cache`);
    } else {
        const posts = await site.posts();
        const pages = await site.pages();
        const entries = posts.concat(pages);
        const assets = await site.media();
        const fieldnames = ['title', 'content', 'excerpt', 'date', 'slug'];
        const models = [
            {
                id: 1,
                source: pkg.name,
                modelName: 'post',
                modelLabel: 'Posts',
                fieldNames: fieldnames,
                projectId: '',
                projectEnvironment: ''
            },
            {
                id: 2,
                source: pkg.name,
                modelName: 'page',
                modelLabel: 'Pages',
                fieldNames: fieldnames,
                projectId: '',
                projectEnvironment: ''
            }
        ];

        log(`Loaded ${entries.length} entries`);
        debug('Initial entries: %O', entries);

        setPluginContext({
            assets,
            entries,
            models
        });
    }

    if (options.watch) {
        setInterval(async () => {
            const { assets, entries } = getPluginContext();
            const posts = await site.posts();
            const pages = await site.pages();
            const allEntries = posts.concat(pages);
            const media = await site.media();
            let entryUpdateCompleted = false;

            // Handling updated assets.
            media.forEach((asset) => {
                const index = assets.findIndex((item) => item.id === asset.id);

                if (index !== -1) {
                    let newUpdateDate = new Date(asset.modified);
                    let lastUpdateDate = new Date(assets[index].modified);
                    if (newUpdateDate > lastUpdateDate) {
                        assets[index] = asset;
                        entryUpdateCompleted = true;
                    }
                }
            });
            // handling entry updates
            allEntries.forEach((entry) => {
                const index = entries.findIndex((item) => item.id === entry.id);

                if (index !== -1) {
                    let newUpdateDate = new Date(entry.modified);
                    let lastUpdateDate = new Date(entries[index].modified);
                    if (newUpdateDate > lastUpdateDate) {
                        entries[index] = entry;
                        entryUpdateCompleted = true;
                    }
                }
            });

            if (entryUpdateCompleted) {
                setPluginContext({ assets, entries });
                refresh();
                log(`Updated entries`);
            }
        }, 3000);
    }
};
```

The function begins by getting any data Sourcebit already has in cache via the `getPluginContext` function. Next, it gets the information for the Wordpress site from the API using the API URL provided during the configuration process. If entries exist in the cache, those entries are used and the code to get data from the API isn't run.

If entries do not exist, the relevant Wordpress APIs are called to get posts, pages and assets (or media, as Wordpress calls them). Pages and posts both represent entries from a Sourcebit perspective, so they are combined into one array while assets remain separate. In this example plugin, the properties available in entry (i.e. `fieldnames`) and the models are all manually created. In other sources this information may come from the API, however models should conform to a [specific data structure](https://github.com/stackbithq/sourcebit/wiki/Data-normalization#models). The models, entries and assets are then stored by Sourcebit using the `setPluginContext` function.

If the `watch` flag is enabled, we use `setInterval` to poll the API. The Wordpress API doesn't provide a means (that I am aware of, anyway) for checking if changes have been made as is provided by many headless CMS. Thus, the code loops through all the retrieved posts, pages and media and compares the last updated date with the record in the cache. If the API record is newer, it is overwritten in the cache using `setPluginContext` and `refresh` is called.

#### The `transform` method

The [`transform` method](https://github.com/stackbithq/sourcebit/wiki/Plugin-API#transform-function) is called after the `bootstrap` method and is all about normalizing data. Sourcebit expects entries and assets to have [certain baseline properties](https://github.com/stackbithq/sourcebit/wiki/Data-normalization#objects), but they can also contain any relevant data needed from the API (for example, data that might be converted to frontmatter properties). The `transform` method is where a transformation plugin might modify data in one of the [core data buckets](https://github.com/stackbithq/sourcebit/wiki/Anatomy-of-a-plugin#core-data-buckets) of files, models or objects. It is also where a target plugin might write files and save them to pass them to the files data bucket.

Let's look at the example in the Wordpress plugin.

```javascript
module.exports.transform = ({ data, debug, getPluginContext, log, options }) => {
    const { assets, entries, models } = getPluginContext();

    const normalizedPosts = entries.map((entry) => {
        const normalizedEntry = {
            source: pkg.name,
            id: entry.id,
            modelName: entry.type,
            modelLabel: entry.type.charAt(0).toUpperCase() + entry.type.slice(1) + 's',
            projectId: '',
            projectEnvironment: '',
            createdAt: entry.date,
            updatedAt: entry.modified
        };

        return {
            title: turndownService.turndown(entry.title.rendered),
            content: entry.content.rendered,
            excerpt: turndownService.turndown(entry.content.rendered),
            date: entry.date,
            slug: entry.slug,
            __metadata: normalizedEntry
        };
    });

    const normalizedAssets = assets.map((asset) => {
        const normalizedEntry = {
            source: pkg.name,
            id: asset.id,
            modelName: '__asset',
            modelLabel: 'Assets',
            projectId: '',
            projectEnvironment: '',
            createdAt: asset.date,
            updatedAt: asset.modified
        };

        return {
            title: turndownService.turndown(asset.title.rendered),
            contentType: asset.mime_type,
            fileName: asset.media_details.sizes.full.file,
            url: asset.media_details.sizes.full.source_url,
            __metadata: normalizedEntry
        };
    });

    const normalizedEntries = normalizedPosts.concat(normalizedAssets);

    return {
        ...data,
        models: data.models.concat(models),
        objects: data.objects.concat(normalizedEntries)
    };
};
```

While there are quite a few lines of code, as you can see it is primarily taking data received from the Wordpress API and putting it into data structures required for either assets or entries by Sourcebit. Both assets and entries are stored in the `objects` data bucket, so they are combined after normalization and the data object is returned.

## Testing a Plugin

Now that we've finished writing our plugin, how can we test it locally? Sourcebit provides a way of adding a local plugin to be used when running the interactive setup process. First, we need to create a JSON file that contains an array of objects representing the local plugin modules that we'd like to use. For example, the JSON to load my Wordpress on my local machine would be:

```javascript
[
    {
        module: '/Users/brianrinaldi/Documents/projects/sourcebit-source-wordpress',
        description: 'A Sourcebit plugin for Wordpress',
        author: 'Brian Rinaldi',
        type: 'source'
    }
];
```

The `module` is the local file path to the plugin. The `description` and `author` are both shown in the interactive setup process when choosing plugins to install. The `type` is either a `source`, `target` or `transform` depending on what kind of plugin you are creating.

Once this file is created, the plugin can be tested by providing a `--plugins` option to `npx create-sourcebit` where the value of `plugins` is the relative path to the JSON file created above.

```bash
npx create-sourcebit --plugins=./plugins.json
```

It is worth noting that the plugin runs off the local source and does not actually "install" in the current project. This means that any changes made will be immediately reflected.

After running through the configuration process, you may want to run the `fetch` process with debugging enabled. To do so, provide the plugin's namespace (defined in the plugin's `package.json`) to the `DEBUG` environment variable. For example, to run the Wordpress plugin with debugging enabled I would run:

```bash
DEBUG=plugin:sourcebit-source-wordpress sourcebit fetch
```

For more details on debugging [check the documentation](https://github.com/stackbithq/sourcebit/wiki/Debugging).

## Registering a Plugin

So you've created an awesome plugin and you want to share it with the community. While users can download the plugin and run it locally as shown above, it'd be better if it was a default option within the interactive setup process. This is done by adding your plugin to [Sourcebit's plugin registry](https://github.com/stackbithq/sourcebit/wiki/Plugin-registry).

The plugin registry requires the same information shown in the JSON file above. One important note is that the plugin namespace should follow the pattern used by other plugins such as `sourcebit-source-contentful`, `sourcebit-transform-assets` or `sourcebit-target-hugo`. The namespace should start with `sourcebit` then describe the type of plugin (source, transform or target) and finally what the plugin handles (for example, Contentful content, site assets or the Hugo static site generator).

When you think the plugin is ready, you can [add it to the registry file](https://github.com/stackbithq/create-sourcebit/blob/master/plugins.json) and submit a pull request.

## We Can't Wait to See What You Create!

The JAMstack ecosystem has so many amazing options for developers. There are countless headless CMS for content, data stores or APIs for data, and numerous SSGs. That's why Sourcebit was designed to be extensible - so that the community could expand the capabilities of the tool to support whatever SSG, CMS or data source they use or love. Hopefully this tutorial gives you the guidance you need to create your own plugin and share it with the JAMstack community.
