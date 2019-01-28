# NextJS WordPress toolkit
The purpose for this package is simply to create a tiny swiss army knife for projects using WordPress together with NextJS.

## Usage
To generate routes from WordPress in your NextJS application, start with creating a ``next.config.js`` file at the root of your project.

Here's an example (hope you like burgers):

```javascript

const wp = require('nextjs-wp');

module.exports = {
    async exportPathMap(){

        const ourBurgers = await wp.getPostUrls(
            'https://wordpress.site/wp-json/wp/v2/hamburgers',
            'burgers', 
            '', 
            'burgers', 
            []
        );


        const burgerDetails = await wp.getPostUrls(
            'https://wordpress.site/wp-json/wp/v2/hamburgers',
            'burgers', 
            'details', 
            'details', 
            []
        );

        const otherPages = {
            '/': { page: '/'},
            '/chilicheese' : { page: '/secret'}
        }

        return wp.combineRoutes([
            ourBurgers,
            burgerDetails,
            otherPages
        ]);

    }
}

```