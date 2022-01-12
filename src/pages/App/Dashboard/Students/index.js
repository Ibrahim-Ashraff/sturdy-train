import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { FaRegCreditCard } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { FaClipboardList } from 'react-icons/fa';
import { AiFillFileExclamation, AiOutlineHourglass } from 'react-icons/ai';
import { IoWalletOutline } from 'react-icons/io5'
import { getStudentDashboard } from '../../../../store/actions';
import { Error } from "../../../../components/UI/Errors";
import Spinner from '../../../../components/UI/Spinner/Spinner';



const StudentDashboard = props => {

    const dispatch = useDispatch()

    //history
    const history = useHistory()

    const studentDashboard = useSelector(state => state.studentDashboard);
    const getStudentDashboardRequesting = studentDashboard?.getStudentDashboardRequesting;
    const getStudentDashboardError = studentDashboard?.getStudentDashboardError;
    const student = studentDashboard?.student


    const getDashboard = () => {
        dispatch(getStudentDashboard());
    };

    useEffect(() => {
        getDashboard();
    });

    const refreshPage = () => {
        getDashboard();
    };

    let table = null

    if (getStudentDashboardError) {
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
                title={getStudentDashboardError}
                message={message.map((el, i) => (
                    <React.Fragment key={i}>{el}</React.Fragment>
                ))}
            />
        );
    }


    if (getStudentDashboardRequesting) {
        table = <Spinner style={{ top: "50em" }} />;
    }

    if (student) {
        table = (
            <div className="dashboard">

                <div className="top-grid-row">

                    <div className="dashboard-block" id="first">
                        <div className="icon-area">
                            <IoWalletOutline size={32} />
                        </div>
                        <div className="textArea">
                            <h3 className="textArea__title">Total fees</h3>
                            <h1 className="textArea__value">₦{student.total_fees}</h1>
                        </div>
                    </div>

                    <div className="dashboard-block" id="second">
                        <div className="icon-area">
                            <GiTakeMyMoney size={32} />
                        </div>
                        <div className="textArea">
                            <h3 className="textArea__title">Fees collected</h3>
                            <h1 className="textArea__value">₦{student.paid_fees}</h1>
                        </div>
                    </div>

                    <div className="dashboard-block" id="third">
                        <div className="icon-area">
                            <AiOutlineHourglass size={32} />
                        </div>
                        <div className="textArea">
                            <h3 className="textArea__title">Pending fees</h3>
                            <h1 className="textArea__value">₦{student.pending_fees}</h1>
                        </div>
                    </div>
                    <div className="dashboard-block" id="fourth" onClick={() => history.push("/app/student-result")}>
                        <div className="icon-area">
                            <HiOutlineClipboardList size={32} />
                        </div>
                        <div className="textArea">
                            <h3 className="textArea__title">2nd Term</h3>
                            <h1 className="textArea__value">Results</h1>
                        </div>
                    </div>

                    <div className="dashboard-block" id="fifth" onClick={() => history.push("/app/payment-history")}>
                        <div className="icon-area">
                            <FaClipboardList size={32} />
                        </div>
                        <div className="textArea">
                            <h3 className="textArea__title">completed & pending</h3>
                            <h1 className="textArea__value">Transactions</h1>
                        </div>
                    </div>

                    {/* <div className="dashboard-block" id="sixth" onClick={() => history.push("/app/student-report")}>
                        <div className="icon-area">
                            <AiOutlineHourglass size={32} />
                        </div>
                        <div className="textArea" >
                            <h3 className="textArea__title">send & receive</h3>
                            <h1 className="textArea__value">Report/Complaints</h1>
                        </div>
                    </div> */}
                    <div className="dashboard-block" id="seventh" onClick={() => history.push("/app/payment")}>
                        <div className="icon-area">
                            <FaRegCreditCard size={32} />
                        </div>
                        <div className="textArea">
                            <h3 className="textArea__title">2nd Term</h3>
                            <h1 className="textArea__value">Pay Fees</h1>
                        </div>
                    </div>


                </div>

            </div>
        )
    }
    return (
        <React.Fragment>
            {table}
        </React.Fragment>
    );
}

export default StudentDashboard;