// Item
import { ItemPostsPage } from '../../src/pages/item/item-post';
import { ItemPagesPage } from '../../src/pages/item/item-page';
// List
import { ListPostsPage } from '../../src/pages/list/list-posts';
import { ListPagesPage } from '../../src/pages/list/list-pages';
import { ListCategoriesPage } from '../../src/pages/list/list-categories';
import { ListCategoryPage } from '../../src/pages/list/list-category';
import { ListTagsPage } from '../../src/pages/list/list-tags';
import { ListTagPage } from '../../src/pages/list/list-tag';
import { ListAuthorsPage } from '../../src/pages/list/list-authors';
import { ListAuthorPage } from '../../src/pages/list/list-author';
// Rest
// import { TabsPage } from '../../src/pages/tabs/tabs';
import { SearchPage } from '../../src/pages/search/search';
import { ParamsPage } from '../../src/pages/params/params';
import { BookmarksPage } from '../../src/pages/bookmarks/bookmarks';
import { TaxonomiesModal } from '../../src/pages/taxonomies-modal/taxonomies-modal';
// Custom (this is just an example on how to add custom post types and can be removed)
import { ItemMoviePage } from './item-movie';
import { ListMoviePage } from './list-movie';
import { ListActorPage } from './list-actor';
import { ListActorsPage } from './list-actors';

export const MenuMapping = {
    posts: ListPostsPage,
    postsItem: ItemPostsPage,
    pages: ListPagesPage,
    pagesItem: ItemPagesPage,
    categories: ListCategoriesPage,
    category: ListCategoryPage,
    tags: ListTagsPage,
    tag: ListTagPage,
    authors: ListAuthorsPage,
    author: ListAuthorPage,
    // tabs: TabsPage,
    search: SearchPage,
    params: ParamsPage,
    bookmarks: BookmarksPage,
    // Custom (this is just an example on how to add custom post types and can be removed)
    movieItem: ItemMoviePage,
    movie: ListMoviePage,
    actorItem: ListActorPage,
    actor: ListActorsPage,
}

export const DeepLinkerLnks = [
    // { component: TabsPage, name: 'Tabs', segment: 'tabs/:options' },
    { component: SearchPage, name: 'Search', segment: 'search' },
    { component: ParamsPage, name: 'Settings', segment: 'settings' },
    { component: BookmarksPage, name: 'Bookmarks', segment: 'bookmarks' },
    { component: ItemPagesPage, name: 'Page', segment: 'pages/:slug' },
    { component: ItemPostsPage, name: 'Post', segment: ':year/:month/:day/:slug' },
    { component: ListPostsPage, name: 'Posts', segment: 'posts' },
    { component: ListPagesPage, name: 'Pages', segment: 'pages' },
    { component: ListCategoriesPage, name: 'Categories', segment: 'categories' },
    { component: ListCategoryPage, name: 'Category', segment: 'category/:id' },
    { component: ListTagsPage, name: 'Tags', segment: 'tags' },
    { component: ListTagPage, name: 'Tag', segment: 'tag/:id' },
    { component: ListAuthorsPage, name: 'Authors', segment: 'authors' },
    { component: ListAuthorPage, name: 'Author', segment: 'author/:id' },
    // Custom (this is just an example on how to add custom post types and can be removed)
    { component: ItemMoviePage, name: 'Movie', segment: 'movies/:slug' },
    { component: ListMoviePage, name: 'Movies', segment: 'movies' },
    { component: ListActorsPage, name: 'Actors', segment: 'actors' },
    { component: ListActorPage, name: 'Actor movies', segment: 'actors/:id' },
];

export const PAGES = [
    // Items,
    ItemPostsPage,
    ItemPagesPage,
    // Lists,
    ListPostsPage,
    ListPagesPage,
    ListCategoriesPage,
    ListCategoryPage,
    ListTagsPage,
    ListTagPage,
    ListAuthorsPage,
    ListAuthorPage,
    // Rest
    // TabsPage,
    ParamsPage,
    SearchPage,
    BookmarksPage,
    TaxonomiesModal,
    // Custom (this is just an example on how to add custom post types and can be removed)
    ItemMoviePage,
    ListMoviePage,
    ListActorPage,
    ListActorsPage,
];