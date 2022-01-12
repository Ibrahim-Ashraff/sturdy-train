import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormGroup, { input as Input } from "../../../components/UI/Input/Input";
import { useHistory, Link } from "react-router-dom";
import {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { Options } from "react-naija-states";
import utils from "../../../utils";
import {
  ContainedButton,
  GrayButton,
  OutlinedButton,
} from "../../../components/UI/Button/Button";
import { RiParentFill } from "react-icons/ri";
import { FiCamera } from "react-icons/fi";
import { toast } from "react-toastify";
import Toast from "../../../components/UI/Toast/Toast";
import {
  addStudent,
  getStudents,
  addGuardians,
  getGuardians,
  clearAllGuardianErrors,
} from "../../../store/actions";
import Modal from "../../../components/UI/Modal/Modal";
import faker from "faker";
import Empty from "../../../assets/images/empty.svg";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { AiFillFileExclamation } from "react-icons/ai";
import { newCountry } from "../../../utils/country";
import { Error } from "../../../components/UI/Errors";

import { FcBusinesswoman, FcBusinessman } from "react-icons/fc"


const AddStudent = React.memo(() => {
  // Dispatch
  const dispatch = useDispatch();

  //history
  const history = useHistory();


  const initialFormState = {
    value: "",
    firstname: "",
    middlename: "",
    lastname: "",
    phone: "",
    gender: "",
    id: null,
  };


  const initialRelationshipFormState = { id: null, relationship: '' }


  // Accessing state in redux store
  const studentReducer = useSelector((state) => state.studentReducer);
  const addStudentRequesting = studentReducer?.addStudentRequesting;
  const addStudentSuccess = studentReducer?.addStudentSuccess;
  const addStudentError = studentReducer?.addStudentError;
  let reduxStateMessage = studentReducer?.message;
  let reduxStateFormErrors = studentReducer?.formErrors;
  let reduxStateSuccess = studentReducer?.success;
  let reduxStateError = studentReducer?.error;
  const classRoom = studentReducer?.classRoom;

  const houses = studentReducer?.houses;

  //guardian reducer
  const guardianReducer = useSelector((state) => state.guardianReducer);
  const addGuardianRequesting = guardianReducer?.addGuardianRequesting;
  const addGuardianSuccess = guardianReducer?.addGuardianSuccess;
  const addGuardianError = guardianReducer?.addGuardianError;
  const guardianAdded = guardianReducer?.guardianAdded;
  const getGuardiansRequesting = guardianReducer?.getGuardiansRequesting;
  const getGuardianError = guardianReducer?.getGuardiansError;

  const guardians = guardianReducer?.guardians;

  const width = true;

  // States

  const [search, setSearch] = useState("");

  const [addGuardian, setAddGuardian] = useState(true);
  const [showRelationshipModal, setShowRelationshipModal] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false);
  const [guardianFormIsValid, setGuardianFormIsValid] = useState(false);
  const [first, setFirst] = useState(true);

  const [user, setUser] = useState(initialRelationshipFormState)

  const [showModal, setShowModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);

  const [guardian, setGuardian] = useState([]);

  const [relationshipData, setRelationshipData] = useState([])

  const [guardianValue, setGuardianValue] = useState("")


  const [guardianCreated, setGuardianCreated] = useState(null)


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
        isEmpty: true,
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
    phone: {
      type: "phone",
      value: "",
      preset: {
        label: "Phone",
        name: "phone",
        type: "text",
        placeholder: "",
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
        isPhone: true,
      },
    },
    dob: {
      type: "date",
      value: "",
      preset: {
        label: "Date of birth",
        name: "dob",
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
    admissionNo: {
      type: "input",
      value: "",
      preset: {
        label: "Admission number",
        name: "admissionNo",
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
    house: {
      type: "select",
      value: "",
      preset: {
        label: "House",
        name: "house",
        type: "text",
        placeholder: "",
        options: [],
        required: 'required'

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
        required: 'required'

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
        name: "gender",
        type: "text",
        placeholder: "",
        options: [
          { value: "Christianity", name: "Christianity" },
          { value: "Islam", name: "Islam" },
          { value: "Others", name: "Others" }
        ],
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    bloodGroup: {
      type: "select",
      value: "",
      preset: {
        label: "Blood group",
        name: "bloodgroup",
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
        required: 'required'

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
          { value: "SC", name: "SC" },
          { value: "SS", name: "SS" },
        ],
        required: 'required'

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
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    states: {
      type: "select",
      value: "",
      preset: {
        label: "State of origin",
        name: "states",
        type: "text",
        placeholder: "",
        options: <Options type="state" />,
        required: 'required'

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
        required: 'required'

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
        placeholder: "e.g No.5 Maple Drive",
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
      styles: {
        gridArea: "span 1/span 2",
        gap: "0 4em",
      },
    },
  });

  const [guardianInputs, setGuardianInputs] = useState({
    title: {
      type: "select",
      value: "",
      preset: {
        label: "Title",
        name: "title",
        type: "text",
        placeholder: "e.g Mr, Miss, etc",
        options: [
          { value: "Mr", name: "Mr" },
          { value: "Miss", name: "Miss" },
          { value: "Mrs", name: "Mrs" },
          { value: "Dr", name: "Dr" },
          { value: "Prof", name: "Prof" },
          { value: "Rev", name: "Rev" },
          { value: "Esq", name: "Esq" },
          { value: "Engr", name: "Engr" },
        ],
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
    },
    firstName: {
      type: "input",
      value: "",
      preset: {
        label: "First name",
        name: "firstName",
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
    middleName: {
      type: "input",
      value: "",
      preset: {
        label: "Middle name",
        name: "middleName",
        type: "text",
        placeholder: "",
      },
      validation: {
        isEmpty: true,
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
        placeholder: "",
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
        required: 'required'

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
        name: "phone",
        type: "text",
        placeholder: "",
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
        isPhone: true,
      },
    },

    altPhone: {
      type: "phone",
      value: "",
      preset: {
        label: "Phone 2",
        name: "altPhone",
        type: "text",
        placeholder: "",
      },
      validation: {
        isEmpty: false,
        valid: false,
        required: false,
        isPhone: true,
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
          { value: "Islam", name: "Islam" },
          { value: "Christianity", name: "Christianity" },
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
    relationship: {
      type: "input",
      value: "",
      preset: {
        label: "Relationship",
        name: "Relationship",
        type: "text",
        placeholder: "e.g father, mother, brother",
        required: 'required'

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
        required: 'required'

      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
      styles: {
        // gridArea: "span 1/span 2",
        gap: "0 4em",
      },
    },
  });

  const [mergedArra, setMergedArra] = useState([])

  const [photo, setPhoto] = useState(null);
  const [guardianPhoto, setGuardianPhoto] = useState(null);
  const [guardianToBeAssigned, setGuardianToBeAssigned] = useState(initialFormState);



  const mergeArrayObjects = (relationshipData, guardian) => {
    return relationshipData.map((item, i) => {
      if (item.id === guardian[i].id) {
        //merging two objects

        return Object.assign({}, item, guardian[i])
      }
    })
  }

  // const mergedArray = mergeArrayObjects(relationshipData, guardian)

  useEffect(() => {

    setMergedArra(mergeArrayObjects(relationshipData, guardian))

  }, [relationshipData, guardian]);






  // useEffect(() => {

  //   if (guardianCreated !== null) {

  //     let obj = {}
  //     obj["firstname"] = guardianCreated?.firstname
  //     obj["value"] = guardianCreated?.guardian_id
  //     obj["middlename"] = guardianCreated?.middlename
  //     obj["relationship"] = guardianCreated?.relationship
  //     obj["lastname"] = guardianCreated?.lastname
  //     obj["phone"] = guardianCreated?.phone

  //     setMergedArra([...mergedArra, obj])
  //   }
  // }, [guardianCreated]);

  const finalArray = []


  if (mergedArra && Array.isArray(mergedArra)) {
    mergedArra.map(item => {
      let obj = {};
      obj["guardian_id"] = item.value
      obj["relationship"] = item.relationship
      finalArray.push(obj)
    })
  }



  const addRelationship = user => {
    user.id = relationshipData.length + 1
    setRelationshipData([...relationshipData, user])
  }

  //photo change handler
  const onPhotoChangeHandler = (e) => {
    utils.blobToBase64(e.target.files[0], setPhoto);
  };

  //guardian photo change handler
  const onGuardianPhotoChangeHandler = async (e) => {
    utils.blobToBase64(e.target.files[0], setGuardianPhoto);
  };

  //input change handler
  const changeHandler = (e, elem) => {
    let formDataClone = { ...formData }; // clone a copy of the formData state

    if (e.target.name && e.target.name === "states") {
      formDataClone["lga"].preset.options = (
        <Options type="lga" state={e.target.value} />
      );
    }

    let inputElem = { ...formDataClone[elem] }; // clone a copy of the targeted input element from the formData
    /**
     * update the value of the input with the values keyed in by the user
     * and validate the value entered by the user
     */
    inputElem.value = e.target.value;

    const checkingValidity = utils.checkValidity(
      inputElem.value,
      inputElem.validation
    );

    let errMesg = "";

    if (reduxStateMessage?.errors) {
      errMesg = reduxStateMessage?.errors.elem;
    }

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

    formDataClone.classRoom.preset.options = classRoom;
    formDataClone.house.preset.options = houses;

    setFormData(formDataClone);
    setFormIsValid(formIsValid);
  };




  //guardian input change handler
  const guardianHandler = (e, elem) => {
    let formDataClone = { ...guardianInputs }; // clone a copy of the formData state

    let inputElem = { ...formDataClone[elem] }; // clone a copy of the targeted input element from the formData
    /**
     * update the value of the input with the values keyed in by the user
     * and validate the value entered by the user
     */
    inputElem.value = e.target.value;

    const checkingValidity = utils.checkValidity(
      inputElem.value,
      inputElem.validation
    );

    let errMesg = "";

    if (reduxStateMessage?.errors) {
      errMesg = reduxStateMessage?.errors.elem;
    }

    inputElem.validation.isEmpty = !(inputElem.value.length > 0);
    inputElem.validation.valid = checkingValidity.valid;
    inputElem.errorMessage = errMesg ? errMesg : checkingValidity.message;

    inputElem.touched = true;

    formDataClone[elem] = inputElem;

    let guardianFormIsValid = true;

    for (let elem in formDataClone) {
      if (formDataClone[elem].validation.required) {
        guardianFormIsValid =
          formDataClone[elem].validation.valid && guardianFormIsValid;
      }
    }

    setGuardianInputs(formDataClone);
    setGuardianFormIsValid(guardianFormIsValid);
  };

  //phone change handler

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

  //guardian phone change handler
  const onGuardianPhoneChangeHandler = (e, elemId) => {
    let formDataClone = { ...guardianInputs }; // clone a copy of the formData state

    let inputElem = { ...formDataClone[elemId] }; // clone a copy of the targeted input element from the formData

    inputElem.value = formatPhoneNumberIntl(e);
    inputElem.touched = true;
    inputElem.validation.valid = isValidPhoneNumber(e);
    inputElem.errorMessage = "Invalid phone number";

    formDataClone[elemId] = inputElem;

    setGuardianInputs(formDataClone);
    setGuardianFormIsValid(isValidPhoneNumber(formatPhoneNumberIntl(e)));

    let guardianFormIsValid = true;

    for (let elem in formDataClone) {
      if (formDataClone[elem].validation.required) {
        guardianFormIsValid =
          formDataClone[elem].validation.valid && guardianFormIsValid;
      }
    }

    setGuardianInputs(formDataClone);
    setGuardianFormIsValid(guardianFormIsValid);
  };


  const getAllStudents = () => {
    dispatch(getStudents(1, "", ""));
  };

  const refreshPage = () => {
    getAllStudents();
  };

  // Use effects
  useEffect(() => {
    getAllStudents();
  }, []);



  useEffect(() => {
    if (addStudentSuccess) {
      toast.success("Student has been added successfully", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
        // onClose: () => dispatch(resetAddStudent()),
        onClose: () => history.push('/app/students/')

      });
    }
  }, [addStudentSuccess]);



  useEffect(() => {
    if (classRoom && classRoom?.length === 0) {

      setShowSetupModal(true)

    }

  }, [classRoom]);

  useEffect(() => {
    if (houses && houses?.length === 0) {
      setShowSetupModal(true)
    }

  }, [houses]);

  useEffect(() => {
    if (addStudentError) {
      toast.error(addStudentError, {
        // autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        // onClose: () => dispatch(clearStudentErrors()),
      });
    }
  }, [addStudentError]);

  useEffect(() => {
    if (addGuardianSuccess) {
      toast.success("Guardian has been added successfully", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
        // onClose: () => _gua()
      });
    }
  }, [addGuardianSuccess]);




  useEffect(() => {
    if (addGuardianError) {
      toast.error(addGuardianError, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => dispatch(clearAllGuardianErrors()),
      });
    }
  }, [addGuardianError]);


  const closeRelationshipModal = (event) => {


    event.preventDefault()
    if (!user.relationship) return

    addRelationship(user)
    setUser(initialRelationshipFormState)

    setShowRelationshipModal(false)

    setShowModal(false)
  }

  const clearFormData = () => {
    let formDataClone = { ...formData };

    for (let elem in formDataClone) {
      formDataClone[elem].value = "";
    }

    setFormData(formDataClone);
    setFormIsValid(false);
    setPhoto(null);
  };

  const clearGuardianFormData = () => {
    let formDataClone = { ...guardianInputs }; // clone a copy of the formData state
    for (let elem in formDataClone) {
      formDataClone[elem].value = "";
      setGuardianInputs(formDataClone);
      setGuardianFormIsValid(false);
      setGuardianPhoto(null);
    }
  };
  // student submit handler
  const onSubmitHandler = () => {
    let student = {};

    let trimPhone = (phone) => phone.split(" ").join("");

    student["firstName"] = formData.firstName.value;
    student["middleName"] = formData.middleName.value;
    student["lastName"] = formData.lastName.value;
    student["sex"] = formData.gender.value;
    student["email"] = formData.email.value;
    student["phone"] = trimPhone(formData.phone.value);
    student["dob"] = utils.formatDateForEndPoint(new Date(formData.dob.value));
    student["admissionNo"] = formData.admissionNo.value;
    student["house"] = formData.house.value;
    student["religion"] = formData.religion.value;
    student["bloodGroup"] = formData.bloodGroup.value;
    student["genotype"] = formData.genotype.value;
    student["nationality"] = formData.nationality.value;
    student["states"] = formData.states.value;
    student["lga"] = formData.lga.value;
    student["address"] = formData.address.value;
    student["photo"] = photo;
    student["classRoom"] = formData.classRoom.value;

    dispatch(addStudent(student, finalArray))


  };


  const onSubmitGuardianHandler = () => {
    let guardian = {};
    let trimPhone = (phone) => phone.split(" ").join("");


    guardian['title'] = guardianInputs.title.value
    guardian['firstName'] = guardianInputs.firstName.value
    guardian['lastName'] = guardianInputs.lastName.value
    guardian['middleName'] = guardianInputs.middleName.value
    guardian['phone'] = trimPhone(guardianInputs.phone.value)
    guardian['email'] = guardianInputs.email.value
    guardian['altPhone'] = guardianInputs.altPhone.value
    guardian['gender'] = guardianInputs.gender.value
    guardian['address'] = guardianInputs.address.value
    guardian['religion'] = guardianInputs.religion.value
    guardian['relationship'] = guardianInputs.relationship.value

    guardian['photo'] = guardianPhoto

    dispatch(addGuardians(guardian))
      .then(() => {
        setShowModal(false);

      })

  };





  // Extract form inputs from formData state
  let formElem = [];
  for (let key in formData) {
    formElem.push({
      id: key,
      properties: formData[key],
    });
  }

  let guardianForm = [];
  for (let key in guardianInputs) {
    guardianForm.push({
      id: key,
      properties: guardianInputs[key],
    });
  }

  //button loaders
  let buttonClasses = ["medium"];
  if (addStudentRequesting) {
    buttonClasses.push("button--loading");
  }

  let guardianClasses = ["medium"];
  if (addGuardianRequesting) {
    guardianClasses.push("button--loading");
  }

  const openModalForSelectGuardian = () => {
    setShowModal(true);

    dispatch(getGuardians(1, search))

    setAddGuardian(false)
  };


  const openModalForCreateGuardian = () => {
    setShowModal(true);
    setAddGuardian(true);
  };

  const guardianCard = (
    guardianId,
    guardianFirstname,
    guardianMiddlename,
    guardianLastname,
    guardianPhone,
    guardianGender
  ) => {

    guardianToBeAssigned.id = guardian.length + 1

    setGuardianValue(guardianId)
    setGuardian([
      ...guardian,
      {
        ...guardianToBeAssigned,
        value: guardianId,
        firstname: guardianFirstname,
        middlename: guardianMiddlename,
        lastname: guardianLastname,
        phone: guardianPhone,
        gender: guardianGender,
        id: guardianToBeAssigned.id
      },
    ]);

    setShowRelationshipModal(!showRelationshipModal)
  };



  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }


  const deleteGuardian = (value) => {

    mergedArra.filter((user) => user.value !== value)
    setShowRelationshipModal(!showRelationshipModal)
    setGuardian(guardian.filter((user) => user.value !== value));
  };


  const handleSearch = (e) => {
    setSearch(e.target.value)
    dispatch(getGuardians(1, e.target.value));

  }

  const deleteMan = (value) => {



    setMergedArra(mergedArra.filter((user) => user.id !== value))
    setRelationshipData(relationshipData.filter((user) => user.id !== value))
    setGuardian(guardian.filter((user) => user.id !== value))




  }


  let selectGuardianContent = null;

  if (getGuardiansRequesting) {
    selectGuardianContent = (
      <>
        <div style={{ marginTop: "300px" }}>
          <Spinner />
        </div>
      </>
    );
  }

  if (getGuardianError) {
    const message = [
      "Please click ",
      <Link onClick={refreshPage}>here</Link>,
      " to refresh.",
    ];
    selectGuardianContent = (
      <Error
        size="small"
        icon={AiFillFileExclamation}
        iconSize="80"
        title={getGuardianError}
        message={message.map((el, i) => (
          <React.Fragment key={i}>{el}</React.Fragment>
        ))}
      />
    );
  }

  const initials = (name) => {
    const nameArr = name.split(" ");
    return nameArr[0].slice(0, 1) + nameArr[1].slice(0, 1);
  };
  if (guardians) {
    selectGuardianContent = (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Assign</th>

            </tr>
          </thead>
          <tbody>
            {guardians.length > 0 ? (
              guardians.map((guardians) => {
                const color = faker.internet.color(234, 254, 274);
                const bgColor = color + "40";
                let init = guardians.firstname + " " + guardians.lastname;
                return (
                  <tr>
                    <td className="name-container">
                      <div
                        className="initials"
                        style={{ backgroundColor: bgColor, color: color }}
                      >
                        {initials(init)}
                      </div>
                      <span className="name">
                        {" "}
                        {guardians.firstname} {guardians.middlename}{" "}
                        {guardians.lastname}
                      </span>
                    </td>
                    <td>{guardians.phone}</td>

                    <td>
                      <ContainedButton
                        classess="small"
                        style={{ fontSize: "10px" }}
                        onClick={() =>
                          guardianCard(
                            guardians.id,
                            guardians.firstname,
                            guardians.middlename,
                            guardians.lastname,
                            guardians.phone,
                            guardians.gender
                          )
                        }
                      >
                        Select
                      </ContainedButton>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3">
                  <img src={Empty} alt="Empty" />
                  <p className="text-align-center">No records found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }

  const createGuardianContent = (
    <>
      <h1 className="modal-title">Create Guardian</h1>
      <div className="flex">
        <div className="photo-area">
          {!guardianPhoto ? (
            <label htmlFor="upload">
              <FiCamera />
              <span className="upload-text">
                Click here to upload Guardian's passport
              </span>
              <input
                type="file"
                id="upload"
                onChange={onGuardianPhotoChangeHandler}
                style={{ display: "none" }}
              />
            </label>
          ) : (
            <>
              <img src={guardianPhoto} />
              <label htmlFor="upload2" className="change-photo">
                Change photo
                <input
                  type="file"
                  id="upload2"
                  onChange={onGuardianPhotoChangeHandler}
                  style={{ display: "none" }}
                />
              </label>
              <span
                onClick={() => setGuardianPhoto(null)}
                className="remove-photo"
              >
                Remove photo
              </span>
            </>
          )}
        </div>
        <div className="form flex-1 ml-4">
          <div className="grid columns-2 gap-column-3 gap-row-2">
            {guardianForm.map((elem, i) => {
              return (
                <FormGroup styles={elem.properties.styles} key={elem.id}>
                  <Input
                    key={elem.id}
                    phone={(e) => onGuardianPhoneChangeHandler(e, elem.id)}
                    touched={elem.properties.touched}
                    changed={(e) => guardianHandler(e, elem.id)}
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
        </div>
      </div>
      <div className="form-action flex justify-flex-end">
        <OutlinedButton onClick={() => setShowModal(false)} classess="medium mr-2">
          Cancel
        </OutlinedButton>
        <ContainedButton
          disabled={!guardianFormIsValid || addGuardianRequesting}
          onClick={onSubmitGuardianHandler}
          classess={guardianClasses.join(" ")}
        >
          Create Guardian
        </ContainedButton>
      </div>
    </>
  );

  const relationshipModalContent = (
    <>

      <div className="form">

        <div className="form-group">
          <label
          // className="form label"
          >Relationship</label>
          <div className="flex">
            <input type="text"
              className="form-input"
              name="relationship"
              placeholder="e.g brother, father, mother etc"
              value={user.relationship}
              onChange={handleInputChange} />
            <ContainedButton
              classess="small ml-2 mr-2"
              onClick={closeRelationshipModal}
              disabled={user.relationship.length === 0}
            >

              Save
            </ContainedButton>
            <OutlinedButton classess="small" onClick={() => deleteGuardian(guardianValue)}>Cancel</OutlinedButton>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <section className=" onboarding">
      <Toast />
      <Modal
        show={showModal}
        closeModal={() => setShowModal(false)}
        width={width}
      >
        {addGuardian ? (
          createGuardianContent
        ) : (


          showRelationshipModal ?

            relationshipModalContent :

            <>
              <h1 className="modal-title">Select Guardian</h1>
              <div className="gray-banner grid columns-2-search mb-1">
                <div className="form">
                  <input
                    className="form-input"
                    placeholder="Search by name"
                    value={search}
                    onChange={handleSearch}
                  ></input>
                </div>
              </div>
              {selectGuardianContent}
            </>

        )

        }
      </Modal>
      <Modal
        show={showSetupModal}
        closeModal={() => setShowSetupModal(false)}
      >

        <div className="form-footer">
          <p className="text-align-center ">
            OOPS! it looks like you haven't completed your school setup yet.

            Kindly go to <Link to="/app/settings">Settings</Link> to complete
          </p>
        </div>

      </Modal>
      {first ? (
        <>
          <div className="flex">
            <div className="photo-area">
              {!photo ? (
                <label htmlFor="uploadPic">
                  <FiCamera />
                  <span className="upload-text">
                    Click here to upload Picture
                  </span>
                  <input
                    type="file"
                    id="uploadPic"
                    onChange={onPhotoChangeHandler}
                    style={{ display: "none" }}
                  />
                </label>
              ) : (
                <>
                  <img src={photo} />
                  <label htmlFor="uploadPic2" className="change-photo">
                    Change photo
                    <input
                      type="file"
                      id="uploadPic2"
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
              <h2 className="mb-1">General Information</h2>

              <div className="grid columns-3 gap-column-3 gap-row-2">
                {formElem.map((elem, i) => {
                  return (
                    <FormGroup styles={elem.properties.styles} key={elem.id}>
                      <Input
                        key={elem.id}
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
                <GrayButton
                  onClick={() => history.push("/app/students")}
                  classess="medium mr-2"
                >
                  Cancel
                </GrayButton>
                <ContainedButton
                  disabled={!formIsValid}
                  onClick={() => setFirst(false)}
                  classess="medium"
                >
                  Next
                </ContainedButton>
              </div>
            </div>
          </div>{" "}
        </>
      ) : (
        <>

          <h2 className="mb-1">Guardian Information</h2>
          <div className="gray-banner grid columns-2 ">
            <p>
              Select an existing guardian from the button or create a new
              guardian for the student
            </p>
            <div className="u-right-text">
              <OutlinedButton
                classess="small mr-2"

                onClick={openModalForSelectGuardian}>
                Select Guardian
              </OutlinedButton>
              <ContainedButton
                classess="small "
                onClick={openModalForCreateGuardian}>
                Create Guardian
              </ContainedButton>
            </div>
          </div>
          <div className="grid columns-5">
            {mergedArra.length > 0 ? (
              <>
                {mergedArra.map((man) => {
                  return (
                    <>

                      <div style={{ width: "30em", borderRadius: "5px", padding: "20px", marginTop: "20px", boxShadow: "0px 10px 20px -20px", borderTop: `3px solid ${utils.getRandomColor()}` }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                          <h2 style={{ display: "block" }}>{man.firstname}, {man.lastname}</h2>
                          <h2 onClick={() => deleteMan(man.id)} style={{ display: "block", fontSize: "3em", cursor: "pointer" }}>
                            &times;
                          </h2>
                        </div>

                        <p style={{ fontSize: "1.4em", marginTop: "20px" }}>Mobile - {man.phone}</p>
                        <p style={{ fontSize: "1.4em", marginTop: "20px" }}>Relationship -  {man.relationship}</p>

                        {man.gender === "Male" ? <FcBusinessman style={{ width: "50px", height: "50px", marginTop: "20px", marginRight: "0", marginLeft: "auto", display: "block" }} /> : <FcBusinesswoman style={{ width: "50px", height: "50px", marginTop: "20px", marginRight: "0", marginLeft: "auto", display: "block" }} />}

                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <div className="photo-area mt-3">
                  <label htmlFor="guardian-upload">
                    <RiParentFill />
                    <span className="guardian-upload">
                      No Guardian Selected
                    </span>
                  </label>
                </div>








              </>
            )}
          </div>
          <div className="form-action flex justify-flex-end mt-10">
            <GrayButton
              onClick={() => setFirst(true)}
              classess="medium mr-2"
            >
              Back
            </GrayButton>
            <ContainedButton
              disabled={!formIsValid || addStudentRequesting || finalArray?.length === 0}
              onClick={onSubmitHandler}
              classess={buttonClasses.join(" ")}
            >
              Finish
            </ContainedButton>
          </div>
        </>
      )}
    </section>
  );
});

export default AddStudent;
