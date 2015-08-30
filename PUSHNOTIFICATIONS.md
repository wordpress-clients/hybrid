## Install the WordPress plugin

Open your Wordpress admin page and install "Push Notifications for WordPress (Lite)" then activate it.

## Android

If you have not already done so, you'll need to set up a Google API project, to generate your senderID. [Follow these steps](http://developer.android.com/guide/google/gcm/gs.html) to do so.

In this example, be sure and substitute your own senderID. Get your senderID by signing into to your [Google dashboard](https://code.google.com/apis/console/).

The senderID is found at *Overview->Dashboard->Project Number* or <https://developers.google.com/mobile/add> and follow the steps to get Cloud messaging senderID and apiKey.

** Tip: ** The senderID is a 12 digit number

### Configure the WordPress plugin

Go to ```Push Notifications > Settings``` and check the following checkboxes:

* Basic Options > Send push notifications when a new post is published
* Basic Options > Android devices
* Send Push Notifications for > Posts
* Misc > In the Android notification payload add the message field

Then go to "Android Push Notifications (via GMC)" section and enter you Goolge Api key.

Do not forget to save.

### Test Push Notifications on Android

```
npm run dumpdev

npm run runAndroid
```

Open the console via Chrome dev tools ```chrome://inspect/#devices``` and inspect your device.

If push notifications are enabled and you have properly generated a key from Google cloud you should have a log that look like this:

```
 registration ID APFJFW91bFWEFWN3gIkOqYP-APFJFW91bFWEFWN3gIkOqYPAPFJFW91bFWEFWN3gIkOqYPAPFJFW91bFWEFWN3gIkOqYP
```

Copie this id and run the following command:

```
gulp push:android --apiKey W91bFWEFWN3gIkOqYPAPFJFW91bFWEFW --deviceId APFJFW91bFWEFWN3gIkOqYP-APFJFW91bFWEFWN3gIkOqYPAPFJFW91bFWEFWN3gIkOqYPAPFJFW91bFWEFWN3gIkOqYP
```

** Tip: ** You can add any number of devices using ```--deviceId``` several times

## iOS

### Configure the WordPress plugin

Go to ```Push Notifications > Settings``` and check the following checkboxes:

* Basic Options > Send push notifications when a new post is published
* Basic Options > iOS devices
* Send Push Notifications for > Posts

### Create .pem

[Get .pem files](http://stackoverflow.com/questions/21250510/generate-pem-file-used-to-setup-apple-push-notification)

Once you have got your .pem files upload them in the ```iOS Push Notifications``` section
