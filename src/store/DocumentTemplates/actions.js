import {
  DOCUMENT_TEMPLATE_API_FAIL,
  GET_DOCUMENT_TEMPLATES,
  GET_DOCUMENT_TEMPLATES_FAIL,
  GET_DOCUMENT_TEMPLATES_SUCCESS,
  ADD_DOCUMENT_TEMPLATE,
  ADD_DOCUMENT_TEMPLATE_FAIL,
  ADD_DOCUMENT_TEMPLATE_SUCCESS,
  GET_DOCUMENT_TEMPLATE,
  GET_DOCUMENT_TEMPLATE_FAIL,
  GET_DOCUMENT_TEMPLATE_SUCCESS,
  PUT_DOCUMENT_TEMPLATE,
  PUT_DOCUMENT_TEMPLATE_FAIL,
  PUT_DOCUMENT_TEMPLATE_SUCCESS,
  DELETE_DOCUMENT_TEMPLATE,
  DELETE_DOCUMENT_TEMPLATE_FAIL,
  DELETE_DOCUMENT_TEMPLATE_SUCCESS,
  PUT_DOCUMENT_TEMPLATES_STATUS,
  PUT_DOCUMENT_TEMPLATES_STATUS_FAIL,
  PUT_DOCUMENT_TEMPLATES_STATUS_SUCCESS,
  GET_EDIT_DOCUMENT_TEMPLATE_FIELD,
  GET_EDIT_DOCUMENT_TEMPLATE_FIELD_FAIL,
  GET_EDIT_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
} from "./actionTypes"

/* Document template files */
import {
  ADD_DOCUMENT_TEMPLATE_FIELD,
  ADD_DOCUMENT_TEMPLATE_FIELD_FAIL,
  ADD_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
  GET_DOCUMENT_TEMPLATE_FIELD,
  GET_DOCUMENT_TEMPLATE_FIELD_FAIL,
  GET_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
  PUT_DOCUMENT_TEMPLATE_FIELD,
  PUT_DOCUMENT_TEMPLATE_FIELD_FAIL,
  PUT_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
  DELETE_DOCUMENT_TEMPLATE_FIELD,
  DELETE_DOCUMENT_TEMPLATE_FIELD_FAIL,
  DELETE_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
  PUT_DOCUMENT_TEMPLATE_FIELD_SORT,
  PUT_DOCUMENT_TEMPLATE_FIELD_SORT_FAIL,
  PUT_DOCUMENT_TEMPLATE_FIELD_SORT_SUCCESS,
} from "./actionTypes"

export const apiFail = error => ({
  type: DOCUMENT_TEMPLATE_API_FAIL,
  payload: error,
})

/* Get DocumentTemplates */
export const getDocTemplates = data => ({
  type: GET_DOCUMENT_TEMPLATES,
  payload: data,
})

export const getDocTemplatesSuccess = documentTemplates => ({
  type: GET_DOCUMENT_TEMPLATES_SUCCESS,
  payload: documentTemplates,
})

export const getDocTemplatesFail = error => ({
  type: GET_DOCUMENT_TEMPLATES_FAIL,
  payload: error,
})
/* Get DocTemplates END */

/* Add DocTemplate */
export const addDocTemplate = (documentTemplate, history) => ({
  type: ADD_DOCUMENT_TEMPLATE,
  payload: { documentTemplate, history },
})

export const addDocTemplateFail = error => ({
  type: ADD_DOCUMENT_TEMPLATE_FAIL,
  payload: error,
})

export const addDocTemplateSuccess = () => ({
  type: ADD_DOCUMENT_TEMPLATE_SUCCESS,
})
/* Add DocTemplate END */

/* Get DocTemplate */
export const getDocTemplate = id => ({
  type: GET_DOCUMENT_TEMPLATE,
  payload: id,
})

export const getDocTemplateFail = error => ({
  type: GET_DOCUMENT_TEMPLATE_FAIL,
  payload: error,
})

export const getDocTemplateSuccess = documentTemplate => ({
  type: GET_DOCUMENT_TEMPLATE_SUCCESS,
  payload: documentTemplate,
})
/* Get DocTemplate END */

/* Update DocTemplate */
export const putDocTemplate = (data, history) => ({
  type: PUT_DOCUMENT_TEMPLATE,
  payload: { data, history },
})

export const putDocTemplateFail = error => ({
  type: PUT_DOCUMENT_TEMPLATE_FAIL,
  payload: error,
})

