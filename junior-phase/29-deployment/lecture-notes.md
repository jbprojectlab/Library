## what does it mean to deploy?

Put it out there for the world to access! Published. Accessible from any web browser connected to the internet ANYWHERE.

One thing we won't cover today: domain name registration / hosting.

## how?

We are going to use a tool / service called heroku. Heroku will take any code you give it and run that code. Heroku will start a server for us and will provide a web-accessible link to that server.

To setup:

- Create an account with heroku
- Download and install the heroku command line tool

For each project:

- Create a new application (in the heroku web dashboard, e.g.)
- Link to it via git: e.g. `heroku git:remote -a auther-1807-fsa-rm`
- Setup the heroku "dyno" (machine), in the web dashboard, add the Heroku Postgres add-on
- Change our source code to use our production database URL (that Heroku Postgres gives to us), `process.env.DATABASE_URL` (if it exists)
- Change our source code to use our heroku assigned port, `process.env.PORT` (if it exists)
- Update other things that are specific to development versus production (e.g. OAuth client configurations in the relevant dev account)
- After each change to the app (after committing) `git push heroku master`
- And it'd be nice if we didn't have to have webpack bundling our code in production, it'd be nice if we could build the bundle locally in development, then send the bundle.js to heroku when we deploy
- When deploying, we can make sure `bundle.js` comes along for the ride by doing `git add -f path/to/bundle.js` (assuming it is ignored) on a separate branch, then `commit` and `push` (`git push heroku temp-deploy-branch:master`)

Tips, tricks, useful commands...

- You can connect to your production DB from postico, you can also update it!
- `heroku logs --tail` (needs to be executed from the project folder root) to see the server logs
- `heroku run bash` to interact directly with the heroku dyno on your command line (e.g. if you want to seed your production database)
