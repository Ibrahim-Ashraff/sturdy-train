import React, { useEffect } from 'react';
import { FaCertificate } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import {
  getCertificates,
} from "../../../../store/actions";
import Spinner from "../../../../components/UI/Spinner/Spinner";

const AdminDashboard = props => {


  // Dispatch
  const dispatch = useDispatch();

  // Reducers
  const studentReducer = useSelector((state) => state.studentReducer);
  const getCertificatesRequesting = studentReducer?.getCertificatesRequesting;
  const certificates = studentReducer?.certificates;
  // State


  // Functions


  const fetchData = () => {
    dispatch(getCertificates());

  }

  // Use Effects
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  let dashboardContent = null

  if (getCertificatesRequesting) {
    dashboardContent = <Spinner style={{ top: "30em" }} />;
  }



  if (certificates) {

    dashboardContent = (
      <>
        <h2>Certificates</h2>

        <div className="dashboard">

          <div className="top-grid-row">
            {certificates.length > 0 ? (
              certificates.map((certificate) => {
                return (

                  <>
                    <div className="dashboard-block" id="first">
                      <div className="icon-area">
                        <FaCertificate size={32} />
                      </div>
                      <div className="textArea">
                        <h3 className="textArea__title">{certificate.student.firstName} {certificate.student.lastName}'s Certificate</h3>
                        <h1 className="textArea__value">{certificate.degree}</h1>
                        <h3 className="textArea__title">{certificate.code} </h3>

                      </div>
                    </div>

                  </>

                )

              })
            ) : <></>}
          </div>
        </div>

      </>);
  }





  return (
    <React.Fragment>

      {dashboardContent}
    </React.Fragment>
  );
}

export default AdminDashboard;