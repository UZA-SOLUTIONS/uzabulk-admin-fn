import React, { useState } from 'react'
import { Button, Col, Input, Row } from 'reactstrap'

const ReturnType = (props) => {

    const { setFields, fields, } = props
    // console.log(fields ,m");

    const [noOfReturnType, setNoOfReturnType] = useState()

    const handleReturnType = (index) => (e) => {
        console.log(e.target.value, "p", index);
        setFields((pre) => ({
            ...pre,
            returnTypeList: [
                ...pre.returnTypeList.slice(0, index),
                e.target.value,
                ...pre.returnTypeList.slice(index + 1),

            ]
        }))
    }
    function addOption() {
        setFields((pre) => ({
            ...pre,
            returnTypeList: [...pre.returnTypeList, " "]
        }))
    }

    function removeOption(index) {
        setFields((pre) => ({
            ...pre,
            returnTypeList: [
                ...pre.returnTypeList.slice(0, index),
                ...pre.returnTypeList.slice(index + 1),

            ]
        }))
    }
    return (

        <Row>
            <Col lg={4}>
                <div className="label-content">
                    <h4>{props.t("return_type")}<span className="text-danger ml-1">*</span></h4>
                </div>
            </Col>
            {fields?.map((re, index) => {
                return (
                    <>
                        <Col lg={6}>
                            <Input className='mb-2' required type="text" onChange={handleReturnType(index)}
                                value={re} />
                        </Col>
                        <Col lg={2}>
                            {console.log(fields?.map.length, 45)}
                            <Button
                                color={fields?.length > 1 ? "danger" : "secondary"}
                                onClick={() => { fields?.length > 1 && removeOption(index) }}>
                                Remove
                            </Button>
                        </Col>
                        <Col lg={4}></Col>
                    </>
                )
            })}
            <Col>
                <Button onClick={addOption}>+</Button>
            </Col>


        </Row >

    )
}

export default ReturnType