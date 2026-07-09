// import React, { useState } from "react"
// import { Button, Col, Input, Label } from "reactstrap"

// const Automark = props => {
//   const { t } = props
//   const [inputFields, setInputFields] = useState([{ time: [], status: "" }])

//   console.log("inputFields", inputFields)

//   const handleChange = (index, event) => {
//     const { value } = event.target
//     const updatedTime = [...inputFields?.time]
//     updatedTime[index] = value

//     setInputFields({ ...inputFields, time: updatedTime })
//   }

//   const handleAddField = () => {
//     setInputFields([...inputFields, { time: "" }])
//   }

//   const handleRemoveField = index => {
//     if (inputFields.length > 1) {
//       const values = [...inputFields]
//       values.splice(index, 1)
//       setInputFields(values)
//     }
//   }

// //   const handleSubmit = event => {
// //     event.preventDefault()
// //     // Access the input field values in 'inputFields' state
// //     const inputData = inputFields.map(field => field.time)
// //     console.log(inputData)
// //   }

//   // const handleStoreSwitch = (value) => {
//   //     console.log('value1111111', value)
//   //     setInputFields((prev) => ({ ...prev, status:value }))
//   // }

//   return (
//     <div>
//       <Col md={12} className="my-3">
//         <div className="d-flex align-items-center justify-content-between">
//           <h5 className="text-uppercase">{props.t("Auto Time Ready")}</h5>
//         </div>
//       </Col>
//       {inputFields.map((inputField, index) => (
//         <div key={index}>
//           <Col xs={6} sm={6} md={6}>
//             <Label className="text-uppercase">{props.t("time")}</Label>
//             <Input
//               type="number"
//               value={inputField.time}
//               onChange={event => handleChange(index, event)}
//             />
//           </Col>

//           {inputFields.length > 1 && (
//             <Col xs={6} sm={3} md={2} className="my-2">
//               <div className="btn-box">
//                 <Button
//                   className="btn-primary w-100"
//                   onClick={() => handleRemoveField(index)}
//                 >
//                   Remove
//                 </Button>
//               </div>
//             </Col>
//           )}
//         </div>
//       ))}

//       <Col xs={6} sm={3} md={3} className="mt-3">
//         <Label className="text-capitalize">{props.t("status")}</Label>

//         <div className="status-switch square-switch ">
//           <input
//             type="checkbox"
//             switch="none"
//             id="autotimeready"
//             checked={inputFields?.status}
//             onClick={event => {
//               //   handleStoreSwitch(event.target.checked)
//               // console.log("event is", event.target.checked)
//               // const list = [...inputList]
//               // list[i]["status"] = event.target.checked
//               // setInputList(list)
//             }}
//           />
//           <label
//             htmlFor="autotimeready"
//             data-on-label={"YES"}
//             data-off-label={"NO"}
//             id={`autotimeready`}
//           />
//         </div>
//       </Col>

//       <div className="btn-box text-end pb-4 border-bottom">
//         <Button className="btn-primary" onClick={handleAddField}>
//           ADD Store Link
//         </Button>
//       </div>

//     </div>
//   )
// }
// export default Automark

import React, { useState } from "react"
import { Button, Col, Input, Label, Row } from "reactstrap"

const Automark = props => {
  const {
    t,
    handleTimeReady,
    inputFields,
    handleRemoveField,
    handleAddField,
    handleStoreSwitch,
  } = props
 

  console.log("inputFields=======>1", inputFields.status)



  return (
    <div>
      <Row className="row align-items-end">
        <Col md={12} className="my-3">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="text-uppercase ">{props.t("autor-time-ready")}</h4>
          </div>
        </Col>
        {inputFields.time.map((data, index) => (
          <>
            <Col xs={6} sm={6} md={6} className="my-2">
              <Label className="text-uppercase">{props.t("time_mins")}</Label>
              <Input
                type="number"
                name="time"
                min="1"
                value={data}
                onChange={event => handleTimeReady(event, index, "selector")}
              />
            </Col>

            {inputFields.time.length > 1 && (
              <Col xs={6} sm={3} md={2} className="my-2">
                <div className="btn-box">
                  <Button
                    className="btn-primary w-100"
                    onClick={() => handleRemoveField(index)}
                  >
                    Remove
                  </Button>
                </div>
              </Col>
            )}
          </>
        ))}
        {inputFields.time.length <5  &&
          <Col xs={6} sm={3} md={2} className="my-2">
            <Button className="btn-primary w-100" onClick={handleAddField}>
              Add
            </Button>
          </Col>}
        <Col xs={6} sm={3} md={3} className="mt-3">
          <Label className="text-capitalize">{props.t("status")}</Label>

          <div className="status-switch square-switch ">
            <input
              type="checkbox"
              switch="none"
              id="autotimeready"
              checked={inputFields?.status}
              onClick={event => {
                handleStoreSwitch(event.target.checked)
                // console.log("event is", event.target.checked)
                // const list = [...inputList]
                // list[i]["status"] = event.target.checked
                // setInputList(list)
              }}
            />
            <label
              htmlFor="autotimeready"
              data-on-label={"YES"}
              data-off-label={"NO"}
              id={`autotimeready`}
            />
          </div>
        </Col>
      </Row>

      <div className="btn-box text-end pb-4 border-bottom"></div>
    </div>
  )
}

export default Automark
