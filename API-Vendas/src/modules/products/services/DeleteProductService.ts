import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductsRepository from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
}

export default class DeleteProductService{
    public async execute({id} : IRequest) : Promise<void>{
        const productsRepository = getCustomRepository(ProductsRepository);
        const product = await productsRepository.findOne(id);
        if(!product){
            throw new AppError('Product not found');
        }
        await productsRepository.remove(product);
    }
}