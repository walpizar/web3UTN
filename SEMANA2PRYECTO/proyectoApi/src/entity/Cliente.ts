import { IsBoolean, IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "./Persona";

@Entity()
export class Cliente{

    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    tipoCliente:number;

    @Column()
    @IsNotEmpty() 
    @IsBoolean()
    estado: boolean

    @OneToOne(type=>Persona)    
    persona: Persona;

}