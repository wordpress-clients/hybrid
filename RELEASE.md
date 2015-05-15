# Release

## Android

### Get and save licence key

https://support.google.com/googleplay/android-developer/answer/186113?hl=en

Copy and past the key within your ```~/.ssh``` folder with that name ```android_wphc.keystore```

NB: You can put the key wherever you want and even give it another name but if you do that, you will need to modify ```release.sh``` accordingly.

### Keyboard adjustement

Open ```platforms/android/AndroidManifest.xml``` and change ```android:windowSoftInputMode="adjustResize"``` into ```android:windowSoftInputMode="adjustNothing"``` it will prevent losing the menu to close when searching on tablets.

### Build PROD APKs

```
npm run-script build
```

## iOS

coming
