## what is curl used for?

What is `curl`? Command line tool that can make HTTP requests.

A couple examples:

- You've got a bare-bones unix OS with ONLY a command line and you want to test out some site
- Shows you more information than a browser window (e.g. headers)
- Command line scripts, e.g. you might use curl here to make requests to GitHub every 60 seconds to check if it's down
- You like the command line
- Some install instructions will include executing a curl command (to download the thing-to-install)

## what is a POST request?

When you type someting into your address bar, your browser is ALWAYS going to make a GET request.

POST requests *could* be triggered by form submissions or input changes on a web page. The only way you know right now to make POST request is through curl.
