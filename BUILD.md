# Build

## Android

### Preriquisites

* Android SDK
* Ant

#### SDK

Download the SDK from <https://developer.android.com/sdk/installing/index.html?pkg=tools>. Android Studio is not required.

Move the SDK to a place on yur file system and refer to it on the .bashrc or .bash_profile file.

```
export ANDROID_HOME=~/Library/Android/sdk  
```

 Once it is done, you may need to run ```source ~/.bashrc``` or ```source ~/.bash_profile``` to update the configuration

#### Ant

```
# iOS
brew install ant

# Linux
sudo apt-get install ant
```

### Build and run dev version (Non minified and debug ON)

Plug your device in if you have one (make sure your device is listed by running: ```$ adb devices```) or let Android emulator handle it.

```
# Dump dev files within the www folder
npm run-script dumpdev

ionic run android
```

NB: If you want to test the minification you could also run the prod version on debug mode by using ```npm run-script dumpprod``` instead of ```npm run-script dumpdev```

### Debug

Open Chrome and dump this in the address bar: ```chrome://inspect/#devices```

If your device is connected and in USB mode you will see your application that you can inspect using Chrome dev tools.

---

## iOS

### Preriquisites

* OSX
* XCode
* iOS Simulator

#### iOS simulator

```
sudo npm install -g ios-sim
```

### Build and run dev version (Non minified and debug ON)

Plug your device in if you have one or let iOS simulator handle it.

```
# Dump dev files within the www folder
npm run-script dumpdev

ionic run ios
```

NB: If you want to test the minification you could also run the prod version on debug mode by using ```npm run-script dumpprod``` instead of ```npm run-script dumpdev```
