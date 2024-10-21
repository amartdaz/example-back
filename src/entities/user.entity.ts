import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 256 })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 128 })
  surname: string;

  @Column({ type: 'date' })
  lastLogin: Date;
}