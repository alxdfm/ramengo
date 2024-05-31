import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
