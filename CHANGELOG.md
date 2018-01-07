<a name="3.0.0.alpha03"></a>
### 3.0.0-alpha03 (2018-01-07)

Adds admobs support

<a name="3.0.0.alpha02"></a>
### 3.0.0-alpha02 (2017-12-19)

Fix unvalid version name

<a name="3.0.0.alpha01"></a>
### 3.0.0.alpha01 (2017-12-19)

Complete rewrite with Ionic 2+ (Angular 2+)

Details: <https://github.com/wordpress-clients/hybrid/pull/344>

There is no way to upgrade v2 to v3.

To start a new project follow the docs: <https://wordpress-clients.gitbooks.io/pwa-hybrid/>

<a name="2.0.3"></a>
### 2.0.3 (2017-07-11)

* [BUG] Build iOS App: Error: cordovaProject.projectConfig.getFileResources is not a function <https://github.com/wordpress-clients/hybrid/issues/353>

To upgrade:

```
$ git fetch --all
$ git checkout v2.0.3
$ yarn
$ rm -rf platforms/ plugins/
$ npm run restore
```

<a name="2.0.2"></a>
### 2.0.2 (2017-04-12)

* Downgrade Android-cordova due to <http://stackoverflow.com/questions/43195668/cordova-error-using-cordova-android-6-2-0-getfileresources-is-not-a-function>

To upgrade:

```
$ git fetch --all
$ git checkout v2.0.2
$ yarn
$ rm -rf platforms/ plugins/
$ npm run restore
```

<a name="2.0.1"></a>
### 2.0.1 (2016-12-28)

* [BUG] Rollback appRate version to avoid regressions until v3 <https://github.com/shprink/wordpress-hybrid-client/issues/317>
* [ENHANCEMENT] invalidate service worker cache at every build based on the config.xml app version

To upgrade:

```
$ git fetch --all
$ git checkout v2.0.1
$ yarn
$ npm run restore
```

<a name="2.0.0"></a>
### 2.0.0 (2016-12-17)

2.0.0 REQUIRES WORDPRESS 4.7 or higher!

To upgrade:

```
$ git fetch --all
$ git checkout v2.0.0
$ yarn
$ npm run restore
```

* [ENHANCEMENT] WordPress 4.7 ready! <https://github.com/shprink/wordpress-hybrid-client/issues/308>
* [ENHANCEMENT] Upgrade Cordova plugins <https://github.com/shprink/wordpress-hybrid-client/pull/310>
* [BUG] Links in Comments open in app instead of safari <https://github.com/shprink/wordpress-hybrid-client/issues/306>

#### Breaking changes:

If you upgrade to WordPress 4.7, you can remove WP-API plugin.

`filter` params is deprecated, if you use custom query filters here is the changes you need to make:

```
-        "filter[orderby]": "date"
-        "filter[order]": "desc"
-        "filter[post_status]": "publish"
+        "orderby": "date"
+        "order": "desc"
+        "status": "publish"
 ```

 in `menu.json` you need to change `public.taxonomies.slug` by `public.taxonomies.id` and replace the `slug` of the taxonomie per its `id`.

 For example:

 ```
-        "route": "public.taxonomies.slug({ term: 'category', slug: 'uncategorized', postType: 'post' })",
+        "route": "public.taxonomies.id({ term: 'categories', id: 1, postType: 'post' })",
 ```

 Also terms changed. `category` is now `categories` and `post_tag` is now `tags`.

<a name="2.0.0-beta16"></a>
### 2.0.0-beta16 (2016-11-12)

To upgrade:

```
$ git fetch --all
$ git checkout v2.0.0-beta16
$ npm i
$ npm run restore
```

If you upgrade you will need to remove this crosswalk rule from your `config.xml` => https://github.com/shprink/wordpress-hybrid-client/commit/8143a93839972d16f430349cd091e7eb91c219db#diff-b6bb989dd6bb152b38e30e84f2d7e195L25

* upgrade cordova-ios
* upgrade cordova-android (API 25)
* upgrade crosswalk
* add more logs to admobs

<a name="2.0.0-beta15"></a>
### 2.0.0-beta15 (2016-11-01)

To upgrade checkout `git fetch --all && git checkout v2.0.0-beta15` and run `npm i`

