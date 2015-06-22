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
cordova platform add $platforms

cordova plugin add org.apache.cordova.inappbrowser@0.6.0
cordova plugin add org.apache.cordova.splashscreen@1.0.0
cordova plugin add org.apache.cordova.file@1.3.3
cordova plugin add org.apache.cordova.file-transfer@0.5.0
cordova plugin add org.apache.cordova.device@0.3.0
cordova plugin add org.apache.cordova.globalization@0.3.4
cordova plugin add org.apache.cordova.console@0.2.13
cordova plugin add org.apache.cordova.network-information@0.2.15
cordova plugin add org.pushandplay.cordova.apprate@1.1.7
cordova plugin add nl.x-services.plugins.toast@2.0.4
cordova plugin add nl.x-services.plugins.socialsharing@4.3.18
cordova plugin add com.ionic.keyboard@1.0.4
cordova plugin add com.google.playservices@19.0.0
cordova plugin add https://github.com/apache/cordova-plugin-statusbar.git#r1.0.1
cordova plugin add https://github.com/phonegap-build/PushPlugin.git#2.4.0
cordova plugin add https://github.com/danwilson/google-analytics-plugin.git#master
