import {Notifications, Permissions, Segment} from 'expo';

export async function registerForLocation() {
  const {status: existingStatus} = await Permissions.getAsync(
    Permissions.LOCATION
  );

  if (existingStatus !== 'granted') {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    Segment.trackWithProperties('Request Location Services', {
      granted: status === 'granted',
    });
  }
}

export async function registerForPushNotifications() {
  const {status: existingStatus} = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    Segment.trackWithProperties('Request Notification Services', {
      granted: status === 'granted',
    });
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  // await api.put(`devices/${Constants.deviceId}/push-key`, {pushKey: token});

  return token;
}
