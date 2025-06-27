import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import Client from "../typeorm/entities/Client";
import ClientsRepository from "../typeorm/repositories/ClientsRepository";


interface IRequest{
    client_id: string;
    avatarFileName: string;
}

export default class UpdateClientAvatarService{
    public async execute({client_id, avatarFileName}: IRequest) : Promise<Client>{
        const clientsRepository = getCustomRepository(ClientsRepository);
        const client = await clientsRepository.findById(client_id);
        if(!client){
            throw new AppError('Client not found.');
        }
        if(client.avatar){
            const clientAvatarFilePath = path.join(uploadConfig.directory, client.avatar);
            const clientAvatarFileExists = await fs.promises.stat(clientAvatarFilePath);
            if(clientAvatarFileExists){
                await fs.promises.unlink(clientAvatarFilePath);
            }
        }
        client.avatar = avatarFileName;
        await clientsRepository.save(client);
        return client;
    }
}