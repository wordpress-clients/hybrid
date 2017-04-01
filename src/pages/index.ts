import { ItemPage } from './item/item';
import { ListPage } from './list/list';
import { TabsPage } from './tabs/tabs';
import { SearchPage } from './search/search';
import { ParamsPage } from './params/params';
import { BookmarksPage } from './bookmarks/bookmarks';
import { TaxonomiesModal } from './taxonomies-modal/taxonomies-modal';

export const MenuMapping = {
    item: ItemPage,
    list: ListPage,
    tabs: TabsPage,
    search: SearchPage,
    params: ParamsPage,
    bookmarks: BookmarksPage,
}

export const DeepLinkerLnks = [
    { component: ItemPage, name: 'Item', segment: 'item/:type/:id' },
    { component: ItemPage, name: 'Item', segment: 'item/:type/:id/:options' },
    { component: ListPage, name: 'List', segment: 'list/:type' },
    { component: ListPage, name: 'List', segment: 'list/:type/:options' },
    { component: TabsPage, name: 'Tabs', segment: 'tabs/:options' },
    { component: SearchPage, name: 'Search', segment: 'search' },
    { component: ParamsPage, name: 'Settings', segment: 'settings' },
    { component: BookmarksPage, name: 'Bookmarks', segment: 'bookmarks' }
]

export const PAGES = [
    ItemPage,
    ListPage,
    TabsPage,
    ParamsPage,
    SearchPage,
    BookmarksPage,
    TaxonomiesModal,
];