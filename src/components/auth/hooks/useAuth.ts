import {FormValues} from "../types.ts";
import {v4} from 'uuid';
import axios from "axios";
import {API_LOGIN, API_LOGOUT, API_URL, PASSWORD, USERNAME} from "../../../static/api.ts";
import {message} from "antd";
import {ROUTES} from '../../../routes'
import {useNavigate} from "react-router";
import {headerOptions} from "../../../static/headerRequest.ts";


export function useAuth() {
    const navigate = useNavigate()
    const singIn = async (values: FormValues) => {
        if (values.password === PASSWORD && values.username === USERNAME) {
            message.success('success')
            localStorage.setItem('token', v4())
            navigate(ROUTES.home)
        } else {
            message.error('something went wrong')
        }

        try {
            await axios.post(`${API_URL}${API_LOGIN}`, {
                "requestBody": {
                    ...values
                }
            }, {
                headers: {
                    ...headerOptions
                },
            })

        } catch (e) {
            throw new Error(`${e}`);
        }

    }
    const logOut = async () => {
        const token = localStorage.getItem('token')
        try {
            await axios.post(`${API_URL}${API_LOGOUT}`, {}, {
                headers: {
                    ...headerOptions,
                    "24CA04APR02": `${token}`
                }
            })
            localStorage.setItem('token', '')
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    return {
        singIn,
        logOut
    }
}