export const putDocTemplateSuccess = () => ({
  type: PUT_DOCUMENT_TEMPLATE_SUCCESS,
})
/* Update DocTemplate END */

/* Delete DocTemplate */
export const deleteDocTemplate = (data, callback) => ({
  type: DELETE_DOCUMENT_TEMPLATE,
  payload: { data, callback },
})

export const deleteDocTemplateFail = error => ({
  type: DELETE_DOCUMENT_TEMPLATE_FAIL,
  payload: error,
})

export const deleteDocTemplateSuccess = () => ({
  type: DELETE_DOCUMENT_TEMPLATE_SUCCESS,
})
/* Delete Faz END */

/* Update Multi DocTemplates Status */
export const putDocTemplatesStatus = (data, callback) => ({
  type: PUT_DOCUMENT_TEMPLATES_STATUS,
  payload: { data, callback },
})

export const putDocTemplatesStatusFail = error => ({
  type: PUT_DOCUMENT_TEMPLATES_STATUS_FAIL,
  payload: error,
})

export const putDocTemplatesStatusSuccess = () => ({
  type: PUT_DOCUMENT_TEMPLATES_STATUS_SUCCESS,
})
/* Update Multi DocTemplates Status END */

/* 
****************
Fields
****************
*/
/* Add DocTemplate Field */
export const addDocTemplateField = (documentTemplateField, history) => ({
  type: ADD_DOCUMENT_TEMPLATE_FIELD,
  payload: { documentTemplateField, history },
})

export const addDocTemplateFieldFail = error => ({
  type: ADD_DOCUMENT_TEMPLATE_FIELD_FAIL,
  payload: error,
})

export const addDocTemplateFieldSuccess = () => ({
  type: ADD_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
})
/* Add DocTemplate END */

/* Get DocTemplate Field */
export const getDocTemplateField = id => ({
  type: GET_DOCUMENT_TEMPLATE_FIELD,
  payload: id,
})

export const getDocTemplateFieldFail = error => ({
  type: GET_DOCUMENT_TEMPLATE_FIELD_FAIL,
  payload: error,
})

export const getDocTemplateFieldSuccess = documentTemplate => ({
  type: GET_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
  payload: documentTemplate,
})
/* Get DocTemplate Field END */

/* Update DocTemplate Field */
export const putDocTemplateField = (data, history) => ({
  type: PUT_DOCUMENT_TEMPLATE_FIELD,
  payload: { data, history },
})

export const putDocTemplateFieldFail = error => ({
  type: PUT_DOCUMENT_TEMPLATE_FIELD_FAIL,
  payload: error,
})

export const putDocTemplateFieldSuccess = () => ({
  type: PUT_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
})
/* Update DocTemplate Field END */

/* Delete DocTemplate Field */
export const deleteDocTemplateField = (data, callback) => ({
  type: DELETE_DOCUMENT_TEMPLATE_FIELD,
  payload: { data, callback },
})

export const deleteDocTemplateFieldFail = error => ({
  type: DELETE_DOCUMENT_TEMPLATE_FIELD_FAIL,
  payload: error,
})

export const deleteDocTemplateFieldSuccess = () => ({
  type: DELETE_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
})
/* Delete DocTemplate Field END */

/* Update doc template sort order */
export const putDocTemplateFieldSort = (data, id) => ({
  type: PUT_DOCUMENT_TEMPLATE_FIELD_SORT,
  payload: { data, id },
})

export const putDocTemplateFieldSortFail = error => ({
  type: PUT_DOCUMENT_TEMPLATE_FIELD_SORT_FAIL,
  payload: error,
})

export const putDocTemplateFieldSortSuccess = () => ({
  type: PUT_DOCUMENT_TEMPLATE_FIELD_SORT_SUCCESS,
})
/* Update doc template sort order */



/* Get Edit DocTemplate Field */
export const getEditDocTemplateField = id => ({
  type: GET_EDIT_DOCUMENT_TEMPLATE_FIELD,
  payload: id,
})

export const getEditDocTemplateFieldFail = error => ({
  type: GET_EDIT_DOCUMENT_TEMPLATE_FIELD_FAIL,
  payload: error,
})

export const getEditDocTemplateFieldSuccess = documentTemplate => ({
  type: GET_EDIT_DOCUMENT_TEMPLATE_FIELD_SUCCESS,
  payload: documentTemplate,
})
/* Get  Edit DocTemplate Field END */