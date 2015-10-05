# Release

Male sure you have ios and/or android platforms installed. If you have correctly ran ```npm run installCordova``` it should be fine otherwise go back to [BUILD.md](BUILD.md).

## Android

### Get and save licence key

<https://support.google.com/googleplay/android-developer/answer/186113?hl=en>

```
keytool -genkey -v -keystore <my-release-key.keystore> -alias <alias_name> -keyalg RSA -keysize 2048 -validity 10000
```

Change `<my-release-key.keystore>` and `<alias_name>` accordingly also in the `release.sh` file:

```
ANDROID_ZIPALIGN="/path/to/Android/sdk/build-tools/21.1.2/zipalign"
ANDROID_KEY_PATH="/path/to/keystore/my-release-key.keystore"
ANDROID_KEY_ALIAS="alias_name"
```

### Keyboard adjustement

Open ```platforms/android/AndroidManifest.xml``` and change ```android:windowSoftInputMode="adjustResize"``` into ```android:windowSoftInputMode="adjustNothing"``` it will prevent screen hiccup when searching.

### Build PROD APKs

```
npm run build
```

Then answer to the prompt.

## iOS

### Documentation

<https://developer.apple.com/programs/ios/gettingstarted/>

<https://developer.apple.com/library/mac/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html#//apple_ref/doc/uid/TP40011225-CH13>

<http://codewithchris.com/submit-your-app-to-the-app-store/>

### Install sigh

Sigh allow to sign .app with a provisioning file via the terminal

```
# https://github.com/KrauseFx/sigh
sudo gem install sigh
```

### Build PROD IPA

```
npm run build
```

Then answer to the prompt.

### Use XCode or Application Loader

Once the IPA is signed, all you need to do is sending the package to Apple for review.

### Frequent errors

#### Submitting iOS app to app store application identifier invalid

<http://stackoverflow.com/questions/20120128/submitting-ios-app-to-app-store-application-identifier-invalid>
