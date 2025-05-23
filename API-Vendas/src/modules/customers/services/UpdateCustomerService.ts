import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string,
    name: string,
    email: string
}

export default class UpdateCustomerService{
    public async execute({id, name, email} : IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomersRepository)
        const customer = await customerRepository.findById(id);
        if(!customer){
            throw new AppError('Customer not found.');
        }
        const customerExists = await customerRepository.findByEmail(email);
        if(customerExists && email !== customer.email){
            throw new AppError('Email address alredy used.');
        }
        customer.name = name;
        customer.email = email
        await customerRepository.save(customer);
        return customer;
    }
}