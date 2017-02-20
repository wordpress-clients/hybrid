import { PostComponent } from './post/post';
import { ListComponent } from './list/list';
import { MenuComponent } from './menu/menu';
import { PageComponent } from './page/page';
import { PagesListComponent } from './pages-list/pages-list';
import { PostsListComponent } from './posts-list/posts-list';
import { UsersListComponent } from './users-list/users-list';
import { TagsListComponent } from './tags-list/tags-list';
import { CategoriesListComponent } from './categories-list/categories-list';
import { TaxonomyComponent } from './taxonomy/taxonomy';

import { AuthorComponent } from './author/author';
import { SpinnerComponent } from './spinner/spinner';
import { ToolbarComponent } from './toolbar/toolbar';
import { PostCardComponent } from './post-card/post-card';
import { BookmarksComponent } from './bookmarks/bookmarks';
import { MenuItemsComponent } from './menu-items/menu-items';
import { EmptyListComponent } from './empty-list/empty-list';
import { TaxonomiesComponent } from './taxonomies/taxonomies';
import { PageNavbarComponent } from './page-navbar/page-navbar';

// export const DIRECTIVES = [

// ]

export const ComponentsMapping = {
    // items
    'posts-item': PostComponent,
    'pages-item': PageComponent,
    'users-item': PageComponent,
    // lists
    'posts-list': PostsListComponent,
    'pages-list': PagesListComponent,
    'users-list': UsersListComponent,
    'tags-list': TagsListComponent,
    'categories-list': CategoriesListComponent,
}

export const COMPONENTS = [
    ListComponent,
    PagesListComponent,
    PostsListComponent,
    UsersListComponent,
    TagsListComponent,
    CategoriesListComponent,
    TaxonomyComponent,

    PostComponent,
    PageComponent,
    MenuComponent,
    AuthorComponent,
    SpinnerComponent,
    ToolbarComponent,
    PostCardComponent,
    MenuItemsComponent,
    EmptyListComponent,
    BookmarksComponent,
    TaxonomiesComponent,
    PageNavbarComponent,
];