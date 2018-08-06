const html = require('html-template-tag')
const template = require('./template')

module.exports = gardener =>
    template(html`
    <section class="section">
        <div class="container">
            <h1 class="title">${gardener.name}</h1>

            <p class="subtitle">Their favorite vegetable is ${gardener.favorite_vegetable.name}</p>

            <h2 class="subtitle">${gardener.name}'s Plot (size: ${gardener.plot.size} ft<sup>2</sup>)</h2>

            <ul class="box">
                ${gardener.plot.vegetables.map(vegetable => html`
                  <li>${vegetable.name} (${vegetable.color})</li>
                `)}
            </ul>
        </div>
    </section>
`)
