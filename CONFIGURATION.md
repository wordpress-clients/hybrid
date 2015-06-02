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

The config file has several first level keys:

* api
* debugEnabled
* title
* menu
* cache
* post
* taxonomies
* posts
* translation
* analytics
* cordova


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

### menu [Object]

The media query used to determine when to always display the left menu.

```
"exposeAsideWhen": "(min-width:900px)"
```

#### Settings configuration.

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

#### Wordpress entries

For now the homepage is mandatory and cannot be a specific page.

You can add to the list, a specific category, a specific tag or lists.

```
"wordpress": [{
    "trans": "menu.home",
    "uiSref": "public.posts",
    "icon": "icon ion-home"
},{
    "trans": "Your category",
    "uiSref": "public.taxonomies.slug({ term: 'category', slug: 'your-category-slug' })",
    "icon": "icon ion-iphone"
}, {
    "trans": "menu.categories",
    "uiSref": "public.taxonomies({ term: 'category' })",
    "icon": "icon ion-folder"
}, {
    "trans": "menu.tags",
    "uiSref": "public.taxonomies({ term: 'post_tag' })",
    "icon": "icon ion-pricetags"
}],
```

#### Social buttons

You can add any social network account there. The icons must be from ionicons.com

```
"social": [{
    "platform": "facebook",
    "name": "julienrenauxblog", // What would be displayed on the menu
    "icon": "icon ion-social-facebook",
    "url": "https://www.facebook.com/julienrenauxblog"
}, {
    "platform": "twitter",
    "name": "julienrenaux",
    "icon": "icon ion-social-twitter",
    "url": "https://twitter.com/julienrenaux"
}, {
    "platform": "googleplus",
    "name": "julienrenaux",
    "icon": "icon ion-social-googleplus",
    "url": "https://www.google.com/+julienrenaux"
}]
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
"cache": { // Overwrite global cache. Can be empty
    "maxAge": 172800000,
    "capacity": 10
}
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
