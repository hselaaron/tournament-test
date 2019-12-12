import { Status } from '../entities/tournament.entity';
import {
  IsNotEmpty,
  IsBoolean,
  Length,
  IsUUID,
  ArrayNotEmpty,
  ArrayUnique,
  IsIn,
  IsArray,
  MaxLength,
  IsDateString,
} from 'class-validator';

// Used for Enum status validation
const statusMembers: string[] = [];
for (const e in Status) {
  if (true) {
    statusMembers.push(e.toLowerCase());
  }
}

// Create Tournament DTO
export class CreateTournamentDTO {
  @IsNotEmpty()
  @Length(3, 40)
  readonly name: string;

  @IsNotEmpty()
  @Length(3, 80)
  readonly fullName: string;

  @IsNotEmpty()
  @IsUUID()
  readonly gameId: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsArray()
  readonly platformIds: string[];

  @IsNotEmpty()
  @IsIn(statusMembers)
  readonly status: Status;

  @IsNotEmpty()
  @IsBoolean()
  readonly isPublic: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly isArchived: boolean;

  @IsNotEmpty()
  @IsDateString()
  readonly startsAt: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly endsAt: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly registrationStartsAt: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly registrationEndsAt: Date;

  @IsNotEmpty()
  @MaxLength(255)
  readonly description: string;

  @IsNotEmpty()
  @MaxLength(16777215)
  readonly rules: string;
}
