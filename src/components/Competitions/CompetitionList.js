import React, { Component, Fragment } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

const CompetitionList = () => (
  <main id="competition_list">
    <h1>Competitions</h1>
    <Link to={ROUTES.ADD_COMPETITION}>Add Competition</Link>
  </main>
);

export default CompetitionList;
