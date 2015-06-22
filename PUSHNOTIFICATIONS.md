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

Then go to "Android Push Notifications (via GMC)" section and enter you Goolge Api key.

Do not forget to save.

There is one last thing to do to make push notifications work. You will need to edit a file from this plugin (A file a bug ticket for owners to resolve).

You can do it via the admin page in this address: ```wp-admin/plugin-editor.php?file=push-notifications-for-wp%2Fincludes%2Fnotifications%2Fclass-pnfw-notifications-android.php&plugin=push-notifications-for-wp%2Fincludes%2Fclass-pnfw-sender-manager.php```

Once there you will have a line like this:

```$payloadData = array_merge(array('title' => $title), $user_info);```

Change it to:

```$payloadData = array_merge(array('message' => $title, 'title' => 'THE TITLE OF YOUR PUSH NOTIFICATION'), $user_info);```

### Test Push Notifications on Android

```
npm run dumpdev

ionic run android
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
