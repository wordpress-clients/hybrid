
import { ListPage } from './list/list';
// import { AuthorPage } from './author/author';
import { ParamsPage } from './params/params';
// import { AuthorsPage } from './authors/authors';
import { BookmarksPage } from './bookmarks/bookmarks';
// import { TaxonomiesPage } from './taxonomies/taxonomies';
// import { CustomPostPage } from './custom-post/custom-post';
// import { CustomPostsPage } from './custom-posts/custom-posts';
import { TaxonomiesModal } from './taxonomies-modal/taxonomies-modal';

export const MenuMapping = {
    list: ListPage,
    params: ParamsPage,
    // author: AuthorPage,
    // authors: AuthorsPage,
    // taxonomy: TaxonomyPage,
    bookmarks: BookmarksPage,
    // taxonomies: TaxonomiesPage,
    // customPost: CustomPostPage,
    // customPosts: CustomPostsPage,
}

export const DeepLinkerLnks = [
    { component: ListPage, name: 'List', segment: 'list/:type' },
    { component: ListPage, name: 'List', segment: 'list/:type/:params' },
    // { component: AuthorsPage, name: 'Authors', segment: 'authors' },
    { component: ParamsPage, name: 'Settings', segment: 'settings' },
    // { component: AuthorPage, name: 'Author', segment: 'authors/:id' },
    { component: BookmarksPage, name: 'Bookmarks', segment: 'bookmarks' },
    // { component: CustomPostsPage, name: 'Custom Posts', segment: 'customPosts/:slug' },
    // { component: CustomPostPage, name: 'Custom Post', segment: 'customPosts/:slug/:id' },
    // { component: TaxonomyPage, name: 'Taxonomy', segment: 'taxonomies/:term/:postType/:id' },
    // { component: TaxonomiesPage, name: 'Taxonomies', segment: 'taxonomies/:term/:postType' },
]

export const PAGES = [
    ListPage,
    // AuthorPage,
    ParamsPage,
    // AuthorsPage,
    BookmarksPage,
    // TaxonomiesPage,
    // CustomPostPage,
    // CustomPostsPage,
    TaxonomiesModal,
];