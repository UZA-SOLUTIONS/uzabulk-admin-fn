import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, useParams } from "react-router-dom"
import {
  Card,
  Col,
  Row,
  Button,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"
import moment from "moment-timezone"

import { isEmpty } from "lodash"

//i18n
import { withTranslation } from "react-i18next"

//Import Scrollbar

import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import { deleteDisputeReply, getDispute, postDisputeReply } from "store/actions"

const Chat = ({
  onPostDisputeReply,
  dispute,
  onGetDispute,
  user,
  onDeleteDisputeReply,
  ...props
}) => {
  const { id } = useParams()

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canTransactions: false,
    canBlock: false,
  })

  const [messageBox, setMessageBox] = useState(null)

  const [notification_Menu, setnotification_Menu] = useState(false)
  const [search_Menu, setsearch_Menu] = useState(false)
  const [settings_Menu, setsettings_Menu] = useState(false)
  const [other_Menu, setother_Menu] = useState(false)
  const [activeTab, setactiveTab] = useState("1")
  const [curMessage, setcurMessage] = useState("")

  const [disputeuser, setdisputeuser] = useState({})

  const [messages, setMessages] = useState([])

  const [editId, setEditId] = useState(null)

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom()
  }, [props, messages])

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu)
  }

  //Use For Chat Box
  //   const userChatOpen = (id, name, status, roomId) => {
  //     const { onGetMessages } = props
  //     setChat_Box_Username(name)
  //     setCurrentRoomId(roomId)
  //     onGetMessages(roomId)
  //   }

  const addMessage = curMessage => {
    const message = {
      _id: id,
      replyId: "",
      sender: "admin",
      message: curMessage,
    }
    const callBack = () => {
      onGetDispute(id)
    }
    if (editId) {
      message.replyId = editId
    }
    onPostDisputeReply(message, callBack)
    setEditId(null)
    setcurMessage("")
  }

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000
    }
  }

  const onKeyPress = e => {
    const { key, value } = e
    if (key === "Enter") {
      setcurMessage(value)
      addMessage(curMessage)
    }
  }
  const didMountRef = useRef(null)

  useEffect(() => {
    onGetDispute(id)
  }, [id])

  useEffect(() => {
    setdisputeuser(dispute || {})
  }, [dispute])

  useEffect(() => {
    setMessages(dispute?.reply || {})
  }, [dispute])

  const replyHandler = (message, Id) => {
    const edit = message.message
    setcurMessage(edit)
    setEditId(Id)
  }

  const replyDeleteHandler = (message, Id) => {
    const deleteTextId = message._id
    const deletemessage = {
      _id: id,
      replyId: Id,
    }
    const callBack = () => {
      onGetDispute(id)
    }
    onDeleteDisputeReply(deletemessage, callBack)
  }

  const statusHandler = () => {
    const status = {
      _id: id,
      status: "close",
    }
    const callBack = () => {
      onGetDispute(id)
    }
    onPutDisputeStatus(status, callBack)
  }

  return (
    <div className="d-lg-flex">
      <div className="w-100 user-chat">
        <Card>
          <div>
            <div className="chat-conversation p-3">
              <ul className="list-unstyled">
                <PerfectScrollbar
                  style={{ height: "370px" }}
                  containerRef={ref => setMessageBox(ref)}
                >
                  {disputeuser?.reply?.map(message => (
                    <li
                      key={"test_k" + message._id}
                      className={message.replyBy === user.role ? "right" : ""}
                    >
                      <div className="conversation-list">
                        {message.replyBy === user.role && (
                          <UncontrolledDropdown>
                            <DropdownToggle
                              href="#"
                              className="btn nav-btn"
                              tag="i"
                            >
                              <i className="bx bx-dots-vertical-rounded" />
                            </DropdownToggle>
                            <DropdownMenu direction="right">
                              <DropdownItem
                                onClick={e =>
                                  replyHandler(message, message._id)
                                }
                              >
                                {props.t("edit")}
                              </DropdownItem>
                              <DropdownItem
                                onClick={e =>
                                  replyDeleteHandler(message, message._id)
                                }
                              >
                                {props.t("delete")}
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        )}

                        <div className="ctext-wrap">
                          <div className="conversation-name">
                            {message.replyBy === user.role
                              ? user.name
                              : message.replyBy}
                          </div>
                          <p> {message.message}</p>
                          <p className="chat-time mb-0">
                            <i className="bx bx-time-five align-middle mr-1" />
                            {moment(message.date_created).format("DD MMM YYYY")}
                            , {message.time_created}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </PerfectScrollbar>
              </ul>
            </div>
            <div className="p-3 chat-input-section">
              <Row>
                <Col>
                  <div className="position-relative">
                    <input
                      type="text"
                      value={curMessage}
                      onKeyPress={onKeyPress}
                      onChange={e => setcurMessage(e.target.value)}
                      className="form-control"
                      placeholder="Enter Message..."
                    />
                  </div>
                </Col>
                <Col className="col-auto">
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => addMessage(curMessage)}
                    className="btn-rounded chat-send w-md waves-effect waves-light"
                  >
                    <span className="d-none d-sm-inline-block mr-2">
                      {props.t("send")}
                    </span>{" "}
                    <i className="mdi mdi-send" />
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

const mapStateToProps = ({ Login, Disputes }) => ({
  dispute: Disputes.Dispute,
  user: Login.user,
})

const mapDispatchToProps = dispatch => ({
  onGetDispute: id => dispatch(getDispute(id)),
  onPostDisputeReply: (data, callBack) =>
    dispatch(postDisputeReply(data, callBack)),
  onDeleteDisputeReply: (data, callBack) =>
    dispatch(deleteDisputeReply(data, callBack)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(Chat)))
