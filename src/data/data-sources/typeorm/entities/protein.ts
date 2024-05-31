import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
