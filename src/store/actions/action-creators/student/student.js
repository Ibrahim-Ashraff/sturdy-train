import { path } from '../../../../constants';
import HttpRequest from '../../../../services/http-request';

import {
  getStudentsRequesting,
  getStudentsSuccess,
  getStudentsFail,

  addStudentRequesting,
  addStudentSuccess,
  addStudentFail,

  addCertificateRequesting,
  addCertificateSuccess,
  addCertificateFail,

  getCertificatesRequesting,
  getCertificatesSuccess,
  getCertificatesFail
} from '../../action-types';

export const getStudents = () => {

  return async dispatch => {

    dispatch(getStudentsRequesting());

    try {

      let httpResponse = await HttpRequest("GET", {}, path.students, 10000, true);


      if (httpResponse) {


        let statusCode = httpResponse.data.status;
        let response = httpResponse.data.students;
        let message = response.info;

        let students = response;

        if ((statusCode && statusCode === 200)) {
          dispatch(getStudentsSuccess(students));

        } else {
          dispatch(getStudentsFail(message));
        }

        console.log(httpResponse, 'response')
      }
    } catch (error) {
      // let errorMessage = (error.response && error.response.data && error.response.data.meta) ? error.response.data.meta.info : error.message === "timeout of 10000ms exceeded" ? 'Network timeout' : error.message;
      dispatch(getStudentsFail(error));
    }
  }
}

export const getCertificates = () => {

  return async dispatch => {

    dispatch(getCertificatesRequesting());

    try {

      let httpResponse = await HttpRequest("GET", {}, path.certificate, 10000, true);


      if (httpResponse) {

        console.log("certificate", httpResponse)

        let statusCode = httpResponse.data.status;
        let response = httpResponse.data.certificates;
        let message = response.info;

        let certificates = response;

        if ((statusCode && statusCode === 200)) {
          dispatch(getCertificatesSuccess(certificates));

        } else {
          dispatch(getCertificatesFail(message));
        }

      }
    } catch (error) {
      // let errorMessage = (error.response && error.response.data && error.response.data.meta) ? error.response.data.meta.info : error.message === "timeout of 10000ms exceeded" ? 'Network timeout' : error.message;
      dispatch(getCertificatesFail(error));
    }
  }
}


export const addStudent = (student) => {
  return async (dispatch) => {

    dispatch(addStudentRequesting());

    try {
      const requestPayload = {

        firstName: student.firstName,
        lastName: student.lastName,
        otherName: student.middleName,
        matricNumber: student.matricNumber,
        email: student.email,
        role: "student",
        password: student.password,
        gender: student.gender,

      }

      let httpResponse = await HttpRequest('POST', requestPayload, path.addUser, 10000, true);

      if (httpResponse) {

        console.log("http response add", httpResponse)
        let statusCode = httpResponse.data.status;
        let response = httpResponse.data.user;
        let message = response.info;

        if (statusCode && statusCode === 201) {
          dispatch(addStudentSuccess());
        } else {
          dispatch(addStudentFail(message));
        }

      }

    } catch (error) {
      dispatch(addStudentFail(error));
    }
  }
}

export const addCertificate = (student) => {
  return async (dispatch) => {

    dispatch(addCertificateRequesting());

    try {
      const requestPayload = {
        course: student.course,
        department: student.department,
        degree: student.degree,
        grade: student.grade,
        date: student.date,
        student: student.id,
      }

      let httpResponse = await HttpRequest('POST', requestPayload, path.certificate, 10000, true);

      if (httpResponse) {



        let statusCode = httpResponse.data.status;
        let response = httpResponse.data;
        let message = response;


        if (statusCode && statusCode === 201) {
          dispatch(addCertificateSuccess());
        } else {
          dispatch(addCertificateFail(message));
        }

      }

    } catch (error) {
      dispatch(addCertificateFail(error));
    }
  }
}
