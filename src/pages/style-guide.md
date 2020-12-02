---
title: Style Guide
template: page
subtitle: The style guide provides you with a blueprint of default post and page styles.
---

A paragraph is the basic block of Markdown. Paragraphs are separated by a blank line.

## Headings

There are six levels of headings. They correspond with the six levels of HTML headings. You've probably noticed them already in the page. Each level down uses one more hash character. In fringilla dui nec dolor sollicitudin, et scelerisque elit pellentesque. Integer vestibulum viverra sem, vel ornare nibh. Proin lobortis elit nunc, ut consequat elit vulputate sit amet.

# Heading 1

Proin ornare varius quam a tempor. Quisque fringilla urna ante, a fringilla tortor congue sed. Fusce dignissim facilisis urna sit amet rhoncus. In fringilla dui nec dolor sollicitudin, et scelerisque elit pellentesque. Integer vestibulum viverra sem, vel ornare nibh. Proin lobortis elit nunc, ut consequat elit vulputate sit amet.

## Heading 2

Aenean blandit convallis velit, et ullamcorper dolor fermentum at. Pellentesque scelerisque condimentum purus. Nam vitae iaculis lectus, ut faucibus lacus. In fringilla dui nec dolor sollicitudin, et scelerisque elit pellentesque. Integer vestibulum viverra sem, vel ornare nibh. Proin lobortis elit nunc, ut consequat elit vulputate sit amet.

### Heading 3

Sed ipsum nisi, bibendum eu maximus quis, tristique in massa. Duis vitae laoreet enim, efficitur posuere neque. Vivamus non odio eget urna accumsan sodales id vitae sapien. In fringilla dui nec dolor sollicitudin, et scelerisque elit pellentesque. Integer vestibulum viverra sem, vel ornare nibh. Proin lobortis elit nunc, ut consequat elit vulputate sit amet.

#### Heading 4

Mauris rutrum interdum metus. Donec ac lobortis orci, nec volutpat velit. Curabitur ante eros, fermentum id ligula et, porta pretium velit. In fringilla dui nec dolor sollicitudin, et scelerisque elit pellentesque. Integer vestibulum viverra sem, vel ornare nibh. Proin lobortis elit nunc, ut consequat elit vulputate sit amet.

##### Heading 5

Curabitur pellentesque facilisis orci, ut rhoncus nulla scelerisque ac. Integer in magna vel justo venenatis ornare vitae vel sem.

###### Heading 6

Nulla tempus tortor nec nunc volutpat commodo. Vivamus efficitur imperdiet velit sagittis pellentesque. In fringilla dui nec dolor sollicitudin, et scelerisque elit pellentesque. Integer vestibulum viverra sem, vel ornare nibh. Proin lobortis elit nunc, ut consequat elit vulputate sit amet.

## Emphasis

**This is bold text**

_This is italic text_

~~Strikethrough~~

## Links

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

## Lists

Here is an unordered list of items, typically rendered as a bulleted list:

-   first item
-   second item
-   third item

Here is an ordered list of items, typically rendered as a numbered list:

1. first item
2. second item
3. third item

## Blockquotes

> Here is a blockquote. What this is should be self explanatory. Blockquotes are automatically indented when they are used.

> Blockquotes can also span multiple paragraphs, if you like.
>
> Here's the second paragraph.
> <cite>Author</cite>

## Horizontal Rule

---

## Code Blocks

Blocks of code are fenced by lines with three back-ticks.

```javascript
var s = 'JavaScript syntax highlighting';
alert(s);
```

```yml
sass:
    input_file: sass/main.scss.njk
    output_file: assets/css/main.css
    indentWidth: 4
    outputStyle: nested
    precision: 10
```

```
No language indicated, so no syntax highlighting.
```

Inline `code` has `back-ticks around` it.

## Tables

| Title | Title |
| ----- | ----- |
| Text  | Text  |
| Text  | Text  |

## Forms

<form name='contactForm' method='POST' id='contact-form' class='contact-form'>
  <p class="screen-reader-text">
        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
      </p>
      <p class="form-row">
        <label class="form-label">Name <span class="required">(required)</span></label>
        <input type="text" name="name" placeholder="Your name..." class="form-input">
      </p>
      <p class="form-row">
        <label class="form-label">Email <span class="required">(required)</span></label>
        <input type="email" name="email" placeholder="Your email address..." class="form-input">
      </p>
      <p class="form-row">
        <label class="form-label">Subject</label>
        <select name="subject">
          <option value="leader">General</option>
          <option value="follower">Supprt</option>
        </select>
      </p>
      <p class="form-row">
        <label class="form-label">Message <span class="required">(required)</span></label>
        <textarea name="message" placeholder="Your message..." class="form-textarea" rows="7"></textarea>
      </p>
      <input type="hidden" name="form-name" value="contactForm" />
      <p class="form-row">
        <button type="submit" class="button">Send Message</button>
      </p>
      <p class="form-row">
        <button type="submit" class="button secondary">Send Message</button>
      </p>
</form>

## Buttons

<a href="#" class="button">Send Message</a>

<a href="#" class="button secondary">Send Message</a>
