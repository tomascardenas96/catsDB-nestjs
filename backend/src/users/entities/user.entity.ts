import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  userName: string;

  @Column({ default: false })
  isLoggedIn: boolean;

  @Column({ default: 'user' })
  rol: string;
}
