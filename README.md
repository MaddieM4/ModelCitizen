ModelCitizen
============

Survey software framework written in Javascript.

## Philosophy and design

There are crazy design requirements out there - I've seen them. Traditional survey software cannot predict, or adequately provide for, the wide variety of downstream demands. The best ones offer opportunities for customization via JavaScript, but this is a second-class citizen - clunky, and poorly integrated with the "friendly" primary interface.

The truth is that for nontrivial survey requirements, you're not just plugging someone else's components together in a way *they* expected you to. You're programming a special-purpose application, where nobody knows your needs better than *you* do. If your survey software's limitations are imposing design restrictions on you, it is your survey software that is in the wrong.

That's why ModelCitizen is a framework for creating surveys.

 * For programmers - it's all just JavaScript, no automation-killing web UI. Your text editor is your greatest weapon, and you know it.
 * Simple - lots of little pieces, each of which is trivial to get your head around. Easy to write your own, when you need to.
 * Flexible - when the stock components ain't cuttin' it, you have the freedom to push forward.
 * Construction is customization - your needs are never second-class citizens, because the whole system works by one mechanic... *build things the way you need them.*


This manifests a lot of benefits, for example, in decoupling:

 * Your UI doesn't impose any specific restrictions or structure on your response data, just conventions.
 * Your response data format doesn't impose any restrictions or structure on your data visualization. Build the charts however you want.
 * You might have inferred this from the previous two points, but your result visualization is totally untied from your survey UI.

...but also general code quality.

 * Develop reusable components. Then reuse them, duh.
 * Go beyond automation - set up similar questions or answer sets procedurally, using for loops and arrays and whatnot.
 * Wrappers and convenience functions. Not every survey is an engineering tour de force - easy stuff should be easy. So we make it easy to write easy-ifiers, and provide some of our own.

## Current status

Barely started development. Like, don't even bother trying to use this, there's like an eight of a skeleton and nothing else.

Thanks for the interest though! I love you, $person->{name}, we should hang out.

## How to run

1. Install node.js
2. cd srv
3. npm install # Get dependencies
4. node index.js # Run server on port 3000
