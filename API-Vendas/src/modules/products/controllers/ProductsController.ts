import { NextFunction, Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default class ProductsController{

    public async index(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const listProducts = new ListProductService();
            const products = await listProducts.execute();
            return response.json(products);
        }
        catch(err){
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {id} = request.params;
            const showProduct = new ShowProductService();
            const product = await showProduct.execute({id});
            return response.json(product);
        }
        catch(err){
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {name, price, quantity} = request.body;
            const createProduct = new CreateProductService();
            const product = await createProduct.execute({name, price, quantity});
            return response.json(product);
        }
        catch(err){
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {id} = request.params;
            const {name, price, quantity} = request.body;
            const updateProduct = new UpdateProductService();
            const product = await updateProduct.execute({id, name, price, quantity});
            return response.json(product);
        }
        catch(err){
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction) : Promise<Response | void>{
        try{
            const {id} = request.params;
            const deleteProduct = new DeleteProductService();
            await deleteProduct.execute({id});
            return response.json([]);
        }
        catch(err){
            next(err);
        }
    }
}