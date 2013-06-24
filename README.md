# Passport-Freshbooks

[Passport](http://passportjs.org/) strategy for authenticating with [Freshbooks](http://www.freshbooks.com/)
using the OAuth 1.0a API.

This module lets you authenticate using Freshbooks in your Node.js applications.
By plugging into Passport, Freshbooks authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

This module is a straight copy/paste from Jared Hanson's excellent [Passport LinkedIn](https://github.com/jaredhanson/passport-linkedin) module.

LinkedIn and Freshbooks both use oAuth1.0a so it seemed like a good place to start.

## Install

    $ npm install passport-freshbooks

## Usage

#### Configure Strategy

The Freshbooks authentication strategy authenticates users using a Freshbooks
account and OAuth tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a consumer key, consumer secret, and callback URL.

    passport.use(new FreshbooksStrategy({
        consumerKey: LINKEDIN_API_KEY,
        consumerSecret: LINKEDIN_SECRET_KEY,
        callbackURL: "http://127.0.0.1:3000/auth/freshbooks/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ freshbooksId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'freshbooks'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/freshbooks',
      passport.authenticate('freshbooks'));
    
    app.get('/auth/freshbooks/callback', 
      passport.authenticate('freshbooks', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

#### Extended Permissions

If you need extended permissions from the user, the permissions can be requested
via the `scope` option to `passport.authenticate()`.

For example, this authorization requests permission to the user's basic profile
and email address:

    app.get('/auth/freshbooks',
      passport.authenticate('freshbooks', { scope: ['r_basicprofile', 'r_emailaddress'] }));

#### Profile Fields

The Freshbooks profile is very rich, and may contain a lot of information.  The
strategy can be configured with a `profileFields` parameter which specifies a
list of fields your application needs.  For example, to fetch the user's ID, name,
email address, and headline, configure strategy like this.

    passport.use(new FreshbooksStrategy({
        // clientID, clientSecret and callbackURL
        profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
      },
      // verify callback
    ));

## Examples

For a complete, working example, refer to the [login example](https://github.com/MichaelJCole/passport-freshbooks/tree/master/examples/login).

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/MichaelJCole/passport-freshbooks.png)](http://travis-ci.org/MichaelJCole/passport-freshbooks)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
