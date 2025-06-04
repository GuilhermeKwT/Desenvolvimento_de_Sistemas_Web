import { Router } from "express";
import OrdersController from "../controllers/OrdersController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get('/', isAuthenticated, async(req, res, next) =>{
    try{
        await ordersController.index(req, res, next);
    }
    catch(err){
        next(err);
    }
});

ordersRouter.get('/:id', isAuthenticated, celebrate({ 
        [Segments.PARAMS]: {id: Joi.string().uuid().required()} }),
    async(req, res, next) =>{
    try{
        await ordersController.show(req, res, next);
    }
    catch(err){
        next(err);
    }
});

ordersRouter.post('/', isAuthenticated,
        celebrate({ [Segments.BODY]: {
        customer_id: Joi.string().required(),
        products: Joi.required()
    }}),
    async(req, res, next) =>{
    try{
        await ordersController.create(req, res, next);
    }
    catch(err){
        next(err);
    }
});

export default ordersRouter;