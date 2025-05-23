import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

interface IRequest{
    name: string,
    email: string
}

export default class CreateCustomerService{
    public async execute({name, email} : IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomersRepository)
        const emailExists = await customerRepository.findByEmail(email);
        if(emailExists){
            throw new AppError('Email address alredy used.');
        }
        const customer = customerRepository.create({name, email});
        await customerRepository.save(customer);
        return customer;
    }
}