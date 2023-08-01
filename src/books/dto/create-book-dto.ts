import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly author: string;

  @IsString()
  readonly coverImage: string;

  @IsString()
  @IsOptional()
  readonly quickDescription: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsObject()
  readonly links: {
    brunch: string | null;
    instagram: string | null;
  };

  @IsObject()
  readonly tags: {
    status: string;
    rating: number | null;
  };
}
