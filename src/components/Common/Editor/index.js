import React from "react"
import CKEditor from "react-ckeditor-component"

const Editor = props => {
  return (
    <CKEditor
      {...props}
      events={{
        change: evt => {
          const data = evt?.editor?.getData()

          props.onChange &&
            props.onChange({
              target: { value: data },
            })
        },
      }}
      config={{
        height: 250,
        toolbar: [
          [
            "Undo",
            "Redo",
            "Font",
            "FontSize",
            "Styles",
            "Format",
            "-",
            "Maximize",
            "-",
            "Source",
          ],
          [
            "Bold",
            "Italic",
            "Underline",
            "Strike",
            "-",
            "RemoveFormat",
            "-",
            "NumberedList",
            "BulletedList",
          ],
          [
            "Link",
            "Unlink",
            "-",
            "JustifyLeft",
            "JustifyCenter",
            "JustifyRight",
            "JustifyBlock",
            "-",
            "Outdent",
            "Indent",
            "-",
            "TextColor",
            "BGColor",
          ],
          [
            "Image",
            "Table",
            "HorizontalRule",
            "SpecialChar",
            "-",
            "Blockquote",
          ],
        ],
      }}
      scriptUrl="https://cdn.ckeditor.com/4.16.0/full/ckeditor.js"
    />
  )
}

export default Editor
