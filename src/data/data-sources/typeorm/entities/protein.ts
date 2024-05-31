import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order';

@Entity('protein')
export class Protein {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imageInactive: string;

  @Column()
  imageActive: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(() => Order, (order) => order.protein)
  orders: Order[];
}
