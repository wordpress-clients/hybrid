module.exports = angular.module('wordpress-hybrid-client.taxonomies').factory '$WPHCTaxonomies', ($log, $filter) ->
    $log.info '$WPHCTaxonomies'

    getTitle: (term, slug) ->
        trans = ''
        switch term
            when "post_tag"
                trans = if slug then 'title.tag' else 'title.tags'
            when "category"
                trans = if slug then 'title.category' else 'title.categories'
        $log.debug trans, term, '$WPHCTaxonomies getTitle'

        if slug
            $filter('translate') trans,
                name: slug
        else
            $filter('translate') trans
