import { USER_AUTH_KEY } from "helpers/contants"

export default function (editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    return new MyUploadAdapter(loader)
  }
}

class MyUploadAdapter {
  constructor(props) {
    // CKEditor 5's FileLoader instance.
    this.loader = props
    // URL where to send files.
    this.url = `https://api.projectName.com/authenticationservice/api/v1/file/add`
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest()
      this._initListeners(resolve, reject)
      this._sendRequest()
    })
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest())

    const obj = JSON.parse(localStorage.getItem(USER_AUTH_KEY))

    let token

    if (obj && obj.token) {
      token = "Bearer " + obj.token
    }

    xhr.open("POST", this.url, true)
    xhr.responseType = "json"
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
    xhr.setRequestHeader("Authorization", token)
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const xhr = this.xhr
    const loader = this.loader
    const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`

    xhr.addEventListener("error", () => reject(genericErrorText))
    xhr.addEventListener("abort", () => reject())
    xhr.addEventListener("load", () => {
      const response = xhr.response
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        )
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.data.link,
      })
    })

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", evt => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total
          loader.uploaded = evt.loaded
        }
      })
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    const data = new FormData()

    this.loader.file.then(result => {
      data.append("file", result)
      this.xhr.send(data)
    })
  }
}
