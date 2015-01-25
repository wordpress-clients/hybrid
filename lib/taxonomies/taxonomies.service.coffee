module.exports = ($log, $filter) ->
    $log.info '$WPHCTaxonomies'

    getTitle: (term, slug) ->
        trans = ''
        switch term
            when "post_tag"
                trans = if slug then 'taxonomie.tag.title' else 'taxonomie.tags.title'
            when "category"
                trans = if slug then 'taxonomie.category.title' else 'taxonomie.categories.title'
        $log.debug trans, term, '$WPHCTaxonomies getTitle'

        if slug
            $filter('translate') trans,
                name: slug
        else
            $filter('translate') trans
