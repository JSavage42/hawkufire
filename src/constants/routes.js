export const HOME = "/";
export const DASHBOARD = "/dashboard";
export const SIGN_UP = "/signup";
export const SIGN_IN = "/signin";
export const ACCOUNT = "/account";
export const PASSWORD_FORGET = "/pw-forget";

// Admin
export const ADMIN = "/admin";
export const ADMIN_DETAILS = "/admin/:uid";

// Users
export const FACULTY = "/faculty";
export const FACULTY_DETAILS = "/faculty/:uid";

// Competitors
export const COMPETITORS = "/competitors";
export const EDIT_COMPETITOR = "/competitors/:uid/edit";
export const VIEW_COMPETITOR = "/competitors/:uid";

// Team
export const TEAMS = "/team";
export const ADD_TEAM = "/team/add";
export const EDIT_TEAM = "/team/:tid/edit";
export const VIEW_TEAM = "/team/:tid";

// Competitions
export const COMPETITIONS = "/competition";
export const ADD_COMPETITION = "/competition/add";
export const EDIT_COMPETITION = "/competition/:semesteryear/:name/edit";
export const VIEW_COMPETITION = "/competition/:semesteryear/:name/";

// Anomalies
export const ANOMALIES = "/anomaly";
export const ADD_ANOMALY = "/anomaly/add";
export const EDIT_ANOMALY = "/anomaly/:tid/:cid/:aid/edit";
export const VIEW_ANOMALY = "/anomaly/:tid/:cid/:aid";

// Reports
export const REPORTS = "/report";
export const ADD_REPORT = "/report/add";
export const EDIT_REPORT = "/report/edit/:rid";
export const VIEW_REPORT = "/report/:rid";
