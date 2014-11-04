Changing the request link
----
Once you change the URL pointing to the projects from `links.com` in `main.js` to another URL, you should also do the same change in the `permission` section of `package.json` to allow requests to that URL. Otherwise Firefox will block your request and will return an error object instead of the data you wanted. It's not necessary to also specify the port, the domain is enough.
