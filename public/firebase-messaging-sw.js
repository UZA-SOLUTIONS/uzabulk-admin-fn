importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js")

firebase.initializeApp({
  messagingSenderId: "1022233967182",
})

const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
  const notificationTitle = payload.data.title
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    sound: `https://main.uza-staging.com/assets/sounds/notification-2309.wav`
  }

  var audio = new Audio(notificationOptions.sound)
  audio.play()

  let chatAudio = document.querySelector(`#${payload.data.sound}`)
  if (chatAudio) {
    chatAudio.play()
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

self.addEventListener("notificationclick", function (event) {
  console.log("On notification click: ", event.notification.tag)
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close()

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i]
          if (client.url == "/" && "focus" in client) return client.focus()
        }
        if (clients.openWindow) {
          return clients.openWindow("/")
        }
      })
  )
})