* [BUG] Remove Object.assign ... <https://github.com/shprink/wordpress-hybrid-client/issues/294>

<a name="2.0.0-beta14"></a>
### 2.0.0-beta14 (2016-10-30)

To upgrade checkout `git fetch --all && git checkout v2.0.0-beta14` and run `npm i`

* [BUG] Fix Pagination on customPosts <https://github.com/shprink/wordpress-hybrid-client/issues/283>
* [FEATURE] Custom posts and custom taxos queries are customizale through the conf <https://github.com/shprink/wordpress-hybrid-client/issues/288>
* Add a new scss variable `$barHasIconTitleMarginLeft`

<a name="2.0.0-beta13"></a>
### 2.0.0-beta13 (2016-10-22)

To upgrade checkout `git fetch --all && git checkout v2.0.0-beta13` and run `npm i`

* [FEATURE] Display app icon in the menu header <https://github.com/shprink/wordpress-hybrid-client/issues/5>
* [FEATURE] Progressive Web App support (Manifest & service workers)
* Remove share button on browser


<a name="2.0.0-beta12"></a>
### 2.0.0-beta12 (2016-09-18)

* [BUG] Display category/tag title instead of slug <https://github.com/shprink/wordpress-hybrid-client/issues/59>
* [BUG] Fix Russian/Chinese author title encoding
* [BUG] Removing Native transitions
* iOS 10 ready. See notes on BUILD.md

<a name="2.0.0-beta11"></a>
### 2.0.0-beta11 (2016-09-04)

* [UPGRADE] Ionic 1.3.1
* [UPGRADE] ionic-plugin-keyboard 2.2.0
* [COMMAND] Adds `npm start` to replace `npm run devserver` (kept for backward compat)

<a name="2.0.0-beta10"></a>
### 2.0.0-beta10 (2016-06-08)

* [UPGRADE] Crosswalk 1.6
* [UPGRADE] Cordova-android 5.x (API-23)

#### Breaking changes:

You now need to have API-23 installed on your Android SDK.

<a name="2.0.0-beta09"></a>
### 2.0.0-beta09 (2016-05-18)

* [BUG] Fix Cordova dependency issue <https://github.com/shprink/wordpress-hybrid-client/issues/221>
* [CONFIG] Change default cache from 24h to 3h <https://github.com/shprink/wordpress-hybrid-client/commit/5bacddaff8e0b2647c9e9a40ad6572e7da6ec697>
* [LANGUAGE] Add Urdu language <https://github.com/shprink/wordpress-hybrid-client/pull/211>

<a name="2.0.0-beta08"></a>
### 2.0.0-beta08 (2016-03-31)

* [FEATURE] Add Google Admob support! <https://github.com/shprink/wordpress-hybrid-client/issues/186>
* [BUG] Fix iOS badge count <https://github.com/shprink/wordpress-hybrid-client/issues/192>
* [BUG] Fix comment broken in WP-API beta12 <https://github.com/shprink/wordpress-hybrid-client/issues/201>
* [FEATURE] Custom style per page <https://github.com/shprink/wordpress-hybrid-client/issues/136>
* Upgrade PushNotif cordova plugin

<a name="2.0.0-beta07"></a>
### 2.0.0-beta07 (2016-03-18)

* [BUG] Post title contains decimal <https://github.com/shprink/wordpress-hybrid-client/issues/74>
* [BUG] how to display category/tag title instead of slug？ <https://github.com/shprink/wordpress-hybrid-client/issues/59>
* [BUG] SHaring on whatsapp sends extra text as rendered <https://github.com/shprink/wordpress-hybrid-client/issues/181>
* [FEATURE] External links open in app <https://github.com/shprink/wordpress-hybrid-client/issues/175>
* Upgrade InAppBrowser cordova plugin

<a name="2.0.0-beta06"></a>
### 2.0.0-beta06 (2016-02-20)

* [FEATURE] Adding hybrid loading service <https://github.com/shprink/wordpress-hybrid-client/issues/174>
* [FEATURE] Adding push notification switch (register/unregister) in the params page when enabled <https://github.com/shprink/wordpress-hybrid-client/issues/83>
* [CONFIG] Change cordova statusbar to show by default (most apps have the statubar displayed).

