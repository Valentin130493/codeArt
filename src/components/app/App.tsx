import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "../../pages";
import {ConfigProvider} from "antd";


const router = createBrowserRouter(routes);

const App = () => {
    return <ConfigProvider
        theme={{
            token: {

                colorBgLayout: '#fff'
            },
        }}
    ><RouterProvider router={router}/></ConfigProvider>
}


export default App
