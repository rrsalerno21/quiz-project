# Random Quiz Project

 This is a web app game that features dynamically updated HTML and CSS powered by JavaScript code.  It asks the user a series of questions in random order that they have to answer in 60 seconds or less.  The user gets a point if they answer correctly.  If a question is answered incorrectly, the timer loses 10 seconds.  Deployed at [https://rrsalerno21.github.io/quiz-project/](https://rrsalerno21.github.io/quiz-project/)


## Technologies Used
HTML, CSS, and Javascript/jQuery

## What I Learned
Rather than use modules, I used a single javascript file (script.js) on two separate html files (index.html and scores.html). To do this, I first gave my body tags on each html file unique `data-title` attributes.  Then inside scriptt.js, I used two `if` statements to only execute the appropriate html file's code if the body tag contains that `data-title`.

Ex: 
```javascript
if ($('body').data('title') === 'quiz-page') {
    // Execute appropriate code for index.html
}

if ($('body').data('title') === 'high-scores-page') {
    // Execute appropriate code for scores.html
}
```

I'd never done this before, so I found it interesting.  I know that using modules is much better in practice, but I wanted to see if this was possible on a smaller web app without too much code.

## License
Source code is licensed under the MIT license.

Contents of this site are © Copyright 2020 Robert Salerno. All rights reserved.
