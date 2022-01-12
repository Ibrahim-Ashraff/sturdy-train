import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ContainedButton,
    GrayButton,
    DangerButton,
} from "../../../../components/UI/Button/Button";
import Modal from '../../../../components/UI/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup, { input as Input } from '../../../../components/UI/Input/Input';
import utils from '../../../../utils';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import {
    getArm,
    addArm,
    editArm,
    deleteArm,
    clearAllErrors,
} from "../../../../store/actions";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Empty from "../../../../assets/images/empty.svg";
import { toast } from "react-toastify";
import Toast from "../../../../components/UI/Toast/Toast";
import { Error } from "../../../../components/UI/Errors";
import { AiFillFileExclamation } from "react-icons/ai";

const Arm = () => {

    const dispatch = useDispatch();

    const armReducer = useSelector((state) => state.armReducer);
    const getArmRequesting = armReducer?.getArmRequesting;
    const getArmError = armReducer?.getArmError;

    const addArmRequesting = armReducer?.addArmRequesting;
    const addArmSuccess = armReducer?.addArmSuccess;
    const addArmError = armReducer?.addArmError;

    const editArmRequesting = armReducer?.editArmRequesting;
    const editArmSuccess = armReducer?.editArmSuccess;
    const editArmError = armReducer?.editArmError;

    const deleteArmRequesting = armReducer?.deleteArmRequesting;
    const deleteArmSuccess = armReducer?.deleteArmSuccess;
    const deleteArmError = armReducer?.deleteArmError;

    const arm = armReducer?.arm;

    // History
    const [showModal, setShowModal] = useState(false);
    const [deleteArmModal, setDeleteArmModal] = useState(false);
    const [armToBeDeleted, setArmToBeDeleted] = useState({
        id: "",
        name: "",
    });
    const [armToBeEdited, setArmToBeEdited] = useState({
        id: "",
        name: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [formData, setFormData] = useState({
        Arm: {
            type: "input",
            value: "",
            preset: {
                label: 'Arm',
                name: 'Arm',
                type: "text",
                placeholder: 'for example; E,A, gold',
            },
            validation: {
                isEmpty: true,
                valid: false,
                required: true,
            }
        }
    });

    // Extract form inputs from formData state
    let formElem = [];
    for (let key in formData) {
        formElem.push({
            id: key,
            properties: formData[key],
        });
    }

    // Extra styling
    let buttonClasses = ["small"];
    if (addArmRequesting || editArmRequesting) {
        buttonClasses.push("button--loading");
    }

    let deleteButtonClasses = ["small"];
    if (deleteArmRequesting) {
        deleteButtonClasses.push("button--loading");
    }

    //input change handler
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
            formIsValid = formDataClone[elem].validation.valid && formIsValid;
        }

        setFormData(formDataClone);
        setFormIsValid(formIsValid);

    }

    const getAllArm = () => {
        dispatch(getArm());
    };

    const refreshPage = () => {
        getAllArm();
    };

    const addArmhandler = (e) => {
        e.preventDefault();
        if (!editMode)
            dispatch(
                addArm(formData.Arm.value)
            );
        else {
            dispatch(
                editArm(
                    armToBeEdited.id,
                    formData.Arm.value,
                )
            );
        }
    };

    const deleteArmHandler = (armId) => {
        dispatch(deleteArm(armId));
    };

    const closeModal = () => {
        setShowModal(false);

        let formDataClone = { ...formData };
        for (let key in formDataClone) {
            formDataClone[key].value = "";
        }

        setFormIsValid(false);
    };

    const openModalForAddArm = () => {
        setShowModal(true);
        setEditMode(false);
        setDeleteArmModal(false);
    };

    const openModalForEditArm = (armId, arm) => {
        setShowModal(true);
        setEditMode(true);
        setDeleteArmModal(false);
        setArmToBeEdited({
            ...armToBeEdited,
            id: armId,
            name: arm,
        });

        let formDataClone = { ...formData };
        formDataClone["Arm"].value = utils.capitalize(arm);
        setFormIsValid(true);
    };

    const openModalForDeleteArm = (armId, arm) => {
        setShowModal(true);
        setDeleteArmModal(true);
        setArmToBeDeleted({
            ...armToBeDeleted,
            id: armId,
            name: arm,
        });
    };

    // Use effects
    useEffect(() => {
        getAllArm();
    }, []);

    useEffect(() => {
        if (addArmSuccess) {
            getAllArm();
            // closeModal();
            toast.success("Arm has been added successfully", {
                autoClose: 5000,
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }, [addArmSuccess]);

    useEffect(() => {
        if (addArmError) {
            toast.error(addArmError, {
                autoClose: 5000,
                position: toast.POSITION.TOP_RIGHT,
                onClose: () => dispatch(clearAllErrors()),
            });
        }
    }, [addArmError]);

    useEffect(() => {
        if (editArmSuccess) {
            getAllArm();
            closeModal();
            toast.success("Arm has been edited successfully", {
                autoClose: 5000,
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }, [editArmSuccess]);

    useEffect(() => {
        if (editArmError) {
            toast.error(editArmError, {
                autoClose: 5000,
                position: toast.POSITION.TOP_RIGHT,
                //onClose: () => dispatch(clearAllErrors())
            });
        }
    }, [editArmError]);

    useEffect(() => {
        if (deleteArmSuccess) {
            closeModal();
            toast.success("Arm has been deleted successfully", {
                autoClose: 5000,
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    });

    useEffect(() => {
        if (deleteArmError) {
            toast.error(deleteArmError, {
                autoClose: 5000,
                position: toast.POSITION.TOP_RIGHT,
                //onClose: () => dispatch(clearAllErrors())
            });
        }
    }, [deleteArmError]);

    let table = null;

    if (getArmError) {
        const message = [
            "Please click ",
            <Link to="arm" onClick={refreshPage}>here</Link>,
            " to refresh.",
        ];
        table = (
            <Error
                size="small"
                icon={AiFillFileExclamation}
                iconSize="80"
                title={getArmError}
                message={message.map((el, i) => (
                    <React.Fragment key={i}>{el}</React.Fragment>
                ))}
            />
        );
    }

    if (arm) {
        table = (
            <table className="table">
                <thead>
                    <tr>
                        <th>Arm Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {arm.length > 0 ? (
                        arm.map((arm) => {
                            return (
                                <tr key={arm.id}>
                                    <td>{utils.capitalize(arm.name)}</td>
                                    <td className="text-right">
                                        <span
                                            onClick={() =>
                                                openModalForEditArm(
                                                    arm.id,
                                                    arm.name,
                                                )
                                            }
                                            className="table-action-btn edit"
                                        >
                                            <FiEdit2 />
                                        </span>
                                        <span
                                            onClick={() =>
                                                openModalForDeleteArm(arm.id, arm.name)
                                            }
                                            className="table-action-btn delete"
                                        >
                                            <FiTrash2 />
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="3">
                                <img src={Empty} alt="Empty" />
                                <p className="text-align-center">
                                    You haven't added any arm yet.
                                </p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    if (getArmRequesting) {
        table = <Spinner style={{ top: "30em" }} />;
    }

    const addArmModalContent = (
        <>
            <h1 className="modal-title">
                {editMode ? "Edit Arm" : "Create Arm"}
            </h1>
            <div className="form">
                <form onSubmit={addArmhandler}>
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
                                !formIsValid || addArmRequesting || editArmRequesting
                            }
                            type="submit"
                            classess={buttonClasses.join(" ")}
                        >
                            {editMode ? "Edit arm" : "Create arm"}
                        </ContainedButton>
                    </div>
                </form>
            </div>
        </>
    );

    const deleteArmModalContent = (
        <>
            <h1 className="modal-title">Delete Arm</h1>
            <p>
                Are you sure your want to delete the arm "
                <strong>{utils.capitalize(armToBeDeleted.name)}</strong>"?
            </p>
            <div className="form-action flex justify-flex-end mt-3">
                <GrayButton type="button" onClick={closeModal} classess="small mr-2">
                    Cancel
                </GrayButton>
                <DangerButton
                    onClick={() => deleteArmHandler(armToBeDeleted.id)}
                    disabled={deleteArmRequesting}
                    type="button"
                    classess={deleteButtonClasses.join(" ")}
                >
                    Delete
                </DangerButton>
            </div>
        </>
    );

    return (
        <section className="">
            <Toast style={{ backgroundColor: "#2ECC40" }} />
            <Modal show={showModal} closeModal={closeModal}>
                {deleteArmModal
                    ? deleteArmModalContent
                    : addArmModalContent}
            </Modal>

            <div className="table-widget">
                <h3 className="title">Arms</h3>
                <ContainedButton onClick={openModalForAddArm} classess="small">
                    Add Arm
                </ContainedButton>
            </div>

            {table}
        </section>
    );
}

export default Arm;