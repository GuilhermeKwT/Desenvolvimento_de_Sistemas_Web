import { getCustomRepository, Timestamp } from "typeorm";
import Ticket from "../typeorm/entities/Ticket";
import TicketRepository from "../typeorm/repositories/TicketRepository";
import AppError from "@shared/errors/AppError";
import ClientRepository from "@modules/clients/typeorm/repositories/ClientsRepository";

interface IRequest {
    id: string;
    film: string;
    seats: string[];
    session_date: Date;
    room: string;
    clientId: string;
}

export default class UpdateTicketService {
    public async execute ({id, film, seats, session_date, room, clientId}: IRequest): Promise<Ticket> {
        const ticketsRepository = getCustomRepository(TicketRepository)
        const clientRepository = getCustomRepository(ClientRepository);
        const ticket = await ticketsRepository.findOne(id);
        const client = await clientRepository.findById(clientId);

        if(!ticket)
            throw new AppError("Ticket not found.")

        if(!client)
            throw new AppError("Client not found.");

        ticket.film = film;
        ticket.seats = seats;
        ticket.session_date = session_date;
        ticket.room = room;
        ticket.client = client;
        await ticketsRepository.save(ticket);

        return ticket;
    }
}