# Configuration

## Config.scss

This file allow you to overwrite Sass variables.

The colors variables are the following:

```
$palette-primary-dark: #455a64 !default;
$palette-primary-color: #607d8b !default;
$palette-primary-light: #cfd8dc !default;
$palette-primary-icon: #fff !default;
$palette-primary-text: #212121 !default;
$palette-primary-background: white !default;
$palette-accent-color: #009688 !default;
$palette-secondary-text: #727272 !default;
$palette-divider-color: #eaeaea !default;
```

You can also overwrite Ionic variables: <http://ionicframework.jp/tutorials/customizing-ionic-with-sass/>

To know all WPHC internal varaibles checkout ```lib/scss/_variables.scss```

## Config.js

Here is a simple view of what you can configure:

* debugEnabled
* title
* ionicConfig
* api
    * baseUrl
    * timeout
    * maxAttempt
* menu
    * exposeAsideWhen
    * list
* settings
* cache
    * views
    * forward
    * img
    * data
* bookmark
* post
    * comments
* syntaxHighlighter
* taxonomies
* posts
* translation
    * available
    * prefered
* analytics
* cordova
    * statubar
    * appRate
    * pushNotifications


### api [Object]

```
{
    "baseUrl": "http://YourDomain/wp-json", // This is where you put the WP-API webservice entry
    "timeout": 3000, // The time in ms when a http request is considered as failed
    "maxAttempt": 3 // The number of attempt the app will try before giving up. A button "Retry" will therefor be display
}
```

### debugEnabled [Boolean]

Make sure this option is TRUE for ```config.json``` and FALSE for ```config.prod.json```

### title [String]

Your website title. The title will appear on the top of the left navigation menu

### ionicConfig [Object]

allow overwriting ionic configuration <http://ionicframework.com/docs/api/provider/$ionicConfigProvider/>

Setting ```null``` will keep ionic default value.

```
"views": {
    "transition": null,
    "maxCache": null,
    "forwardCache": true
},
"scrolling": {
    "jsScrolling": false
},
"backButton": {
    "icon": null,
    "previousTitleText": null
},
"form": {
    "checkbox": null,
    "toggle": null
},
"spinner": {
    "icon": null
},
"tabs": {
    "style": null,
    "position": null
},
"templates": {
    "maxPrefetch": null
},
"navBar": {
    "alignTitle": null,
    "positionPrimaryButtons": null,
    "positionSecondaryButtons": null
}
```

### menu [Object]

The media query used to determine when to always display the left menu.

```
"exposeAsideWhen": "(min-width:900px)"
```

They are four types of menu item (internal|external|folder|separator).

* **internal**: can be any page of the application (home|category|tag|parameters|about)
* **external**: Any www website
* **folder**: Create a menu sublevel (you can add up to six levels)
* **separator**: Separate menu items

```
"list": [{
    "type": "internal",
    "trans": "menu.home",
    "route": "public.posts",
    "icon": "icon ion-home"
}, {
    "type": "folder",
    "trans": "menu.categories",
    "icon": "icon ion-folder",
    "list": [{
        "type": "internal",
        "trans": "Mobile",
        "route": "public.taxonomies.slug({ term: 'category', slug: 'mobile' })",
        "icon": "icon ion-iphone"
    }, {
        "type": "internal",
        "trans": "All",
        "route": "public.taxonomies({ term: 'category' })",
        "icon": "icon ion-folder"
    }]
}, {
    "type": "internal",
    "trans": "menu.tags",
    "route": "public.taxonomies({ term: 'post_tag' })",
    "icon": "icon ion-pricetags"
}, {
    "type": "internal",
    "trans": "menu.bookmarks",
    "route": "public.bookmarks",
    "icon": "icon ion-bookmark"
}, {
    "type": "separator",
    "trans": "Separator"
}, {
    "type": "external",
    "trans": "My blog",
    "href": "http://julienrenaux.fr",
    "icon": "icon ion-link"
}, {
    "type": "internal",
    "trans": "params.title",
    "route": "public.params",
    "icon": "icon ion-gear-b"
}, {
    "type": "internal",
    "trans": "about.title",
    "route": "public.about",
    "icon": "icon ion-information"
}]
```

NB: The icons must be from ionicons.com
NB: For now the homepage is mandatory and cannot be a specific page.

### Settings configuration.

