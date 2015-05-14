## Create Apk (android)

### Keyboard adjustement

Open ```platforms/android/AndroidManifest.xml``` and change ```android:windowSoftInputMode="adjustResize"``` into ```android:windowSoftInputMode="adjustNothing"``` it will prevent losing the menu to close when searching on tablets.


```
# Make sure your change the path to your signing key. Change ```~/.ssh/android_wphc.keystore``` to whatever your Android key is.
npm run-script build
```

## iOS

coming
