import clientsRouter from "@modules/clients/routes/client.routes";
import ticketsRouter from "@modules/tickets/routes/tickets.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();
routes.use('/users', usersRouter); 
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/client', clientsRouter);
routes.use('/tickets', ticketsRouter)

export default routes;