<a name="2.0.0-beta05"></a>
### 2.0.0-beta05 (2016-02-16)

* Adding Turkish language <https://github.com/shprink/wordpress-hybrid-client/pull/166>
* [FEATURE] Adding Accept-Language header <https://github.com/shprink/wordpress-hybrid-client/issues/172>

<a name="2.0.0-beta04"></a>
### 2.0.0-beta04 (2016-02-09)

* [BUG] Fix cache when several custom post types <https://github.com/shprink/wordpress-hybrid-client/issues/162>
* [BUG] Displayed languages config does not work <https://github.com/shprink/wordpress-hybrid-client/issues/163>

<a name="2.0.0-beta03"></a>
### 2.0.0-beta03 (2016-02-02)

* adding Russian translation <https://github.com/shprink/wordpress-hybrid-client/pull/159>
* Integrate better-rest-api-featured-images <https://github.com/shprink/wordpress-hybrid-client/issues/150>

<a name="2.0.0-beta02"></a>
### 2.0.0-beta02 (2016-01-12)

* Remove Ionic and Cordova as global packages
* Upgrade Cordova analytics and push notif plugins so there is no conflicts <https://github.com/shprink/wordpress-hybrid-client/issues/144>
* Remove GooglePlayServices cordova plugin

<a name="2.0.0-beta01"></a>
### 2.0.0-beta01 (2016-01-08)

* Doc Update
* Force crosswalk to generate two apks

<a name="2.0.0-alpha6"></a>
### 2.0.0-alpha6 LATEST ALPHA! (2016-01-07)

* [BUG] Custom posts templating <https://github.com/shprink/wordpress-hybrid-client/issues/135>
* [FEATURE] Templating <https://github.com/shprink/wordpress-hybrid-client/issues/7>
* [ABOUT] The About feature has been removed. You can use Pages to achieve the same purpose.

<a name="2.0.0-alpha5"></a>
### 2.0.0-alpha5 (2015-12-22)

* [BUG] Fix WP-API api changes to work with WP-API-beta9

<a name="2.0.0-wip"></a>
### 2.0.0 (WIP)

