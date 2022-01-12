import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { getStudentBio, deleteStudent } from '../../../../store/actions/action-creators/student/student';
import { getFeesPayable } from "../../../../store/actions/action-creators/finance/index"
import { getResultDetails } from '../../../../store/actions/action-creators/results/results';
import { Error } from "../../../../components/UI/Errors";
import { FaTrash, FaCloudDownloadAlt, FaMoneyCheck } from "react-icons/fa";
import { GrEdit } from "react-icons/gr"
import { AiFillFileExclamation } from "react-icons/ai";
import Modal from '../../../../components/UI/Modal/Modal';
import faker from 'faker';
import { toast } from "react-toastify";
import Toast from "../../../../components/UI/Toast/Toast";
import GoBack from '../../../../components/Back/Back';
import { OutlinedButton, DangerButton } from '../../../../components/UI/Button/Button';
import { MdMessage } from "react-icons/md"


const StudentProfile = () => {
    const { studentId } = useParams();
    const history = useHistory()
    const dispatch = useDispatch()


    // Redux store
    const studentReducer = useSelector(state => state.studentReducer);
    const getStudentRequesting = studentReducer?.getStudentRequesting;
    const getStudentError = studentReducer?.getStudentError;

    const deleteStudentRequesting = studentReducer?.deleteStudentRequesting;
    const deleteStudentSuccess = studentReducer?.deleteStudentSuccess;
    const deleteStudentError = studentReducer?.deleteStudentError;

    const student = studentReducer?.student

    const resultReducer = useSelector(state => state.resultReducer)
    const getResultDetailRequesting = resultReducer?.getResultDetailRequesting
    const getResultDetailSuccess = resultReducer?.getResultDetailSuccess
    const getResultDetailError = resultReducer?.getResultDetailError
    const details = resultReducer?.detail


    //fees payable reducer
    const feesPayableReducer = useSelector(state => state.feesPayableReducer);
    const getFeesPayableRequesting = feesPayableReducer?.getFeesPayableRequesting
    const getFeesPayableError = feesPayableReducer?.getFeesPayableError
    const feesPayable = feesPayableReducer?.fee_payable


    const [showModal, setShowModal] = useState(false);
    const [guardianView, setGuardianView] = useState(false)

    const [deleteStudentModal, setDeleteStudentModal] = useState(false)
    const [studentToBeDeleted, setStudentToBeDeleted] = useState({
        id: "",
        name: "",
        lastname: ""
    })



    const getAllStudent = () => {
        dispatch(getStudentBio(studentId));
        dispatch(getResultDetails(studentId))
        dispatch(getFeesPayable(studentId))

    };

    useEffect(() => {
        getAllStudent();
    }, []);

    const refreshPage = () => {
        getAllStudent();
    };

    const deleteStudentHandler = (studentId) => {
        dispatch(deleteStudent(studentId));

    };

    const openModalForDeleteStudent = (studentId, studentfirstname, studentlastname) => {
        setShowModal(true)
        setDeleteStudentModal(true)
        setStudentToBeDeleted({
            ...studentToBeDeleted,
            id: studentId,
            name: studentfirstname,
            lastname: studentlastname
        });
    }

    useEffect(() => {
        if (deleteStudentSuccess) {
            toast.success("Student has been deleted successfully", {
                autoClose: 5000,
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    });

    useEffect(() => {
        if (deleteStudentError) {
            toast.error(deleteStudentError, {
                autoClose: 5000,
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }, [deleteStudentError]);


    let table = null

    if (getStudentError) {
        const message = [
            "Please click ",
            <Link onClick={refreshPage}>here</Link>,
            " to refresh.",
        ];
        table = (
            <Error
                size="small"
                icon={AiFillFileExclamation}
                iconSize="80"
                title={getStudentError}
                message={message.map((el, i) => (
                    <React.Fragment key={i}>{el}</React.Fragment>
                ))}
            />
        );
    }

    let totalSum = 0
    if (feesPayable?.length > 0) {
        totalSum = feesPayable.map(item => item.amount).reduce((prev, next) => prev + next);
    }

    const goToResult = (studentId) => {
        setShowModal(true)
        setDeleteStudentModal(false)
    }

    // Functions
    const initials = (name) => {
        const nameArr = name.split(" ");
        return nameArr[0].slice(0, 1) + nameArr[1].slice(0, 1);
    };


    const goToEditUserDetails = (studentId) => {

        history.push({
            pathname: `/app/student/edit-profile/${studentId}`
        });

    }

    const goToStudentResult = (studentId, classRoomId, termId) => {
        history.push({
            pathname: `/app/results/${studentId}/${classRoomId}/${termId}`
        });

    }

    if (getStudentRequesting) {
        table = <Spinner style={{ top: "50em" }} />;
    }

    let deleteButtonClasses = ["small"];
    if (deleteStudentRequesting) {
        deleteButtonClasses.push("button--loading");
    }



    const deleteStudentContent = (
        <>
            <h1 className="modal-title">Delete Student</h1>
            <p>
                Are you sure your want to delete the Student "
                <strong>{studentToBeDeleted.name} {studentToBeDeleted.lastname}</strong>"?
            </p>
            <div className="form-action flex justify-flex-end mt-3">
                <OutlinedButton type="button" onClick={() => setShowModal(false)} classess="small mr-2">
                    Cancel
                </OutlinedButton>
                <DangerButton
                    onClick={() => deleteStudentHandler(studentToBeDeleted.id)}
                    disabled={deleteStudentRequesting}
                    type="button"
                    classess={deleteButtonClasses.join(" ")}
                >
                    Delete Anyway
                </DangerButton>
            </div>
        </>
    )

    const color = faker.internet.color();
    const bgColor = color + "40";

    let resultDetailsContent = null

    if (getResultDetailRequesting) {
        resultDetailsContent = <Spinner />;
    }


    if (getResultDetailError) {
        const message = [
            "Please click ",
            <Link onClick={refreshPage}>here</Link>,
            " to refresh.",
        ];
        resultDetailsContent = (
            <Error
                size="small"
                icon={AiFillFileExclamation}
                iconSize="80"
                title={getResultDetailError}
                message={message.map((el, i) => (
                    <React.Fragment key={i}>{el}</React.Fragment>
                ))}
            />
        );
    }

    if (details) {
        resultDetailsContent = (
            <>


                <h3 className="header-tertiary" style={{ fontWeight: "bold" }}>Results</h3>

                <ol>

                    {details.length > 0 ? (
                        details.map((detail) => {
                            return (
                                <div className="text-to-form-row">
                                    <div className="text-to-form-item mt-1">
                                        <li onClick={() => goToStudentResult(studentId, detail.classroom_id, detail.term_id)} className="result-details">{detail.term_name} Results for {detail.class_name} {detail.session_name} Session </li>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <></>
                    )}

                </ol>

            </>
        )
    }

    let guardians = null

    if (student) {

        guardians = (
            <section className=" user-details">

                <div className="guardian-sub-header">
                    <ul>
                        <li onClick={() => setGuardianView(false)} style={{ cursor: "pointer" }}>
                            Profile
                        </li>
                        <li onClick={() => setGuardianView(true)} style={{ color: "#185adb", borderBottom: "1px solid", cursor: "pointer" }}>
                            Guardians
                        </li>

                    </ul>

                    <div className="divider"></div>
                </div>

                <div className="user-details-info">

                    <div className="column-1">
                        <div>
                            <h3 className="header-tertiary">Account Profile </h3>
                            <div className="user-profile-photo">

                                {student.photo === "" ?


                                    <div
                                        className="initials initials-profile "
                                        style={{ backgroundColor: bgColor, color: color }}>
                                        {initials(student.first_name + " " + student.last_name)}

                                    </div>

                                    :

                                    <img src={student.photo} alt={student.first_name} />
                                }
                            </div>
                        </div>
                    </div>

                    <div className="column-2">
                        {student.guardians && Array.isArray(student.guardians) ? student.guardians.map((ward) => {
                            return (
                                <>
                                    <h3 className="header-tertiary">{ward.first_name + " " + ward.middle_name + " " + ward.last_name} </h3>

                                    <div className="text-to-form-row">
                                        <div className="text-to-form-item">
                                            <label>Relationship</label>

                                            <p>{ward.relationship}</p>

                                        </div>

                                        <div className="text-to-form-item">
                                            <label>Address</label>
                                            <p>{ward.address}</p>
                                        </div>
                                        <div className="text-to-form-item">
                                            <label>Phone Number</label>
                                            <p>{ward.phone}</p>
                                        </div>
                                        <div className="text-to-form-item">
                                            <label>Phone Number 2</label>
                                            <p>{ward.altphone}</p>
                                        </div>
                                        <div className="text-to-form-item">
                                            <label>Email</label>
                                            <p>{ward.email}</p>
                                        </div>
                                        <div className="text-to-form-item">
                                            <label>Gender</label>
                                            <p>{ward.gender}</p>
                                        </div>
                                        <div className="text-to-form-item">
                                            <label>Religion</label>
                                            <p>{ward.religion}</p>
                                        </div>

                                    </div>


                                    <div className="divider"></div>


                                </>
                            )
                        }) : student.guardians}
                    </div>

                </div>
            </section>
        )
        table = (
            <section className="user-details">

                <div className="guardian-sub-header">
                    <ul>
                        <li onClick={() => setGuardianView(false)} style={{ color: "#185adb", borderBottom: "1px solid", cursor: "pointer" }} >
                            Profile
                        </li>
                        <li onClick={() => setGuardianView(true)} style={{ cursor: "pointer" }}>
                            Guardians
                        </li>

                    </ul>

                    <div className="divider"></div>

                </div>
                <div className="widget-row">

                    <div></div>


                    <Modal show={showModal} closeModal={() => setShowModal(false)}>
                        {
                            deleteStudentModal ? deleteStudentContent : resultDetailsContent
                        }

                    </Modal>

                    <div className="widget-row-items">
                        <div className="widget-row-item" onClick={() => goToEditUserDetails(student.id)}>
                            <GrEdit />
                        </div>


                        <div className="widget-row-item">
                            <FaTrash onClick={() => openModalForDeleteStudent(student.id, student.first_name, student.last_name)} style={{ fill: "red" }} />
                        </div>

                        {/* <div className="widget-row-item">

                            <a href={`mailto:${student.email}`}>
                                <MdMessage />
                            </a>
                        </div> */}
                    </div>
                </div>

                <div className="user-details-info">

                    <div className="column-1">
                        <div>
                            <h3 className="header-tertiary">Account </h3>
                            <div className="user-profile-photo">

                                {student.photo === "" ?
                                    <div
                                        className="initials initials-profile "
                                        style={{ backgroundColor: bgColor, color: color }}>
                                        {initials(student.first_name + " " + student.last_name)}
                                    </div>
                                    :
                                    <img src={student.photo} alt={student.first_name} />
                                }

                            </div>
                        </div>


                        <div>
                            <h3 className="header-tertiary">Pending Fees</h3>
                            <div className="user-docs">
                                <div className="user-docs-item" style={{ color: "#800020", fontWeight: "bold" }} >
                                    <FaMoneyCheck />
                                    <p>NGN {totalSum}</p>
                                </div>

                            </div>
                        </div>

                        <div>
                            <h3 className="header-tertiary">Documents</h3>
                            <div className="user-docs">
                                <div className="user-docs-item" style={{ cursor: "pointer" }} onClick={() => goToResult(student.id)}>
                                    <FaCloudDownloadAlt />
                                    <p>Exam results</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="column-2">

                        <h3 className="header-tertiary">Personal Information</h3>

                        <div className="text-to-form-row">
                            <div className="text-to-form-item">
                                <label>First name</label>

                                <p>{student.first_name}</p>

                            </div>
                            <div className="text-to-form-item">
                                <label>Middle name</label>
                                <p>{student.middle_name}</p>
                            </div>

                            <div className="text-to-form-item">
                                <label>Last name</label>
                                <p>{student.last_name}</p>
                            </div>
                        </div>

                        <div className="text-to-form-row">
                            <div className="text-to-form-item">
                                <label>Date of birth</label>
                                <p>{student.dob}</p>
                            </div>
                            <div className="text-to-form-item">
                                <label>State</label>
                                <p>{student.state}</p>
                            </div>
                            <div className="text-to-form-item">
                                <label>LGA</label>
                                <p>{student.lga}</p>
                            </div>
                        </div>

                        <div className="text-to-form-row">
                            <div className="text-to-form-item">
                                <label>Nationality</label>
                                <p>{student.nationality}</p>
                            </div>
                            <div className="text-to-form-item">
                                <label>Sex</label>
                                <p>{student.gender}</p>
                            </div>
                            <div className="text-to-form-item">
                                <label>Current Classroom</label>
                                <p>{student.current_classroom_name}</p>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <h3 className="header-tertiary">Contact Information</h3>

                        <div className="text-to-form-row">
                            <div className="text-to-form-item">
                                <label>Phone Number 1</label>
                                <p>{student.phone}</p>
                            </div>
                            <div className="text-to-form-item">
                                <label>Phone Number 2</label>
                                <p>{student.alt_phone}</p>
                            </div>
                            <div className="text-to-form-item">
                                <label>Email</label>
                                <p>{student.email}</p>
                            </div>
                        </div>

                        <div className="text-to-form-row">
                            <div className="text-to-form-item">
                                <label>Address</label>
                                <p>{student.address}</p>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <h3 className="header-tertiary">Other Information</h3>
                        <div className="text-to-form-row">
                            <div className="text-to-form-item">
                                <label>House</label>
                                <p>{student.house}</p>
                            </div>
                            <div className="text-to-form-item">
                                <label>Admission Number</label>
                                <p>{student.admission_number}</p>
                            </div>
                            <div className="text-to-form-item">
                                <label>Blood Group</label>
                                <p>{student.blood_group}</p>
                            </div>
                            <div className="text-to-form-item">
                                <label>Genotype</label>
                                <p>{student.genotype}</p>
                            </div>
                            <div className="text-to-form-item">
                                <label>Religion</label>
                                <p>{student.religion}</p>
                            </div>

                        </div>
                    </div>

                </div>

            </section>
        )
    }

    return (
        <div>
            <Toast style={{ backgroundColor: "#2ECC40" }} />
            <GoBack title="Back" url="/app/students" />

            {guardianView ? guardians : table}
        </div>
    )
}

export default StudentProfile