import firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/messaging"

class FirebaseAuthBackend {
  constructor(firebaseConfig, name) {
    if (firebaseConfig && name) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig, name)

      this.name = name;
    } else if (firebaseConfig) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig)
    }
  }

  onMessageListener = () => {
    let messaging

    if (this.name) {
      messaging = firebase.app(this.name).messaging()
    } else {
      messaging = firebase.messaging()
    }

    return new Promise(resolve => {
      messaging.onMessage(payload => {
        resolve(payload)
      })
    })
  }

  /**
   * get notifications token
   */
  getToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let messaging

        if (this.name) {
          messaging = firebase.app(this.name).messaging()
        } else {
          messaging = firebase.messaging()
        }

        const token = await messaging.getToken()

        await messaging.onMessage()

        resolve(token)
      } catch (error) {
        reject(this._handleError(error))
        console.error(error)
      }
    })
  }

  /**
   * Ask user for permission to receive notifications
   */
  askForPermission = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let messaging;

        if (this.name) {
          messaging = firebase.app(this.name).messaging()
        } else {
          messaging = firebase.messaging()
        }

        await Notification.requestPermission()
        const token = await messaging.getToken()

        resolve(token)
      } catch (error) {
        reject(this._handleError(error))
        console.error(error)
      }
    })
  }

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message
    return errorMessage
  }
}

let _fireBaseBackend = {}

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = (config, name) => {
  if (!_fireBaseBackend[name]) {
    _fireBaseBackend[name] = new FirebaseAuthBackend(config, name)
  }

  return _fireBaseBackend[name]
}

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = (name) => {
  return _fireBaseBackend[name]
}

export { initFirebaseBackend, getFirebaseBackend }
