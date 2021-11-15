import Axios from "axios";
export const postAPI = async (url, data) => {
    try {
        const response = await Axios.post(url, data, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (err) {
        return "Something went wrong" + err;
    }
};
