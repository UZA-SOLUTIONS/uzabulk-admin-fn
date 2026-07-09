const express = require("express")
const path = require("path")
const logger = require("morgan")
const app = express()

app.use(logger("dev"))

const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === "staging") {
  app.use(express.static(path.join(__dirname, "dist")))

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "200.html"))
  })
} else if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")))

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "200.html"))
  })
}

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
