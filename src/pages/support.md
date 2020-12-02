---
title: Support & FAQ
subtitle: |
  Have a Question? We're here to help.
show_header: true
show_footer_cta: false
sections:
  - component: Text
    bg_color: light
    actions: []
    bg_pattern: none
    type: text
    section_id: text1
    content: >
      We want to make sure that you're successful with Stackbit. Take a look at
      the FAQ below for answers to some common questions. 


      Don't see your question answered?

      [Check the docs](https://docs.stackbit.com) or [contact support via
      email](mailto:support@stackbit.com).
    title: We've Got You
  - bg_color: none
    title: FAQ
    section_id: faq
    component: Faq
    type: faq
    faq_items:
      - question: How do I navigate to edit another page in Studio?
        answer: >-
          Locate the green "Edit" button from within Stackbit Studio.


          ![edit button in Stackbit Studio](/images/support/edit-button-sm.png)


          Click the button to disable edit mode and then navigate to the page by
          clicking links on your site. Once you are at the page you wish to
          edit, click "Edit" again to re-enable edit mode.

          Alternatively, you can append a `uri` variable to the URL of the
          Studio in your browser's address bar. For example. `?uri=/about` would
          edit the about page while `?uri=/blog/post-4/` would edit the blog
          post with the slug of `post-4`.
      - question: How do I delete a page using Stackbit Studio?
        answer: >-
          We're working on adding the ability to directly delete pages from
          within the Studio editor. Until then, here are the steps to delete an
          existing page depending on what type of CMS you are using:


          **Deleting a page for sites using Git as a CMS**

          1. Go to the GitHub repository for your project.

          2. Switch the branch from `master` to `preview` (for more details on
          why the `preview` branch, see this [documentation
          page](https://docs.stackbit.com/using-stackbit/local-development/#working_with_git_cms_projects))

          3. Navigate to the page you want to remove within the site source  and
          click the trash can icon (i.e. delete this file)
              
              ![delete a file in GitHub](/images/support/delete-file-sm.png)

          4. Commit your change.
              
              ![commit file delete into GitHub](/images/support/commit-changes-sm.png)

          5. Once the change is picked up by Stackbit, the page should now be
          removed from your site preview within Stackbit Studio. Click the
          publish button when you are ready for your changes to go live.


          Alternatively, if you have your project cloned locally, you can remove
          the page and check it in this way. Be sure that you have the `preview`
          branch checked out locally.


          **Deleting a page for sites using an API-based CMS (ex. Sanity,
          Contentful)**

          1. Go to the CMS editor for your site's content (if you don't know the
          URL, the link should be within the settings window inside Stackbit
          Studio).

          2. Navigate to the page you would like to remove in the CMS and delete
          it.

          3. The page should now be removed from both the Stackbit Studio
          preview and, once your project is redeployed on Netlify, on the live
          site.
      - question: Can I customize the layout of my site? How?
        answer: >-
          Yes. The site is yours to customize as you wish. The best way to begin
          customizing is to clone your site locally. You can locate instructions
          on how to run your site locally in the `readme.md` file or via the
          instructions in the Studio's "Developer Tools" panel.


          ![Developer Tools in the Stackbit
          Studio](/images/support/developer-tools-sm.png)
      - question: How do I install and edit my project locally?
        answer: >-
          For projects that work within the Stackbit Studio, instructions for
          installing your project locally can be found within the Studio's
          "Developer Tools" panel.


          ![Developer Tools in the Stackbit
          Studio](/images/support/developer-tools-sm.png)


          Alternatively, the instructions for running your project locally can
          be found in the project's `readme.md` file.
      - question: Why are my edits not showing up in the Studio preview?
        answer: >-
          In most cases, this occurs on projects using Git as a CMS and is due
          to changes being made to the `master` branch but not the `preview`
          branch. The most efficient way to solve this is to merge any changes
          that have been made to `master` into the `preview` branch.


          ``` git checkout preview

          git merge master ```


          It is recommended that you make edits directly to the `preview`
          branch. These will be pushed to `master` - along with your content
          changes - when you click publish in the Studio.


          If this fails to resolve your issue or the issue you are encountering
          is different from the one described above, please [contact
          support](mailto:support@stackbit.com).
      - question: >-
          I am getting an error when trying to run my project locally? It says
          my project is missing site-metadata.json.
        answer: >-
          Usually this error means that there's a setup error between Stackbit
          and an API-based CMS like Contentful or Sanity. Typically, this is the
          result of the Stackbit API key not being set or being incorrectly set.


          To see what value is set for `STACKBIT_API_KEY` environment variable,
          run `printenv STACKBIT_API_KEY` from the terminal/command-line. The
          value should only contain letters and numbers and should _not_ contain
          the curly brackets (i.e. `{` and `}`).


          Another option is to run `npx @stackbit/stackbit-pull`, which pulls
          the content locally from the API-based CMS, with your Stackbit API key
          appended via the `--stackbit-api-key=` paremeter.


          Once the content is properly pulled, you should be able to run your
          site locally without errors.


          If this fails to resolve your issue or the issue you are encountering
          is different from the one described above, please [contact
          support](mailto:support@stackbit.com).
      - question: >-
          I'm getting a permission denied error when trying to clone my GitHub
          repository locally. How do I fix this?
        answer: >-
          The most frequent cause this error is that you have two-factor
          authentication (2FA) enabled on your GitHub account. GitHub accounts
          with 2FA enabled require a Personal Access Token as the password when
          authenticating via the terminal/command line. For more information on
          how to create a Personal Access Token, follow [GitHub's
          instructions](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
      - question: How do I get my current project to work with editing in the Studio?
        answer: >-
          Currently, Studio is supported on all projects created using the
          [Stackbit Site Builder](https://app.stackbit.com/create). Automated
          support for custom projects is coming soon. However, if you have a
          specific project you'd like to discuss enabling in the Studio, please
          [contact us](mailto:hello@stackbit.com).
      - question: >-
          I made changes to the content model of my site and now it isn't
          working. What do I need to do?
        answer: >-
          Every Stackbit project requires a `stackbit.yaml` configuration file.
          This file maps out the content coming from the headless CMS to the
          content on the site and vice versa. In some cases, content types or
          properties may be added to your project that are not already mapped in
          the `stackbit.yaml`. In these cases, you'll need to update the
          `stackbit.yaml` file with content model definitions for these changes
          or additions. Please refer to the [`stackbit.yaml`
          documentation](https://docs.stackbit.com/custom-themes/stackbit-yaml/)
          for details on how this works.
      - question: I can't access the GitHub project for my new site. What can I do?
        answer: >-
          In some cases, Stackbit does not have or request advanced GitHub
          permissions. This is done for security purposes to avoid requesting
          intrusive permissions on user's GitHub accounts. In these cases,
          Stackbit will initially generate a project under a Stackbit owned
          GitHub account (i.e.`stackbit_projects`) and then initiate a transfer
          of the repository to your GitHub account. You should receive an email
          from GitHub informing you of the transfer and requesting your
          acceptance.


          If you did not receive the email, please, first, verify that it did
          not get caught in spam. If you are still unable to locate the email
          [contact support](mailto:support@stackbit.com) to have the transfer
          re-initiated.
      - question: Where can I change the email on my account?
        answer: >-
          Please [contact support](mailto:support@stackbit.com) to request an
          email change while we work on adding the ability to change your email
          address within the account settings.
      - question: Is Stackbit Free?
        answer: >-
          The basic Stackbit Site Builder and Studio are free for developers who
          bring their own source control and hosting accounts like Github and
          Netlify. We are firm believers in an open web so we're always going to
          keep a free version of Stackbit for non-commercial websites. That
          being said, we are currently in the process of rolling out pricing for
          companies that need more business-oriented solutions or upgraded
          versions of our free features, and for the "No Code" crowd —
          marketers, content creators and individuals who want to create
          Jamstack sites without worrying about hosting, repositories and other
          developer-related accounts. Worry not, your current free projects will
          remain free with all their features even after we introduce our
          pricing structure.
      - question: What is the pricing of Stackbit going to be?
        answer: >-
          We're currently working on introducing pricing for certain user tiers
          and use cases, such as businesses that need more robust versions of
          our tools and features, or marketers who need an easy way to create
          Jamstack sites and landing pages without the help of a developer.
          However, we'll always offer a free plan for personal websites in
          support of a modern, open web. If you're currently working on a free
          project, your site will remain free with all existing features, even
          when we finish introducing our pricing.
      - question: What CMS and static site generators are supported in Studio?
        answer: >-
          We are continuing to expand support for headless CMS and static site
          generators in Stackbit Studio. Currently, the following options are
          supported:


          Supported SSG:

          * Next.js

          * Gatsby

          * Hugo

          * Jekyll


          Supported CMS 

          * Sanity.io

          * Contentful

          * Git
      - question: >-
          My favorite static site generator is not supported. When will you be
          adding support for it?
        answer: >-
          We are always workng on expanding support for new tools in Stackbit
          and the Stackbit Studio. Our current SSG roadmap includes Hugo and
          Jekyll support in the Stackbit Studio. We are also exploring 11ty
          support in the site builder and potentially Stackbit Studio. If you
          have a specific project you'd like to discuss that requires SSG
          support we do not currently have, [let us know](hello@stackbit.com).
      - question: >-
          My favorite CMS is not supported. When will you be adding support for
          it?
        answer: >-
          We are always workng on expanding support for new tools in Stackbit
          and the Stackbit Studio. Our current SSG roadmap includes Kentico
          Kontent support. We are also exploring other possible additions. If
          you have a specific project you'd like to discuss that requires SSG
          support we do not currently have, [let us know](hello@stackbit.com).
      - question: >-
          My favorite deployment option is not supported. When will you be
          adding support for it?
        answer: >-
          We are always workng on expanding support for new tools in Stackbit
          and the Stackbit Studio. Our current deployment option roadmap
          includes Azure and Vercel support. We are also exploring the
          possibility of supporting AWS Amplify. If you have a specific project
          you'd like to discuss that requires SSG support we do not currently
          have, [let us know](hello@stackbit.com).
template: custom
meta_title: Stackbit Support
meta_description: >-
  Answers to common questions about Stackbit and channels for additional
  support.
---
