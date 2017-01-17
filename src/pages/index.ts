import { HomePage } from './home/home';
import { PostPage } from './post/post';
import { PostsPage } from './posts/posts';
import { PagePage } from './page/page';
import { PagesPage } from './pages/pages';
import { BookmarksPage } from './bookmarks/bookmarks';
import { TaxonomiesModal } from './taxonomies-modal/taxonomies-modal';

export const MenuMapping = {
    post: PostPage,
    posts: PostsPage,
    page: PagePage,
    pages: PagesPage,
    bookmarks: BookmarksPage
}

export default [
    HomePage,
    PostsPage,
    PostPage,
    PagePage,
    PagesPage,
    BookmarksPage,
    TaxonomiesModal
];