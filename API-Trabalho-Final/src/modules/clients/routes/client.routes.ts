import { Router } from "express";
import ClientsController from "../controllers/ClientsController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import multer from "multer";
import uploadConfig from "@config/upload";
import ClientAvatarController from "../controllers/ClientAvatarController";

const clientsRouter = Router();
const clientsController = new ClientsController();
clientsRouter.use(isAuthenticated);

const clientAvatarController = new ClientAvatarController();
const upload = multer(uploadConfig);

clientsRouter.patch('/avatar/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), upload.single('avatar'),
async(req, res, next) => {
    try{
        await clientAvatarController.update(req, res, next);
    }
    catch(err){
        next(err);
    }
});

clientsRouter.get("/", async (req, res, next) => {
    try {
        await clientsController.index(req, res, next);
    } catch (err) {
        next(err);
    }
})

clientsRouter.get("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), async (req, res, next) => {
    try {
        await clientsController.show(req, res, next);
    } catch (err) {
        next(err);
    }
})

clientsRouter.post("/", celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phone_number: Joi.string().required()
    }
}), async (req, res, next) => {
    try {
        await clientsController.create(req, res, next);
    } catch (err) {
        next(err);
    }
})

clientsRouter.put("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phone_number: Joi.string().required()
    }
}), async (req, res, next) => {
    try {
        await clientsController.update(req, res, next);
    } catch (err) {
        next(err);
    }
})

clientsRouter.delete("/:id", async (req, res, next) => {
    try {
        await clientsController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
})

export default clientsRouter;