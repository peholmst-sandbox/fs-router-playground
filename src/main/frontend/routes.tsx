import {createBrowserRouter} from 'react-router-dom';
import {serverSideRoutes} from "Frontend/generated/flow/Flow";
import views from 'Frontend/generated/views.js';
import {toReactRouter} from "@vaadin/hilla-file-router/runtime.js";

const route = toReactRouter(views)
route.children?.push(...serverSideRoutes)

export const routes = [route]

export default createBrowserRouter(routes);
