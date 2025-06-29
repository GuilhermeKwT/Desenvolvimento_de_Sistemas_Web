import { getCustomRepository, Timestamp } from "typeorm";
import Client from "../typeorm/entities/Client";
import ClientRepository from "../typeorm/repositories/ClientsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
    name: string;
    email: string;
    password: string;
    phone_number: string;
}

export default class UpdateClientService {
    public async execute ({id, name, email, password, phone_number}: IRequest): Promise<Client> {
        const clientsRepository = getCustomRepository(ClientRepository)

        const client = await clientsRepository.findOne(id);
        if(!client)
            throw new AppError("Client not found.")

        const clientExits = await clientsRepository.findByEmail(email);
        if(clientExits && email !== client.email)
            throw new AppError("There is already one client with this email.");

        client.name = name;
        client.email = email;
        client.password = password;
        client.phone_number = phone_number;
        await clientsRepository.save(client);

        return client;
    }
}