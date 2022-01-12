import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../components/UI/Card/Card';
import { ContainedButton } from '../../../components/UI/Button/Button';
import { signupInitiation } from '../../../store/actions';
import { signupReset, logout } from '../../../store/actions/action-types';
import FormGroup, {
  input as Input
} from '../../../components/UI/Input/Input';
import utils from '../../../utils';
import Toast from "../../../components/UI/Toast/Toast";


const SignUp = () => {

  // Dispatch
  const dispatch = useDispatch();

  // Accessing state in redux store
  let reduxState = useSelector(state => state.signupReducer);
  let reduxStateMessage = reduxState?.message;
  let reduxStateSuccess = reduxState?.success;
  let reduxStateError = reduxState?.error;


  // States
  const [isRequesting, setIsRequesting] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formData, setFormData] = useState({
    verify: {
      type: "input",
      value: "",
      preset: {
        label: 'Certificate Code',
        name: 'code',
        type: "text",
        placeholder: 'Enter your certificate code',
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true
      }
    },

  });

  // Functions
  const changeHandler = (e, elem) => {

    let formDataClone = { ...formData }; // clone a copy of the formData state

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

    let errMesg = '';

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


    setFormData(formDataClone);
    setFormIsValid(formIsValid);

  }


  const onSubmitHandler = () => {

    setIsRequesting(true);
    dispatch(
      signupInitiation(
        formData.verify.value,
      )
    )
  }

  // Use effects
  useEffect(() => {
    dispatch(logout());
    dispatch(signupReset());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (reduxStateError) {

      setIsRequesting(false);

    }
    // eslint-disable-next-line
  }, [reduxStateError]);

  useEffect(() => {
    if (reduxStateSuccess) {

      setIsRequesting(false);

    }
    // eslint-disable-next-line
  }, [reduxStateSuccess]);

  // Extract form inputs from formData state
  let formElem = [];
  for (let key in formData) {
    formElem.push({
      id: key,
      properties: formData[key]
    });
  }

  let signUpButtonClasses = ['small'];
  if (isRequesting) {
    signUpButtonClasses.push('button--loading');
  }

  const cardStyles = {
    maxWidth: '70em',
    marginTop: '6vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  let signUpForm = (
    <div className="form">
      {formElem.map(elem => {
        return (
          <FormGroup key={elem.id}>
            <Input
              touched={elem.properties.touched}
              changed={e => changeHandler(e, elem.id)}
              extraClass={elem.properties.extraClass}
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

      <div className="form-action">
        <ContainedButton
          disabled={!formIsValid || isRequesting}
          onClick={onSubmitHandler}
          classess={signUpButtonClasses.join(' ')}>
          Verify Certificate
        </ContainedButton>
      </div>

      <div className="form-footer">
        <p>Are you an admin? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );

  let cardTitle = 'Verify your Certificate';

  if (reduxStateSuccess) {
    cardTitle = `Congratulations! ${reduxStateMessage.student.firstName} ${reduxStateMessage.student.otherName} ${reduxStateMessage.student.lastName}🎉`;
  }

  return (
    <section className='sign-up'>
      <Toast />
      <Card
        title={cardTitle}
        styles={cardStyles} >

        {reduxStateSuccess ? <div className='success-message'>
          <p>Matric Number: {reduxStateMessage.student.matricNumber}</p>
          <p>Degree: {reduxStateMessage.degree}</p>
          <p>Course: {reduxStateMessage.course}</p>
          <p>Department: {reduxStateMessage.department}</p>
          <p>Grade: {reduxStateMessage.grade}</p>
          <p>Email: {reduxStateMessage.student.email}</p>

        </div> : signUpForm}

        <h3>{reduxStateError}</h3>
      </Card>
    </section>
  );
}

export default SignUp;