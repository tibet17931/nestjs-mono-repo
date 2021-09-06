import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator"

export class LoginDto {

    @ApiProperty({
        description: 'Your UserName',
        minLength: 6,
        maxLength: 50,
        default: "thibet"
    })
    @IsOptional()
    @IsString()
    @Length(6, 50)
    username: string

    @ApiProperty({
        description: 'Your Password',
        minLength: 6,
        maxLength: 50,
        default: 123456
    })
    @IsNotEmpty()
    @IsString()
    @Length(6, 50)
    password: string
}