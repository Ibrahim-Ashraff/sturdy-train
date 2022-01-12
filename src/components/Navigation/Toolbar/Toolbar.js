import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import LeftNav from "./LeftNav/LeftNav";
import Header from "./Header/Header";
import SubHeader from "./Header/SubHeader/SubHeader";

const toolbar = React.memo((props) => {
  const pageTitles = {
    "/app/admin-dashboard": "Dashboard",
    "/app/users": "Users",
    "/app/students": "Students",
    "/app/students/add": "Add Student",
    "/app/classes": "Classes",
    "/app/finance": "Finance",
    "/app/reports": "Reports",
    "/app/exams": "Exams",
    "/app/settings": "Settings",
    "/app/employees": "Employees",
    "/app/results": "Results",
    "/app/teacher-results": "Results",
    "/app/guardian-dashboard": "Dashboard",

    "/app/guardians": "Guardians",
    "/app/assign-subjects": "Assign Subjects",
    "/app/payment": "Pay Fee",
    "/app/ward-transaction": "Wards-Transactions",
    "/app/wardPayment-history": "Transactions",
    "/app/wardprofile": "Wards",
  };

  const pathsWithSubHeader = [
    {
      path: "/app/assign-subjects",
      links: [
        {
          title: "Assign Subjects to Classroom",
          href: "/app/assign-subjects",
        },
        {
          title: "Assign Subject to Teachers",
          href: "/app/assign-subjects/teachers",
        },
      ],
    },

    {
      path: "/app/settings",
      links: [
        {
          title: "School Profile",
          href: "/app/settings",
        },
        {
          title: "Academic Session",
          href: "/app/settings/session",
        },
        {
          title: "Classes",
          href: "/app/settings/classes",
        },
        {
          title: "Arm",
          href: "/app/settings/arm",
        },
        {
          title: "Class Arm",
          href: "/app/settings/class-arm",
        },
        {
          title: "Class Batch",
          href: "/app/settings/class-room",
        },
        {
          title: "Section",
          href: "/app/settings/sections",
        },
        {
          title: "Terms",
          href: "/app/settings/terms",
        },
        {
          title: "Subjects",
          href: "/app/settings/subjects",
        },
        {
          title: "House",
          href: "/app/settings/house",
        },
        {
          title: "Change Password",
          href: "/app/settings/change-password",
        },
      ],
    },
    {
      path: "/app/finance",
      links: [
        {
          title: "Fee Types",
          href: "/app/finance",
        },
        {
          title: "Fees",
          href: "/app/finance/fees",
        },
        {
          title: "Allocate Fee",
          href: "/app/finance/allocate-fee",
        },
      ],
    },

    {
      path: "/app/guardians/profile/:guardianId",
      links: [
        {
          title: "Profile",
          href: "/app/guardians/profile/:guardianId",
        },
        {
          title: "Wards",
          href: "/app/guardians/profile/:guardianId/wards",
        },
      ],
    },

    {
      path: "/app/results",
      links: [
        {
          title: "Results Configuration",
          href: "/app/results",
        },
        {
          title: "Create Results",
          href: "/app/results/add-results",
        },
        {
          title: "View Results",
          href: "/app/results/view-results",
        },
      ],
    },

    {
      path: "/app/teacher-results",
      links: [
        {
          title: "Results Configuration",
          href: "/app/teacher-results",
        },
        {
          title: "Create Results",
          href: "/app/teacher-results/add-results",
        },
        {
          title: "View Results",
          href: "/app/teacher-results/view-results",
        },
      ],
    },
  ];

  const pathname = props.location?.pathname;
  const arr = pathname.split("/");
  let newPathname = arr.splice(0, 3).join("/");

  let showSubHeader = pathsWithSubHeader
    .map((el) => el.path)
    .includes(newPathname);

  // States
  const [isNavOpen, setNavOpen] = useState(false);

  const openNavHandler = () => {
    setNavOpen(!isNavOpen);
  };

  // pageTitle = { pageTitles[newPathname]}

  return (
    <div className="toolbar" key={pageTitles[newPathname]}>
      <Header onClick={openNavHandler} pageTitle={pageTitles[newPathname]} />
      <SubHeader
        show={showSubHeader}
        links={pathsWithSubHeader.filter((el) => el.path === newPathname)[0]}
      />
      <LeftNav openNavHandler={openNavHandler} isNavOpen={isNavOpen} />
    </div>
  );
});

export default withRouter(toolbar);
