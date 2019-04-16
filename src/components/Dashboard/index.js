import React from "react";
import "../../styles/components/Dashboard.css";
import TeamMembers from "./TeamMembers";
import CaptainChair from "./CaptainChair";

const Dashboard = () => (
  <main id="dashboard">
    <TeamMembers />
    <CaptainChair />
  </main>
);

export default Dashboard;
