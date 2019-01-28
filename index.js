const fetch = require('isomorphic-unfetch');

module.exports = {
    getPostUrls: async function(apiEndpointUrl, beforeSlug, afterSlug, nextJsPageName, queryParameters){
        
        const request = await fetch(apiEndpointUrl);
        const postList = await request.json();

        const nextPages = postList.reduce(
            (pages, post) => {

                const prePath = (beforeSlug.length > 0) ? `${beforeSlug}/` : '';
                const postPath = (afterSlug.length > 0) ? `/${afterSlug}` : '';
                let frontendUrl = `${prePath}${post.slug}${postPath}`;
                
                let query = {};

                queryParameters.forEach(item => {
                    let keyName = item[0];
                    let value = item[1].split('.').reduce((o,i)=>o[i], post);
                    query[keyName] = value;
                });

                
                let route =  Object.assign({}, pages, {
                    [frontendUrl]: {
                      page: `/${nextJsPageName}`,
                      query
                    }
                  })

                return route;
            },
            {}
          );

        return nextPages;
    },

    combineRoutes: function(items){
        return Object.assign({}, ...items);
    }
}