[milestone](https://github.com/shprink/wordpress-hybrid-client/milestones/2.0.0)

* [FEATURE] WP-API v2 support <https://github.com/shprink/wordpress-hybrid-client/issues/76>
* [FEATURE] Adding Many translations
* [FEATURE] Authors list <https://github.com/shprink/wordpress-hybrid-client/issues/30>
* [FEATURE] Pages list <https://github.com/shprink/wordpress-hybrid-client/issues/86>
* [FEATURE] Custom posts and taxonomies <https://github.com/shprink/wordpress-hybrid-client/issues/80>
* [FEATURE] Templating <https://github.com/shprink/wordpress-hybrid-client/issues/7>

#### Breaking changes:

* [CONFIG] `config.json` does not exist anymore. The installation (`npm run installWPHC`) creates several config files in the `config` folder. `config/config.cson` file overwrites `config/config.default.cson` (this on is read only, do not modify).
* [CONFIG] There is no more dev/prod distinction, WPHC turn debug OFF when building the prod app automatically.
* [ABOUT] The About feature has been removed. You can use Pages to achieve the same purpose.

<a name="1.7.1"></a>
### 1.7.1

* [BUG] Fix white screen after splashscreen on iOS:  <https://github.com/shprink/wordpress-hybrid-client/issues/91>
* [CONFIG CORDOVA]: Add the following to your `config.xml`: `<preference name="CrosswalkAnimatable" value="true" />`

#### Breaking Changes

* [CONFIG]: `cordova.nativeTransitions.options` changed to `cordova.nativeTransitions.defaultOptions` to follow ionic-native-transitions lib changes

<a name="1.7.0"></a>
### 1.7.0 (2015-10-08)

[milestone](https://github.com/shprink/wordpress-hybrid-client/milestones/1.7.0)

* Adding native transitions <https://github.com/shprink/wordpress-hybrid-client/issues/91>

<a name="1.6.0"></a>
### 1.6.0 (2015-09-24)

[milestone](https://github.com/shprink/wordpress-hybrid-client/milestones/1.6.0)

* Update dependencies: Angular 1.4, Ionic 1.1 etc <https://github.com/shprink/wordpress-hybrid-client/issues/58>
* Update Node and npm version to 4.1.x and 3.3.x
* Translation: Use wildcarts to cover all regions (e.g: en_* will use en.json) <https://github.com/shprink/wordpress-hybrid-client/issues/67>
* iOS9 support: <https://github.com/shprink/wordpress-hybrid-client/issues/68>
* [SEARCH] Empty input button not aligned: <https://github.com/shprink/wordpress-hybrid-client/issues/70>
* Translate back button: <https://github.com/shprink/wordpress-hybrid-client/issues/57>
* Better CSS animations on multilevel menu: <https://github.com/shprink/wordpress-hybrid-client/issues/66>

<a name="1.5.1"></a>
### 1.5.1  (2015-09-03)

[milestone](https://github.com/shprink/wordpress-hybrid-client/milestones/1.5.1)

* Replace libxmljs <https://github.com/shprink/wordpress-hybrid-client/issues/56>
* Ability to modify ionic configuration through config.json <https://github.com/shprink/wordpress-hybrid-client/issues/55>

#### Breaking Changes

* "cache.views" and "cache.forward" configuration (within config.json) were move to "ionicConfig.views.maxCache" and "ionicConfig.views.forwardCache" respectively

<a name="1.5.0"></a>
### 1.5.0  (2015-08-30)

[milestone](https://github.com/shprink/wordpress-hybrid-client/milestones/1.5.0)

* Comments <https://github.com/shprink/wordpress-hybrid-client/issues/6>
* Side menu with up to 6 levels menu <https://github.com/shprink/wordpress-hybrid-client/issues/41>
* Cordova plugin Update
* Adding Spanish translation

<a name="1.4.2"></a>
### 1.4.2  (2015-07-24)

* Installation is now Linux ready.
* Adding more npm command (listed in README.md)

<a name="1.4.1"></a>
### 1.4.1  (2015-07-23)

* Update doc

<a name="1.4.0"></a>
### 1.4.0  (2015-07-22)

[milestone](https://github.com/shprink/wordpress-hybrid-client/milestones/1.4.0)

* New command to install cordova ```npm run installCordova```
* Offline mode (Bookmarks) <https://github.com/shprink/wordpress-hybrid-client/issues/10>
* release.sh.dist changed
* Adding Whitelist Cordova plugin  <https://github.com/shprink/wordpress-hybrid-client/issues/33>
* Update Crosswalk
* Fix appRate

#### Breaking Changes

* Refactor Menu config <https://github.com/shprink/wordpress-hybrid-client/issues/27>

The menu configuration is now located in ```menu.list``` within the config.json file. You will need to update it accordingly to the following changes:

1. ```menu.settings``` changed to ```settings``` in the config.json file
1. ```menu.wordpress``` is removed from config.json file
1. ```menu.social``` is removed from config.json file
1. ```menu.list``` is the new menu declaration object

<a name="1.3.0"></a>
### 1.3.0  (2015-06-24)

[milestone](https://github.com/shprink/wordpress-hybrid-client/milestones/1.3.0)

* Adding Push Notifications iOS/Android <https://github.com/shprink/wordpress-hybrid-client/issues/9>
* Chinese support <https://github.com/shprink/wordpress-hybrid-client/issues/18>

<a name="1.2.0"></a>
### 1.2.0  (2015-06-21)

[milestone](https://github.com/shprink/wordpress-hybrid-client/milestones/1.2.0)

* Adding Docker support (There is still problems with mapping users to be able to edit files outside and inside docker)
* Syntax highlighter

<a name="1.1.0"></a>
### 1.1.0  (2015-06-01)

[milestone](https://github.com/shprink/wordpress-hybrid-client/milestones/1.1.0)

* Adding appRate support: <https://github.com/shprink/wordpress-hybrid-client/issues/12>
* Adding cache image support: <https://github.com/shprink/wordpress-hybrid-client/issues/3>
* Performance enhancement: <https://github.com/shprink/wordpress-hybrid-client/issues/2>

<a name="1.0.0"></a>
### 1.0.0  (2015-05-18)

Initial release
