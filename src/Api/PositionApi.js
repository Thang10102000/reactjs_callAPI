import Api from "./Api";

const url = "/possitions";

const getAll = () => {
    return Api.get(url);
};

// export
const PossitionsApi = { getAll };
export default PossitionsApi;
