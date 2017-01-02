import { HomePage } from './home/home';
import { PostPage } from './post/post';
import { PostsPage } from './posts/posts';
import { TaxonomiesModal } from './taxonomies-modal/taxonomies-modal';

export const MenuMapping = {
    post: PostPage,
    posts: PostsPage
}

export default [
    HomePage,
    PostsPage,
    PostPage,
    TaxonomiesModal
];