import { Router } from "express";
import TicketsController from "../controllers/TicketsController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const ticketsRouter = Router();
const ticketsController = new TicketsController();
ticketsRouter.use(isAuthenticated);

ticketsRouter.get("/", async (req, res, next) => {
    try {
        await ticketsController.index(req, res, next);
    } catch (err) {
        next(err);
    }
})

ticketsRouter.get("/client/:clientId", celebrate({
    [Segments.PARAMS]: { clientId: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await ticketsController.listClientTickets(req, res, next);
    } catch (err) {
        next(err);
    }
})

ticketsRouter.get("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await ticketsController.show(req, res, next);
    } catch (err) {
        next(err);
    }
})

ticketsRouter.post("/", celebrate({
    [Segments.BODY]: {
        film: Joi.string().required(),
        seats: Joi.array().items(Joi.string()).required(),
        session_date: Joi.string().isoDate().required(),
        room: Joi.string().required(),
        clientId: Joi.string().uuid().required(),
    }
}), async (req, res, next) => {
    try {
        await ticketsController.create(req, res, next);
    } catch (err) {
        next(err);
    }
})

ticketsRouter.put("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        film: Joi.string().required(),
        seats: Joi.array().items(Joi.string()).required(),
        session_date: Joi.string().isoDate().required(),
        room: Joi.string().required(),
        clientId: Joi.string().uuid().required(),
    }
}), async (req, res, next) => {
    try {
        await ticketsController.update(req, res, next);
    } catch (err) {
        next(err);
    }
})

ticketsRouter.delete("/:id", async (req, res, next) => {
    try {
        await ticketsController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
})

export default ticketsRouter;