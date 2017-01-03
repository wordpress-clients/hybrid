import { PostComponent } from './post/post';
import { PostCardComponent } from './post-card/post-card';
import { AuthorComponent } from './author/author';
import { SpinnerComponent } from './spinner/spinner';
import { ToolbarComponent } from './toolbar/toolbar';
import { TaxonomiesComponent } from './taxonomies/taxonomies';
import { MenuComponent } from './menu/menu';
import { EmptyListComponent } from './empty-list/empty-list';
import { PageNavbarComponent } from './page-navbar/page-navbar';
import { ParallaxHeader } from './parallax-header/parallax-header';

export const DIRECTIVES = [
    ParallaxHeader
]

export default [
    PostComponent,
    PostCardComponent,
    AuthorComponent,
    SpinnerComponent,
    ToolbarComponent,
    TaxonomiesComponent,
    MenuComponent,
    EmptyListComponent,
    PageNavbarComponent
];