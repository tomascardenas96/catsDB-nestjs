import { IsString, MinLength, IsNotEmpty, IsInt, IsOptional } from "class-validator";
import { Breed } from "src/breeds/entities/breed.entity";

export class CreateCatDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsOptional()
    breed: string;
}
