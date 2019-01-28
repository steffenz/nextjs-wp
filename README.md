# NextJS WordPress toolkit
The purpose for this package is simply to create a tiny swiss army knife for projects using WordPress together with NextJS.

## Usage
To generate routes from WordPress in your NextJS application, start with creating a ``next.config.js`` file at the root of your project.

Updated: Added support for parameters. These must be passed as an array (you can use dot syntax to get nested fields, from ACF for example. Check the code below for more information).

Here's an example (hope you like burgers):

```javascript

const wp = require('nextjs-wp');

module.exports = {
    async exportPathMap(){

        /* URL to WordPress */
        let url = 'https://wordpress.site/wp-json/wp/v2/hamburgers';

        /* Points /burgers/wp-slug/ to our burgers.js page */
        const allBurgers = await wp.getPostUrl(url, 'burgers', [['id', 'id'], ['sauce', 'acf.sauce']], 'burgers');

        /* Points /burgers/wp-slug/details to our details.js page */
        const burgerDetails = await wp.getPostUrl(url, 'details', [['id', 'id']], 'burgers/details');

        /* Some other pages we defined manually */
        const otherPages = {
            '/': { page: '/'},
            '/chilicheese' : { page: '/secret'},
        }

        /* Combining everything */
        return wp.combineRoutes([
            ourBurgers,
            burgerDetails,
            otherPages
        ]);

    }
}

```