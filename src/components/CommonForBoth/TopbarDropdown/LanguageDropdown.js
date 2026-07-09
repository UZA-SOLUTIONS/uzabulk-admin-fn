import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"
import { get, map } from "lodash"
import { withTranslation } from "react-i18next"

// Helper
import { updateLanguage } from "helpers/api_helper"

//i18n
import i18n from "../../../i18n"
import languages from "common/languages"

const LanguageDropdown = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [selectedLang, setSelectedLang] = useState("")
  const [slng, setSlng] = useState()
  const [selectedLanguage, setSelectedLanguage] = useState()
  const [menu, setMenu] = useState(false)

  const [languageOptions, setLanguageOptions] = useState()

  useEffect(() => {
    i18n.changeLanguage(localStorage?.getItem("I18N_LANGUAGE") || "en")
    const currentLanguage = localStorage?.getItem("I18N_LANGUAGE") || "en"
    setSelectedLang(currentLanguage)

    updateLanguage(currentLanguage)
  }, [])

  useEffect(() => {
    setLanguageOptions(props?.language)
  }, [props?.language])





  const changeLanguageAction = lang => {
    //set language as i18n
    i18n.changeLanguage(lang?.code)
    localStorage.setItem("I18N_LANGUAGE", lang?.code)
    setSelectedLang(lang?.code)
    updateLanguage(lang?.code)
  }

  const toggle = () => {
    setMenu(!menu)
  }
  useEffect(() => {
    setSelectedLanguage(props?.language?.filter((lg) => lg.code == selectedLang))

  }, [selectedLang])

  let data = { ...selectedLanguage }


  return (
    <>
      <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
        <DropdownToggle className="btn header-item waves-effect" tag="button">
          <img
            src={data[0]?.flag}
            alt="uza"
            height="16"
            className="mr-1"
          />
          <span className="align-middle">
            {data[0]?.name}
          </span>
        </DropdownToggle>
        <DropdownMenu className="language-switch" right>
          {props?.language?.map((lan, index) => (
            <DropdownItem
              key={index}
              onClick={() => changeLanguageAction(lan)}

            >
              <img
                src={lan.flag}
                alt="uza"
                className="mr-1"
                height="12"
              />
              <span className="align-middle">

                {lan?.name}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

const mapStateToProps = ({ Settings }) => ({
  language: Settings?.settings?.storeLanguage
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LanguageDropdown))
