# Build

```
ionic platform add ios android
```

All the necessary plugins will be installed as well.

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
* Provisioning profile

#### iOS simulator

```
sudo npm install -g ios-sim npm install ios-deploy
```

#### Provisioning profile

For details about various requirements to deploy to a device, refer to the Configuring Development and Distribution Assets section of Apple's [Tools Workflow Guide for iOS](http://developer.apple.com/library/ios/#documentation/Xcode/Conceptual/ios_development_workflow/00-About_the_iOS_Application_Development_Workflow/introduction.html#//apple_ref/doc/uid/TP40007959). Briefly, you need to do the following before deploying:

1. Join the Apple iOS Developer Program.
1. Create a Provisioning Profile within the [iOS Provisioning Portal](https://developer.apple.com/ios/manage/overview/index.action). You can use its Development Provisioning Assistant to create and install the profile and certificate Xcode requires.
1. Verify that the Code Signing section's Code Signing Identity within the project settings is set to your provisioning profile name.

### Build and run dev version (Non minified and debug ON)

Plug your device in if you have one or let iOS simulator handle it.

```
# Dump dev files within the www folder
npm run-script dumpdev

ionic run ios
```

NB: If you want to test the minification you could also run the prod version on debug mode by using ```npm run-script dumpprod``` instead of ```npm run-script dumpdev```
