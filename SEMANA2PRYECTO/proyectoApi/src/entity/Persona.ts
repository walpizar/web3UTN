import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Cliente } from "./Cliente";

@Entity()
@Unique(['cedula'])
export class Persona{
   
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    @IsNotEmpty()  
    @MaxLength(12)
    cedula : string;

    @Column()
    @IsNotEmpty()  
    @MaxLength(50)
    nombre : string;

    @Column()
    @IsNotEmpty()  
    @MaxLength(50)
    apellido1 : string;

    @Column()     
    @MaxLength(50)
    apellido2 : string;
    
    @Column()
    @IsNotEmpty()  
    @MaxLength(1)
    genero: string;

/*
    @OneToOne(type=>Cliente, cliente=> cliente.persona)
    cliente: Cliente; 
*/
}