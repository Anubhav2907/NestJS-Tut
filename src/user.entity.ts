/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Pet, (pet) => pet.owner)
  pets: Pet[];
}
