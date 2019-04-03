import React from "react";
import "../../styles/components/Dashboard.css";
import UserAnomalies from "./UserAnomalies";
import CaptainChair from "./CaptainChair";
import InternalComms from "./InternalComms";

const Dashboard = () => (
  <main id="dashboard">
    <h2>Dashing Board</h2>
    <UserAnomalies />
    <InternalComms />
    <CaptainChair />
  </main>
);

export default Dashboard;
