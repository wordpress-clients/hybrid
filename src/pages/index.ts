import { HomePage } from './home/home';
import { PostPage } from './post/post';
import { PagePage } from './page/page';
import { ListPage } from './list/list';
import { PostsPage } from './posts/posts';
import { PagesPage } from './pages/pages';
import { AuthorPage } from './author/author';
import { ParamsPage } from './params/params';
import { AuthorsPage } from './authors/authors';
import { TaxonomyPage } from './taxonomy/taxonomy';
import { BookmarksPage } from './bookmarks/bookmarks';
import { TaxonomiesPage } from './taxonomies/taxonomies';
import { CustomPostPage } from './custom-post/custom-post';
import { CustomPostsPage } from './custom-posts/custom-posts';
import { TaxonomiesModal } from './taxonomies-modal/taxonomies-modal';

export const MenuMapping = {
    post: PostPage,
    page: PagePage,
    list: ListPage,
    posts: PostsPage,
    pages: PagesPage,
    params: ParamsPage,
    author: AuthorPage,
    authors: AuthorsPage,
    taxonomy: TaxonomyPage,
    bookmarks: BookmarksPage,
    taxonomies: TaxonomiesPage,
    customPost: CustomPostPage,
    customPosts: CustomPostsPage,
}

export const DeepLinkerLnks = [
    { component: ListPage, name: 'List', segment: 'list/:type' },
    { component: ListPage, name: 'List', segment: 'list/:type/:postType' },
    { component: PostsPage, name: 'Posts', segment: 'posts' },
    { component: PagesPage, name: 'Pages', segment: 'pages' },
    { component: PostPage, name: 'Post', segment: 'posts/:id' },
    { component: PagePage, name: 'Page', segment: 'pages/:id' },
    { component: AuthorsPage, name: 'Authors', segment: 'authors' },
    { component: ParamsPage, name: 'Settings', segment: 'settings' },
    { component: AuthorPage, name: 'Author', segment: 'authors/:id' },
    { component: BookmarksPage, name: 'Bookmarks', segment: 'bookmarks' },
    { component: CustomPostsPage, name: 'Custom Posts', segment: 'customPosts/:slug' },
    { component: CustomPostPage, name: 'Custom Post', segment: 'customPosts/:slug/:id' },
    { component: TaxonomyPage, name: 'Taxonomy', segment: 'taxonomies/:term/:postType/:id' },
    { component: TaxonomiesPage, name: 'Taxonomies', segment: 'taxonomies/:term/:postType' },
]

export const PAGES = [
    ListPage,
    HomePage,
    PostsPage,
    PostPage,
    PagePage,
    PagesPage,
    AuthorPage,
    ParamsPage,
    AuthorsPage,
    TaxonomyPage,
    BookmarksPage,
    TaxonomiesPage,
    CustomPostPage,
    CustomPostsPage,
    TaxonomiesModal,
];