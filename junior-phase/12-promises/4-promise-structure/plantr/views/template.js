const html = require('html-template-tag')

module.exports = content => html`
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PLANTR</title>
    <link rel="stylesheet" href="/styles/bulma.min.css">
</head>

<body>
    <section class="hero is-primary is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    <a href="/">Plantr</a>
                </h1>
                <h2 class="subtitle">
                    Plant Your Dreams
                </h2>
            </div>
        </div>
    </section>
    $${content}
</body>

</html>
`
