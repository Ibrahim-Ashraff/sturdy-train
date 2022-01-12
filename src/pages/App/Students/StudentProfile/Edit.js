import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import FormGroup, { input as Input } from "../../../../components/UI/Input/Input";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";

import {
  getStudentBio,
  editStudent,
  getClassRoom,
  getHouses,
} from "../../../../store/actions";
import utils from "../../../../utils";
import { ContainedButton } from "../../../../components/UI/Button/Button";
import { FiCamera } from "react-icons/fi";
import { toast } from "react-toastify";
import { Options } from "react-naija-states";
import GoBack from "../../../../components/Back/Back";
import { newCountry } from "../../../../utils/country";

import Toast from "../../../../components/UI/Toast/Toast";

const EditStudent = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();

  // Redux store
  const studentReducer = useSelector((state) => state.studentReducer);
  const getStudentRequesting = studentReducer?.getStudentRequesting;
  const getStudentError = studentReducer?.getStudentError;

  const editStudentRequesting = studentReducer?.editStudentRequesting;
  const editStudentSuccess = studentReducer?.editStudentSuccess;
  const editStudentError = studentReducer?.editStudentError;

  const student = studentReducer?.student;

  const classRoomReducer = useSelector((state) => state.classRoomReducer);
  const classRoom = classRoomReducer?.classRoom;

  const housesReducer = useSelector((state) => state.houseReducer);
  const houses = housesReducer?.houses;

  //usehistory

  const [formIsValid, setFormIsValid] = useState(false);
  const [formData, setFormData] = useState({
    first_name: {
      type: "input",
      value: "",
      preset: {
        label: "First name",
        name: "firstname",
        type: "text",
        placeholder: "Enter your name",
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    middle_name: {
      type: "input",
      value: "",
      preset: {
        label: "Middle Name",
        name: "middlename",
        type: "text",
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    last_name: {
      type: "input",
      value: "",
      preset: {
        label: "Last Name",
        name: "lastname",
        type: "text",
        placeholder: "Enter your name",
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: false,
      },
    },

    email: {
      type: "input",
      value: "",
      preset: {
        label: "Email",
        name: "email",
        type: "text",
        placeholder: "",
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
        isEmail: true,
      },
    },

    phone: {
      type: "phone",
      value: "",
      preset: {
        label: "Phone",
        name: "phone1",
        type: "text",
        placeholder: "",
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
        isPhone: true,
      },
    },

    gender: {
      type: "select",
      value: "",
      preset: {
        label: "Gender ",
        name: "gender",
        type: "text",
        placeholder: "",
        options: [
          { value: "Male", name: "Male" },
          { value: "Female", name: "Female" },
          { value: "Others", name: "Others" },
        ],
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    dob: {
      type: "date",
      value: "",
      preset: {
        label: "Date of Birth",
        name: "dateOfBirth",
        type: "date",
        placeholder: "DD-MM-YYYY",
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    nationality: {
      type: "select",
      value: "",
      preset: {
        label: "Nationality",
        name: "nationality",
        type: "text",
        placeholder: "",
        options: newCountry,
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    blood_group: {
      type: "select",
      value: "",
      preset: {
        label: "Blood group",
        name: "gender",
        type: "text",
        placeholder: "",
        options: [
          { value: "A+", name: "A+" },
          { value: "A-", name: "A-" },
          { value: "B+", name: "B+" },
          { value: "B-", name: "B-" },
          { value: "O+", name: "O+" },
          { value: "O-", name: "O-" },
          { value: "AB+", name: "AB+" },
          { value: "AB-", name: "AB-" },
        ],
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    genotype: {
      type: "select",
      value: "",
      preset: {
        label: "Genotype",
        name: "genotype",
        type: "text",
        placeholder: "",
        options: [
          { value: "AA", name: "AA" },
          { value: "AS", name: "AS" },
          { value: "AC", name: "AC" },
          { value: "SS", name: "SS" },
          { value: "SC", name: "SC" },
          { value: "CC", name: "CC" },
        ],
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    classRoom: {
      type: "select",
      value: "",
      preset: {
        label: "Class Room",
        name: "classRoom",
        type: "text",
        placeholder: "",
        options: [],
      },

      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    religion: {
      type: "select",
      value: "",
      preset: {
        label: "Religion",
        name: "religion",
        type: "text",
        placeholder: "",
        options: [
          { value: "Christianity", name: "Christianity" },
          { value: "Islam", name: "Islam" },
          { value: "Others", name: "Others" },
        ],
      },
      validation: {
        valid: false,
        required: true,
      },
    },
    state: {
      type: "select",
      value: "",
      preset: {
        label: "State of origin",
        name: "state",
        type: "text",
        placeholder: "",
        options: <Options type="state" />,
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    lga: {
      type: "select",
      value: "",
      preset: {
        label: "L.G.A",
        name: "lga",
        type: "text",
        placeholder: "",
        options: <Options type="lga" />,
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },

    houses: {
      type: "select",
      value: "",
      preset: {
        label: "House",
        name: "houses",
        type: "text",
        placeholder: "",
        options: [],
      },

      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    admission_number: {
      type: "input",
      value: "",
      preset: {
        label: "Admission Number",
        name: "admission_number",
        type: "text",
        placeholder: "Admission Number",
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    address: {
      type: "textarea",
      value: "",
      preset: {
        label: "Address",
        name: "address",
        type: "text",
        placeholder: "",
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
      styles: {
        gridArea: "span 1/span 2",
      },
    },
  });

  const [photo, setPhoto] = useState("");
  const [guardian, setGuardian] = useState("");

  const changeHandler = (e, elem) => {
    let formDataClone = { ...formData }; // clone a copy of the formData state

    let inputElem = { ...formDataClone[elem] }; // clone a copy of the targeted input element from the formData
    /**
     * update the value of the input with the values keyed in by the user
     * and validate the value entered by the user
     */
    inputElem.value = e.target.value;

    if (e.target.name === "state") {
      formDataClone["lga"].preset.options = (
        <Options type="lga" state={e.target.value} />
      );
    }

    // formDataClone['classRoom'].preset.options = classRoom;

    const checkingValidity = utils.checkValidity(
      inputElem.value,
      inputElem.validation
    );

    let errMesg = "";

    inputElem.validation.isEmpty = !(inputElem.value.length > 0);
    inputElem.validation.valid = checkingValidity.valid;
    inputElem.errorMessage = errMesg ? errMesg : checkingValidity.message;

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
  };

  const onPhoneChangeHandler = (e, elemId) => {
    let formDataClone = { ...formData }; // clone a copy of the formData state

    let inputElem = { ...formDataClone[elemId] }; // clone a copy of the targeted input element from the formData

    inputElem.value = formatPhoneNumberIntl(e);
    inputElem.touched = true;
    inputElem.validation.valid = isValidPhoneNumber(e);
    inputElem.errorMessage = "Invalid phone number";

    formDataClone[elemId] = inputElem;

    setFormData(formDataClone);
    setFormIsValid(isValidPhoneNumber(formatPhoneNumberIntl(e)));

    let formIsValid = true;

    for (let elem in formDataClone) {
      if (formDataClone[elem].validation.required) {
        formIsValid = formDataClone[elem].validation.valid && formIsValid;
      }
    }

    setFormData(formDataClone);
    setFormIsValid(formIsValid);
  };

  const onPhotoChangeHandler = (e) => {
    utils.blobToBase64(e.target.files[0], setPhoto);
  };

  useEffect(() => {
    if (getStudentError) {
      toast.error(getStudentError, {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getStudentError]);

  const prefillFormData = useCallback((student) => {
    setPhoto(student.photo);

    if (student.guardians && Array.isArray(student.guardians)) {
      setGuardian(student.guardians[0]?.id);
    }

    let formDataClone = { ...formData }; // clone a copy of the formData state

    let formIsValid = true;

    for (let elem in formDataClone) {
      formDataClone[elem].validation.valid = true;
      formDataClone[elem].value = student[elem];
      formIsValid = formDataClone[elem].validation.valid && formIsValid;
    }

    formDataClone["lga"].preset.options = (
      <Options type="lga" state={formDataClone.state.value} />
    );

    formDataClone.classRoom.value = student.current_classroom_id;
    formDataClone.houses.value = student.house_id;

    setFormData(formDataClone);
    setFormIsValid(formIsValid);
  }, []);

  // Use effects

  useEffect(() => {
    if (editStudentSuccess) {
      toast.success("Student has been edited successfully", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [editStudentSuccess]);

  useEffect(() => {
    if (editStudentError) {
      toast.error(editStudentError, {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        //onClose: () => dispatch(clearAllErrors())
      });
    }
  }, [editStudentError]);

  useEffect(() => {
    getAllStudent();
  }, []);

  const getAllStudent = () => {
    dispatch(getClassRoom("", "", ""));
    dispatch(getStudentBio(studentId));
    dispatch(getHouses());
  };

  const refreshPage = () => {
    getAllStudent();
  };

  useEffect(() => {
    if (student) {
      prefillFormData(student);
    }
  }, [getStudentRequesting]);

  if (classRoom) {
    let formDataClone = { ...formData }; // clone a copy of the formData state

    formDataClone.classRoom.preset.options = classRoom;
  }

  if (houses) {
    let formDataClone = { ...formData }; // clone a copy of the formData state

    formDataClone.houses.preset.options = houses;
  }

  if (getStudentRequesting) {
    return <Spinner style={{ top: "50em" }} />;
  }

  let formElem = [];
  for (let key in formData) {
    formElem.push({
      id: key,
      properties: formData[key],
    });
  }

  let buttonClasses = ["medium"];
  if (editStudentRequesting) {
    buttonClasses.push("button--loading");
  }

  const newGuardians = [];

  let _guardians = student?.guardians;

  if (_guardians?.length > 0) {
    _guardians.map((guardian) => {
      let obj = {};
      obj["guardian_id"] = guardian.id;
      obj["relationship"] = guardian.relationship;

      newGuardians.push(obj);
    });
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let studentObj = {};
    studentObj["id"] = studentId;
    studentObj["firstName"] = formData.first_name.value;
    studentObj["middleName"] = formData.middle_name.value;
    studentObj["lastName"] = formData.last_name.value;
    studentObj["sex"] = formData.gender.value;
    studentObj["email"] = formData.email.value;
    studentObj["phone"] = utils.trimPhone(formData.phone.value);
    studentObj["dob"] = utils.formatDateForEndPoint(new Date(formData.dob.value));
    studentObj["admissionNo"] = formData.admission_number.value;
    studentObj["house"] = formData.houses.value;
    studentObj["religion"] = formData.religion.value;
    studentObj["bloodGroup"] = formData.blood_group.value;
    studentObj["genotype"] = formData.genotype.value;
    studentObj["nationality"] = formData.nationality.value;
    studentObj["states"] = formData.state.value;
    studentObj["lga"] = formData.lga.value;
    studentObj["address"] = formData.address.value;
    studentObj["photo"] = photo;
    studentObj["classRoom"] = formData.classRoom.value;
    dispatch(editStudent(studentObj, newGuardians));
  };

  return (
    <section className="onboarding">
      <Toast />
      <div>
        <GoBack title="Back" url={`/app/students/profile/${studentId}`} />
      </div>
      <div style={{ marginBottom: "30px" }}></div>
      <div className="flex">
        <div className="photo-area">
          {!photo ? (
            <label htmlFor="uploadEditStudent">
              <FiCamera />
              <span className="upload-text">Click here to upload picture</span>
              <input
                type="file"
                id="uploadEditStudent"
                onChange={onPhotoChangeHandler}
                style={{ display: "none" }}
              />
            </label>
          ) : (
            <>
              <img src={photo} />
              <label htmlFor="changeStudent" className="change-photo">
                Change photo
                <input
                  type="file"
                  id="changeStudent"
                  onChange={onPhotoChangeHandler}
                  style={{ display: "none" }}
                />
              </label>
              <span onClick={() => setPhoto(null)} className="remove-photo">
                Remove photo
              </span>
            </>
          )}
        </div>

        <div className="form flex-1 ml-4">
          <div className="grid columns-3 gap-column-3 gap-row-2">
            {formElem.map((elem, i) => {
              return (
                <FormGroup styles={elem.properties.styles} key={elem.id}>
                  <Input
                    phone={(e) => onPhoneChangeHandler(e, elem.id)}
                    touched={elem.properties.touched}
                    changed={(e) => changeHandler(e, elem.id)}
                    extraClass={elem.properties.extraClass}
                    value={elem.properties.value}
                    empty={elem.properties.validation.isEmpty}
                    validation={elem.properties.validation}
                    type={elem.properties.type}
                    preset={elem.properties.preset}
                    errorMessage={elem.properties.errorMessage}
                  />
                </FormGroup>
              );
            })}
          </div>

          <div className="form-action flex justify-flex-end">
            <ContainedButton
              disabled={!formIsValid || editStudentRequesting}
              onClick={onSubmitHandler}
              classess={buttonClasses.join(" ")}
            >
              Save
            </ContainedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditStudent;
