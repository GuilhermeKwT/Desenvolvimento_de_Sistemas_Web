import { response, Router } from "express";
import { request } from "http";

const routes = Router();

routes.get('/', (request, response) => {
    response.json({message : 'Hello Dev'});
    return;
});

export default routes;