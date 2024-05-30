import { Entity, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Broth } from './broth';
import { Protein } from './protein';

@Entity('order')
export class Order {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Broth)
  @JoinColumn()
  broth: Broth;

  @OneToOne(() => Protein)
  @JoinColumn()
  protein: Protein;
}
