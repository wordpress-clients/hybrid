<a name="1.4.0"></a>
### 1.4.0  (not released yet)

[milestone](https://github.com/shprink/wordpress-hybrid-client/milestones/1.4.0)

* New command to install cordova ```npm run installCordova```
* Offline mode (Bookmarks) <https://github.com/shprink/wordpress-hybrid-client/issues/10>
* release.sh.dist changed
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
