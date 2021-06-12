import { IsBoolean, IsEmail, IsNotEmpty,  MaxLength,  MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcryptjs';

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
    @MinLength(6)
   // @Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")
    password: string;

    @Column()
    @IsNotEmpty()  
    role: string;

    @Column()
    @IsNotEmpty() 
    @IsBoolean()
    estado: boolean

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password= bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string): boolean{
        return bcrypt.compareSync(password, this.password);
    }
    
}