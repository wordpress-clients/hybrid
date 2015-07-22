#!/bin/sh
# TESTS PLEASE DO NOT USE YET

set -e

path=`dirname $0`
cd $path

read -p "Which platforms do you want to build? (android ios): " platforms
platforms=${platforms:-"android ios"}

# cleanup
echo "removing platforms/ plugins/"
rm -rf platforms/
rm -rf plugins/

# install platforms and plugin
echo "installing platforms "$platforms
npm run cordova platform add $platforms

npm run cordova plugin add cordova-plugin-crosswalk-webview@1.2.0
npm run cordova plugin add cordova-plugin-whitelist@1.0.0
npm run cordova plugin add cordova-plugin-inappbrowser@0.6.0
npm run cordova plugin add cordova-plugin-splashscreen@1.0.0
npm run cordova plugin add cordova-plugin-file@1.3.3
npm run cordova plugin add cordova-plugin-file-transfer@0.5.0
npm run cordova plugin add cordova-plugin-device@0.3.0
npm run cordova plugin add cordova-plugin-globalization@0.3.4
npm run cordova plugin add cordova-plugin-console@0.2.13
npm run cordova plugin add cordova-plugin-network-information@0.2.15
npm run cordova plugin add cordova-plugin-dialogs@0.3.0
npm run cordova plugin add org.pushandplay.cordova.apprate@1.1.7
npm run cordova plugin add nl.x-services.plugins.toast@2.0.4
npm run cordova plugin add nl.x-services.plugins.socialsharing@4.3.18
npm run cordova plugin add com.ionic.keyboard@1.0.4
npm run cordova plugin add cordova-plugin-googleplayservices@19.0.1
npm run cordova plugin add https://github.com/apache/cordova-plugin-statusbar.git#r1.0.1
npm run cordova plugin add https://github.com/phonegap-build/PushPlugin.git#2.4.0
npm run cordova plugin add cordova-plugin-google-analytics@0.7.1
