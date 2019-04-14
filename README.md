# Shortlink
I saw Google's go/ URLs, thought they were really cool, and decided I needed a local shortlinking service as well. So instead of using a premade one, I wrote this in really bad jQuery, because why not?

# Setup
To use shortlink, make sure there is an `uwu.json` file containing just the text `{}`. Then, run the index.js script with `node index.js`. This script currently relies on the hostname `i` resolving to localhost, which can be edited in your `/etc/hosts`. In the next version there will be built-in support for whatever hostname you reach Shortlink on.

# Screenshot
![Screenshot of Shortlink](https://ungato.tk/uwu.png)
