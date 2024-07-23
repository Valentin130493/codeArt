import {FormValues} from "../types.ts";
import axios from "axios";
import {API_LOGIN, API_URL} from "../../../static/api.ts";

export function useAuth() {
    const singIn = async (values: FormValues) => {
        const res = await axios.post(`${API_URL}${API_LOGIN}`, values)

        console.log(res)
    }

    return {
        singIn
    }
}