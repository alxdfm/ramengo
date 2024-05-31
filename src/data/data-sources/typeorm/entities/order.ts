import { Entity, JoinColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { Broth } from './broth';
import { Protein } from './protein';

@Entity('order')
export class Order {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Broth, (broth) => broth.orders)
  @JoinColumn()
  broth: Broth;

  @ManyToOne(() => Protein, (protein) => protein.orders)
  @JoinColumn()
  protein: Protein;
}
