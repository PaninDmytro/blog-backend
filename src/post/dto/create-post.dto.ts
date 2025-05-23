import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
