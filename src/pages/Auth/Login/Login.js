import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Card from "../../../components/UI/Card/Card";
import { ContainedButton } from "../../../components/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../../store/actions";
import FormGroup, { input as Input } from "../../../components/UI/Input/Input";
import utils from "../../../utils";
import { toast } from "react-toastify";
import Toast from "../../../components/UI/Toast/Toast";



const Login = React.memo(() => {
  // History
  const history = useHistory();

  // Dispatch
  const dispatch = useDispatch();

  // Accessing state in redux store
  let authReducer = useSelector((state) => state.authReducer);
  let reduxStateMessage = authReducer?.message;
  let reduxStateError = authReducer?.error;
  let isRequesting = authReducer?.isRequesting;
  const sessionTimeout = authReducer?.sessionTimeout;

  // State
  const [formIsValid, setFormIsValid] = useState(false);
  const [formData, setFormData] = useState({
    email: {
      type: "input",
      value: "",
      errorMessage: "",
      preset: {
        label: "Email",
        name: "email",
        type: "text",
        placeholder: "Enter your email",
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
      extraClass: "password",
      preset: {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Enter your password",
      },
      validation: {
        isEmpty: true,
        valid: false,
        required: true,
      },
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

    inputElem.validation.isEmpty = !(inputElem.value.length > 0);
    inputElem.validation.valid = checkingValidity.valid;
    inputElem.errorMessage = checkingValidity.message; //inputElem.validation.isEmpty || inputElem.validation.valid ? checkingValidity.message : '';

    inputElem.touched = true;

    formDataClone[elem] = inputElem;

    let formIsValid = true;

    for (let elem in formDataClone) {
      formIsValid = formDataClone[elem].validation.valid && formIsValid;
    }

    setFormData(formDataClone);
    setFormIsValid(formIsValid);
  };

  const styles = {
    maxWidth: "48em",
    marginTop: "10vh",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(logIn(formData.email.value, formData.password.value))
      .then(response => {
        let role = response.user.roles


        if (role === "admin") {
          history.push('/app/admin-dashboard');
        }

        if (role === "student") {
          history.push('/app/student-dashboard/')
        }


      });
  }

  // Use effects
  useEffect(() => {
    if (sessionTimeout) {
      toast.error("Session timeout. Kindly login again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      });
    }
  }, [sessionTimeout]);

  useEffect(() => {
    if (reduxStateError) {
      toast.error(reduxStateMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    // eslint-disable-next-line
  }, [reduxStateError]);

  // Extra form inputs from formData state
  let formElem = [];
  for (let key in formData) {
    formElem.push({
      id: key,
      properties: formData[key],
    });
  }

  let loginButtonClasses = ["wide"];
  if (isRequesting) {
    loginButtonClasses.push("button--loading");
  }

  return (
    <section className="login">
      <Toast />
      <Card

        title="Log into your account"
        styles={styles}
      >
        <form onSubmit={onSubmitHandler}>
          <div className="form">
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

            <div className="form-action">
              <ContainedButton
                disabled={!formIsValid || isRequesting}
                type="submit"
                classess={loginButtonClasses.join(" ")}
              >
                Log in
              </ContainedButton>
            </div>

            <div className="form-footer">
              <p className="text-align-center ">
                Don't have an account?  <Link to="/verify">Verify Certificate</Link>
              </p>
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default Login;
