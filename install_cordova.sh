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

if [ "${platforms}" == "android" ]; then
    npm run platformAddAndroid
elif [ "${platforms}" == "ios" ]; then
    npm run platformAddIOS
elif [ "${platforms}" == "android ios" ]; then
    npm run platformAddAll
fi

npm run pluginAddAll
