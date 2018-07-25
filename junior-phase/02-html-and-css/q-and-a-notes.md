## carousel

Combination of the following HTML:

```html
<!-- ... -->
<section id="carousel">
  <div id="carousel-text">
    <h1>Aviatto: Travelling for a better world</h1>
    <h2>Learn More</h2>
  </div>
  <img class="carousel-image" src="images/bg/mountains.jpg" />
  <img class="carousel-image hidden" src="images/bg/city.jpg" />
  <img class="carousel-image hidden" src="images/bg/underwater.jpg" />
  <img class="carousel-image hidden" src="images/bg/brightsun.jpg" />
</section>
<!-- ... -->
```

The following CSS: 

```css
/* ... */
#carousel .carousel-image {
  /* ... */
  transition: opacity 1s;
}
/* ... */
.hidden {
  opacity: 0;
}
/* ... */
```

And the following JS:

```js
// ...
const carouselImages = document.getElementsByClassName('carousel-image');
let currentlyVisibleIndex = 0;
setInterval(function () {
  // set current to hidden
  carouselImages[currentlyVisibleIndex].classList.add('hidden');
  // increment index
  currentlyVisibleIndex = (currentlyVisibleIndex + 1) % carouselImages.length;
  // set the new current to not hidden
  carouselImages[currentlyVisibleIndex].classList.remove('hidden');
}, 5000);
// ...
```

## using flexbox anywhere / everywhere?

My opinion of a safe default: yes.

On the other hand, some times when you wouldn't want to use it...

- Is relatively young, so somewhat less table, and might have unexpected interactions with other existing web development tools
- Not helpful for shapes, charts, copmlicated graphics (instead consider looking into SVG)
- If you're using flexbox with exact-sized containers / items, might not work well for dynamic content—text alignment / flowing is not a good use case for flexbox
- Not supported by (some) browsers / devices (check caniuse.com)
- Not necessarily the best for grids (instead consider `grid`)

## using `em`s anywhere / everywhere?

Use them where you want the size of the thing to be tightly coupled with the font size of the thing.

## `calc`

Especially useful for determining spacing / alignment that has heteregenous units involved. For example, you might have navbar whose height is dependent on its parent but also on the font size.

## `border-box`

You can set the `box-sizing` property to `border-box` which will mean that the element's height and width INCLUDE its padding and border.

## pair programming feedback

In each workshop in learndot, the last action (hero) should have a feedback section about the workshop and pairing.
