const axios = require("axios");

const getStandingsBySeasonId = (seasonId) => {
    return get("/standings/" + seasonId + "/", {});
}

const getTeamByID = (teamId) => {
    return get("/teams/" + teamId + "/", {season_id: 40}); // uefa euro 2020
}

const get = (url, extraParams) => {
    const baseUrl = "https://api.statorium.com/api/v1";
    const apikey = "1865c0c6cf4d10da1701df8bc0b13812";
    const callUrl = baseUrl + url;
    const params = { apikey, ...extraParams};
    return axios.get(callUrl,  { params });
};

exports.getStandingsBySeasonId = getStandingsBySeasonId;
exports.getTeamById = getTeamByID;
