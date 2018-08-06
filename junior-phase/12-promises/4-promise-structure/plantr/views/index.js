const html = require('html-template-tag')
const template = require('./template')

module.exports = gardeners =>
    template(html`
    <section class="section">
        <div class="container">
            <h1 class="title">Gardeners</h1>
            <ul>
                ${gardeners.map(
                    gardener => html`
                    <li>
                        <a href="/gardeners/${gardener.id}">${gardener.name}</a>
                    </li>
                    `
                )}
            </ul>
        </div>
    </section>
    `)
