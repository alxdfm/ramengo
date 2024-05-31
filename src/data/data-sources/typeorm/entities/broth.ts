import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order';

@Entity('broth')
export class Broth {
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

  @OneToMany(() => Order, (order) => order.broth)
  orders: Order[];
}
