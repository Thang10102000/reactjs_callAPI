import Api from "./Api";

const url = "/departments";

const getAll = () => {
    return Api.get(url);
};

const DepartmentApi = { getAll };
export default DepartmentApi;

