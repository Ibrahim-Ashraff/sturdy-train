import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import faker from 'faker';
import { getStudents, addStudent, addCertificate } from '../../../store/actions';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Empty from "../../../assets/images/empty.svg";
import utils from "../../../utils";
import Modal from '../../../components/UI/Modal/Modal';
import Toast from '../../../components/UI/Toast/Toast';
import FormGroup, { input as Input } from '../../../components/UI/Input/Input';
import { ContainedButton, GrayButton, } from '../../../components/UI/Button/Button';
import { toast } from "react-toastify";

const Students = (props) => {

  // Dispatch
  const dispatch = useDispatch();

  // Redux Store
  const studentReducer = useSelector((state) => state.studentReducer);
  const getStudentsRequesting = studentReducer?.getStudentsRequesting;
  const students = studentReducer?.students;
  const addStudentRequesting = studentReducer?.addStudentRequesting;
  const addStudentSuccess = studentReducer?.addStudentSuccess;
  const addStudentError = studentReducer?.addStudentError;
  const addCertificateRequesting = studentReducer?.addCertificateRequesting;
  const addCertificateSuccess = studentReducer?.addCertificateSuccess;
  const addCertificateError = studentReducer?.addCertificateError;

  const [showModal, setShowModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);
  const [certFormIsValid, setCertFormIsValid] = useState(false);
  const [certName, setCertName] = useState("")

  const [id, setId] = useState("")

  const [formData, setFormData] = useState({
    firstName: {
      type: "input",
      value: "",
      preset: {
        label: `First name `,
        name: "firstName",
        type: "text",
        placeholder: "e.g John",
        required: 'required'
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    middleName: {
      type: "input",
      value: "",
      preset: {
        label: "Middle name",
        name: "middleName",
        type: "text",
        placeholder: "e.g Alan",
      },
      validation: {
        isEmpty: false,
        valid: false,
        required: false,
      },
    },
    lastName: {
      type: "input",
      value: "",
      preset: {
        label: "Last name",
        name: "lastName",
        type: "text",
        placeholder: "e.g Smith",
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    gender: {
      type: "select",
      value: "",
      preset: {
        label: "Gender",
        name: "gender",
        type: "text",
        placeholder: "",
        options: [
          { value: "Male", name: "Male" },
          { value: "Female", name: "Female" },
          { value: "Others", name: "Others" },

        ],
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    email: {
      type: "input",
      value: "",
      preset: {
        label: "Email",
        name: "email",
        type: "text",
        placeholder: "johnsmith@gmail.com",
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
        isEmail: true,
      },
    },
    password: {
      type: "input",
      value: "",
      preset: {
        label: "Password",
        name: "password",
        type: "text",
        placeholder: "",
        required: 'required'
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    matricNumber: {
      type: "input",
      value: "",
      preset: {
        label: `Matric Number `,
        name: "matricNumber",
        type: "text",
        placeholder: "ABC/11/22",
        required: 'required'
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
  });

  const [certFormData, setCertFormData] = useState({
    course: {
      type: "input",
      value: "",
      preset: {
        label: `Course `,
        name: "course",
        type: "text",
        placeholder: "e.g computer science",
        required: 'required'
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    department: {
      type: "input",
      value: "",
      preset: {
        label: "Department",
        name: "department",
        type: "text",
        placeholder: "e.g Physics",
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    degree: {
      type: "input",
      value: "",
      preset: {
        label: "Degree",
        name: "degree",
        type: "text",
        placeholder: "e.g bachelor of science",
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },

    grade: {
      type: "input",
      value: "",
      preset: {
        label: "Grade",
        name: "grade",
        type: "text",
        placeholder: "e.g first class honours",
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },

    date: {
      type: "date",
      value: "",
      preset: {
        label: `Date of Graduation`,
        name: "date",
        type: "date",
        placeholder: "",
        required: 'required'
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
  })



  // Functions
  const initials = (name) => {
    const nameArr = name.split(" ");
    return nameArr[0].slice(0, 1) + nameArr[1].slice(0, 1);
  };

  const getAllStudents = () => {
    dispatch(getStudents());

  };

  const goToUserDetails = (studentId, studentName) => {
    setId(studentId)
    setShowCertModal(true)
    setCertName(studentName)
  };

  console.log("student id", id)



  // Extract form inputs from formData state
  let formElem = [];
  for (let key in formData) {
    formElem.push({
      id: key,
      properties: formData[key],
    });
  }


  let certFormElem = [];
  for (let key in certFormData) {
    certFormElem.push({
      id: key,
      properties: certFormData[key],
    });
  }

  const changeHandler = (e, elem) => {

    let formDataClone = { ...formData }; // clone a copy of the formData state

    let inputElem = { ...formDataClone[elem] }; // clone a copy of the targeted input element from the formData

    /*
     * update the value of the input with the values keyed in by the user
     * and validate the value entered by the user
     */
    inputElem.value = e.target.value;
    const checkingValidity = utils.checkValidity(
      inputElem.value,
      inputElem.validation
    );

    inputElem.validation.isEmpty = !(inputElem.value.length > 0);
    inputElem.validation.valid = checkingValidity.valid;
    inputElem.errorMessage = checkingValidity.message;
    inputElem.touched = true;

    formDataClone[elem] = inputElem;

    let formIsValid = true;

    for (let elem in formDataClone) {
      if (formDataClone[elem].validation.required) {
        formIsValid = formDataClone[elem].validation.valid && formIsValid;
      }
    }

    setFormData(formDataClone);
    setFormIsValid(formIsValid);

  }

  const certChangeHandler = (e, elem) => {

    let formDataClone = { ...certFormData }; // clone a copy of the formData state

    let inputElem = { ...formDataClone[elem] }; // clone a copy of the targeted input element from the formData

    /*
     * update the value of the input with the values keyed in by the user
     * and validate the value entered by the user
     */
    inputElem.value = e.target.value;
    const checkingValidity = utils.checkValidity(
      inputElem.value,
      inputElem.validation
    );

    inputElem.validation.isEmpty = !(inputElem.value.length > 0);
    inputElem.validation.valid = checkingValidity.valid;
    inputElem.errorMessage = checkingValidity.message;
    inputElem.touched = true;

    formDataClone[elem] = inputElem;

    let certFormIsValid = true;

    for (let elem in formDataClone) {
      if (formDataClone[elem].validation.required) {
        certFormIsValid = formDataClone[elem].validation.valid && certFormIsValid;
      }
    }

    setCertFormData(formDataClone);
    setCertFormIsValid(certFormIsValid);

  }


  // Use Effects
  useEffect(() => {
    getAllStudents();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (addStudentSuccess) {
      getAllStudents();
      toast.success("Student has been created successfully", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    // eslint-disable-next-line
  }, [addStudentSuccess]);

  useEffect(() => {
    if (addCertificateSuccess) {
      getAllStudents();
      toast.success("Certificate has been created successfully", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    // eslint-disable-next-line
  }, [addCertificateSuccess]);

  useEffect(() => {
    if (addStudentError) {
      toast.error(addStudentError, {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [addStudentError]);


  useEffect(() => {
    if (addCertificateError) {
      toast.error(addCertificateError, {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [addCertificateError]);


  let table = null

  if (getStudentsRequesting) {
    table = <Spinner style={{ top: "50em" }} />;
  }


  if (students) {


    table = (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Matric Number</th>
              <th>Email</th>
              <th>Gender</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((students) => {
                const color = faker.internet.color();
                const bgColor = color + "40";
                let init = students.firstName + " " + students.lastName;
                return (
                  <tr
                    key={students.employment_id}>
                    <td className="name-container">
                      <div
                        className="initials"
                        style={{ backgroundColor: bgColor, color: color }}
                      >
                        {initials(init)}
                      </div>
                      <span className="name">
                        {" "}
                        {students.firstName} {students.otherName}{" "}
                        {students.lastName}
                      </span>
                    </td>
                    <td>{students.matricNumber}</td>
                    <td>{students.email}</td>
                    <td>{students.gender}</td>
                    <td className="text-right">
                      <button className='button button--contained' onClick={() => goToUserDetails(students.id, students.firstName)}
                      >Create Certificate</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">
                  <img src={Empty} alt="Empty" />
                  <p className="text-align-center">
                    No Records Found
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </>
    );
  }

  const closeModal = () => {
    setShowModal(false);

    let formDataClone = { ...formData };
    for (let key in formDataClone) {
      formDataClone[key].value = "";
    }

    setFormIsValid(false);
  };

  const addStudentHandler = (e) => {
    e.preventDefault();

    let student = {};
    student["firstName"] = formData.firstName.value;
    student["middleName"] = formData.middleName.value;
    student["lastName"] = formData.lastName.value;
    student["email"] = formData.email.value;
    student["gender"] = formData.gender.value;
    student["matricNumber"] = formData.matricNumber.value;
    student["password"] = formData.password.value;

    dispatch(addStudent(student))

  };

  const addCertificateHandler = (e) => {
    e.preventDefault();

    let student = {};
    student["course"] = certFormData.course.value;
    student["department"] = certFormData.department.value;
    student["degree"] = certFormData.degree.value;
    student["grade"] = certFormData.grade.value;
    student["date"] = certFormData.date.value;
    student["id"] = id;


    dispatch(addCertificate(student))

  };

  const openModalForAddStudent = () => {
    setShowModal(true);

  };


  let buttonClasses = ["small"];
  if (addStudentRequesting || addCertificateRequesting) {
    buttonClasses.push("button--loading");
  }

  const addArmModalContent = (
    <>
      <h1 className="modal-title">
        Create Student
      </h1>
      <div className="form">
        <form onSubmit={addStudentHandler}>
          {formElem.map((elem) => {
            return (
              <FormGroup key={elem.id}>
                <Input
                  extraClass={elem.properties.extraClass}
                  touched={elem.properties.touched}
                  changed={(e) => changeHandler(e, elem.id)}
                  value={elem.properties.value}
                  empty={!(elem.properties.value.length > 0)}
                  validation={elem.properties.validation}
                  type={elem.properties.type}
                  preset={elem.properties.preset}
                  errorMessage={elem.properties.errorMessage}
                />
              </FormGroup>
            );
          })}

          <div className="form-action flex justify-flex-end">
            <GrayButton
              type="button"
              onClick={closeModal}
              classess="small mr-2"
            >
              Cancel
            </GrayButton>
            <ContainedButton
              disabled={
                !formIsValid || addStudentRequesting
              }
              type="submit"
              classess={buttonClasses.join(" ")}
            >
              Create Student
            </ContainedButton>
          </div>
        </form>
      </div>
    </>
  );

  const addCertModalContent = (
    <>
      <h1 className="modal-title">
        Create Certificate for {certName}
      </h1>
      <div className="form">
        <form onSubmit={addCertificateHandler}>
          {certFormElem.map((elem) => {
            return (
              <FormGroup key={elem.id}>
                <Input
                  extraClass={elem.properties.extraClass}
                  touched={elem.properties.touched}
                  changed={(e) => certChangeHandler(e, elem.id)}
                  value={elem.properties.value}
                  empty={!(elem.properties.value.length > 0)}
                  validation={elem.properties.validation}
                  type={elem.properties.type}
                  preset={elem.properties.preset}
                  errorMessage={elem.properties.errorMessage}
                />
              </FormGroup>
            );
          })}

          <div className="form-action flex justify-flex-end">
            <GrayButton
              type="button"
              onClick={() => setShowCertModal(false)}
              classess="small mr-2"
            >
              Cancel
            </GrayButton>
            <ContainedButton
              disabled={
                !certFormIsValid || addCertificateRequesting
              }
              type="submit"
              classess={buttonClasses.join(" ")}
            >
              Create Certificate
            </ContainedButton>
          </div>
        </form>
      </div>
    </>
  );


  return (
    <React.Fragment>


      <Toast style={{ backgroundColor: "#2ECC40" }} />
      <Modal show={showModal} closeModal={closeModal}>
        {addArmModalContent}
      </Modal>

      <Modal show={showCertModal} closeModal={() => setShowCertModal(false)}>
        {addCertModalContent}
      </Modal>

      <div className="table-widget" style={{ marginTop: "30px" }}>
        <div></div>
        <ContainedButton onClick={openModalForAddStudent} classess="small">
          Add Student
        </ContainedButton>
      </div>


      {table}


    </React.Fragment>
  );
};

export default Students;
