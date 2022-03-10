import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'
const RemotePushController = ({onToken}) => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token)
        onToken(token.token)
      },
// (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification);
        PushNotification.localNotification({
          autoCancel: true,
          title: notification.title,
          message: notification.message,
          vibrate: true,
          vibration: 300,
          playSound: true,
          soundName: 'default'
        })
// process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '143680322716',
      popInitialNotification: true,
      requestPermissions: true,
      
    })
  }, [])
return null
}
export default RemotePushController