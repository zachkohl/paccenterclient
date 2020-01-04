# paccenterclient

The nextJS application that houses the react client for PACcenter

# Notes

Favicon generator: https://favicon.io/emoji-favicons/water-wave/

Authentication ideas:

Auth0 appears to being going back to cookie based authentication, which defeats most of the reason for using them.
https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/

Article on authentication: https://jasonraimondi.com/posts/secure-a-next-js-application-with-jwt-and-a-private-route-higher-order-component/

Plan is to implement cookie based authentication the same way as the the other apps, this will be used
to secure specific pages.

During this login process, a simulatuous login will be conducted with a seperate server connected to the same
database(s). This second server will run the socket.io

https://dev.to/tesh254/environment-variables-from-env-file-in-nextjs-570b
