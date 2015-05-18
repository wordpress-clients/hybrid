# Release

Male sure you have ios and/or android platforms installed.

```
ionic platform add ios android
```

All the necessary plugins will be installed as well.

## Android

### Get and save licence key

<https://support.google.com/googleplay/android-developer/answer/186113?hl=en>

Copy and past the key within your ```~/.ssh``` folder with that name ```android_wphc.keystore```

NB: You can put the key wherever you want and even give it another name but if you do that, you will need to modify ```release.sh``` accordingly.

### Keyboard adjustement

Open ```platforms/android/AndroidManifest.xml``` and change ```android:windowSoftInputMode="adjustResize"``` into ```android:windowSoftInputMode="adjustNothing"``` it will prevent losing the menu to close when searching on tablets.

### Build PROD APKs

```
npm run-script build
```

## iOS

<https://developer.apple.com/programs/ios/gettingstarted/>

<https://developer.apple.com/library/mac/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html#//apple_ref/doc/uid/TP40011225-CH13>

<http://codewithchris.com/submit-your-app-to-the-app-store/>
