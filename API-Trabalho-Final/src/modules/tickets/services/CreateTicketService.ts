import { getCustomRepository, Timestamp } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";
import AppError from "@shared/errors/AppError";
import ClientRepository from "@modules/clients/typeorm/repositories/ClientsRepository";



interface IRequest {
    film: string;
    seats: string[];
    session_date: Date;
    room: string;
    clientId: string;
}

export default class CreateTicketService {
    public async execute ({film, seats, session_date, room, clientId}: IRequest): Promise<Ticket> {
        const ticketsRepository = getCustomRepository(TicketRepository)
        const clientRepository = getCustomRepository(ClientRepository);
        const client = await clientRepository.findById(clientId);
        if(!client)
            throw new AppError("Client not found.");

        const newTicket = ticketsRepository.create({film, seats, session_date, room, client});
        await ticketsRepository.save(newTicket);
        return newTicket;
    }
}