```
"settings": {
    "about": {
        "enabled": true,
        "credit": true
    },
    "parameters": {
        "enabled": true,
        "defaultFontSize": "medium"
    }
}
```

### cache [Object]

```
"views": 10, // The number of pages cached in the app
"forward": false, // When navigating back in the history, the "forward" views are removed from the cache. Set this config to true to have forward views cached and not reset on each load.
"data": { // Angular-cache default config
    "capacity": 100,
    "maxAge": 21600000,
    "deleteOnExpire": "aggressive",
    "recycleFreq": 1000,
    "cacheFlushInterval": null,
    "storageMode": "localStorage",
    "verifyIntegrity": true
},
"img" :{
    "localCacheFolder": "imgcache",           /* name of the cache folder */
    "useDataURI": false,                      /* use src="data:.."? otherwise will use src="filesystem:.." */
    "chromeQuota": 10 * 1024 * 1024,          /* allocated cache space : here 10MB */
    "usePersistentCache": true,               /* false = use temporary cache storage */
    "cacheClearSize": 0,                      /* size in MB that triggers cache clear on init, 0 to disable */
    "headers": {},                            /* HTTP headers for the download requests -- e.g: headers: { 'Accept': 'application/jpg' } */
    "skipURIencoding": false                  /* enable if URIs are already encoded (skips call to sanitizeURI) */
}
```

### post

```
"comments": {
    "enabled": true,
    "depth": 2
},
"cache": { // Overwrite global cache. Can be empty
    "maxAge": 172800000,
    "capacity": 10
}
```

### Bookmark

The bookmark cache has a difference from others. maxAge is infinite and cannot be overwritten.

```
"bookmark": {  // Overwrite global cache. Can be empty
    "cache": {
        "capacity": 10
    }
},
```

### taxonomies

```
"cache": {  // Overwrite global cache. Can be empty
    "maxAge": 172800000
}
```

### posts

```
"posts_per_page": 6,
"orderby": "date",
"orderby": "desc",
"post_status": "publish",
"cache": { // Overwrite global cache. Can be empty
    "capacity": 25,
    "maxAge": 86400000
}
```

### translation

The languages you want to see in the parameters. So far we only support English and French.

```
"available": {
    "en": {
        "en_US": "en",
        "en_UK": "en"
    },
    "fr": {
        "fr_FR": "fr"
    }
},
"prefered": "en"
```

### analytics

Enable Google Analytics

```
"enabled": false,
"trackingId": "UA-7727182-6",
"userId": "",
"virtualPageTracking": true
```

### cordova

#### StatuBar

```
"statubar": { // Status bar options
    "show": true,
    "color": "#455a64"
}
```

#### appRate

* ***enabled*** ```Boolean``` Enable/Disable appRate
* ***language*** ```String``` Language of Dialog - eg 'en', 'fr', 'it'
* ***appName***	```String``` Custom application title
* ***openStoreInApp***	```Boolean``` Leave app or not
* ***usesUntilPrompt***	```Integer``` Number of runs of app before dialog is displayed
* ***promptForNewVersion***	```Boolean``` Show dialog again if new app version
* ***useCustomRateDialog***	```String``` Use custom view for rate dialog
* ***iosURL***	```String``` Application id in AppStore
* ***androidURL***	```String``` Application URL in GooglePlay
* ***windowsURL***	```String``` Application URL in WindowsStore

```
"appRate": {
    "enabled": true,
    "language": "en",
    "appName": "Your Blog title",
    "openStoreInApp": true,
    "usesUntilPrompt": 3,
    "promptForNewVersion": true,
    "useCustomRateDialog": "",
    "iosURL": "",
    "androidURL": "",
    "windowsURL": ""
}
```
### syntaxHighlighter

Programming language auto detection for tech blogs

* ***tabReplace***: a string used to replace TAB characters in indentation.
* ***useBR***: a flag to generate <br> tags instead of new-line characters in the output, useful when code is marked up using a non-<pre> container.
* ***classPrefix***: a string prefix added before class names in the generated markup, used for backwards compatibility with stylesheets.
* ***languages***: an array of language names and aliases restricting auto detection to only these languages.

```
"syntaxHighlighter": {
    "classPrefix": "hljs-",
    "tabReplace": "    ",
    "useBR": false,
    "languages": ["javascript", "html", "coffeescript", "html", "css", "scss", "json", "apache", "bash", "markdown", "less", "php", "apache", "typescript"]
}
```
