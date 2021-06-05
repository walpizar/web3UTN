import { IsBoolean, IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class Usuarios{

    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    username: string;

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

    @Column()
    @IsNotEmpty()  
   // @Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")
    password: string;

    @Column()
    @IsNotEmpty()  
    role: string;

    @Column()
    @IsNotEmpty() 
    @IsBoolean()
    estado: boolean

    
}