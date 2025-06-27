import { NextFunction, Request, Response } from "express";
import UpdateClientAvatarService from "../services/UpdateClientAvatarService";

export default class ClientAvatarController{
    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = request.params;
            const updateClientAvatar = new UpdateClientAvatarService();
            const client = updateClientAvatar.execute({client_id: id,
                avatarFileName: request.file?.filename as string});
            return response.json(client);
        }
        catch(err){
            next(err);
        }
    }
}