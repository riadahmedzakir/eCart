function GetQueryParamFromString(queryString) {
    queryString = queryString.replace("?", '');
    const spliitedStrings = queryString.split("&");
    const queryParams = {};

    spliitedStrings.forEach(items => {
        const x = items.split("=")

        queryParams[x[0]] = x[1];
    });

    return queryParams;
}

const UtilityService = {
    GetQueryParamFromString: GetQueryParamFromString
};

export default UtilityService;