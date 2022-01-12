import { studentContants } from '../../../constants';

const {
  GET_STUDENTS_REQUESTING,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAIL,

  GET_STUDENT_REQUESTING,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FAIL,

  ADD_STUDENT_REQUESTING,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,

  GET_CERTIFICATES_REQUESTING,
  GET_CERTIFICATES_SUCCESS,
  GET_CERTIFICATES_FAIL,

  ADD_CERTIFICATE_REQUESTING,
  ADD_CERTIFICATE_SUCCESS,
  ADD_CERTIFICATE_FAIL,



} = studentContants;




const initialState = {
  getStudentsRequesting: false,
  getStudentsError: null,
  students: [],


  getCertificatesRequesting: false,
  getCertificatesError: null,
  certificates: [],

  getStudentRequesting: false,
  getStudentError: null,
  student: [],

  addStudentRequesting: false,
  addStudentSuccess: null,
  addStudentError: null,

  addCertificateRequesting: false,
  addCertificateSuccess: null,
  addCertificateError: null,



}

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {

    case GET_STUDENTS_REQUESTING:
      return {
        getStudentsRequesting: true
      }
    case GET_STUDENTS_SUCCESS:
      return {
        getStudentsRequesting: false,
        students: action.students,

      }
    case GET_STUDENTS_FAIL:
      return {
        getStudentsRequesting: false,
        getStudentsError: action.error
      }

    case GET_CERTIFICATES_REQUESTING:
      return {
        getCertificatesRequesting: true
      }
    case GET_CERTIFICATES_SUCCESS:
      return {
        getCertificatesRequesting: false,
        certificates: action.certificates,

      }
    case GET_CERTIFICATES_FAIL:
      return {
        getCertificatesRequesting: false,
        getCertificatesError: action.error
      }

    case GET_STUDENT_REQUESTING:
      return {
        getStudentRequesting: true
      }
    case GET_STUDENT_SUCCESS:
      return {
        getStudentRequesting: false,
        student: action.student
      }
    case GET_STUDENT_FAIL:
      return {
        getStudentRequesting: false,
        getStudentError: action.error
      }

    case ADD_STUDENT_REQUESTING:
      return {
        addStudentRequesting: true
      }
    case ADD_STUDENT_SUCCESS:
      return {
        addStudentRequesting: false,
        addStudentSuccess: true
      }
    case ADD_STUDENT_FAIL:
      return {
        addStudentError: action.error,
        addStudentRequesting: false,
      }
    case ADD_CERTIFICATE_REQUESTING:
      return {
        addCertificateRequesting: true
      }
    case ADD_CERTIFICATE_SUCCESS:
      return {
        addCertificateRequesting: false,
        addCertificateSuccess: true
      }
    case ADD_CERTIFICATE_FAIL:
      return {
        addCertificateError: action.error,
        addCertificateRequesting: false,
      }

    default:
      return state;
  }
}