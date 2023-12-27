import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Breed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Cat, (cat) => cat.id)
    cats: Cat[];
}