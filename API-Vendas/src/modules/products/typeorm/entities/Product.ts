import OrdersProducts from "@modules/orders/typeorm/entities/OrdersProducts";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export default class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column('decimal')
    price: number;
    @Column('int')
    quantity: number;
    @OneToMany(() => OrdersProducts, orders_products => orders_products.product, {cascade: true})
    orders_products: OrdersProducts[];
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}