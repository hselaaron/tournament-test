import { Status } from '../entities/tournament.entity';
import {
  IsBoolean,
  IsUUID,
  ArrayNotEmpty,
  ArrayUnique,
  IsIn,
  IsArray,
  MaxLength,
  IsDateString,
  IsString,
  IsOptional,
} from 'class-validator';

// Used for Enum status validation
const statusMembers: string[] = [];
for (const e in Status) {
  if (true) {
    statusMembers.push(e.toLowerCase());
  }
}

// UpdateTournamentDTO
export class UpdateTournamentDTO {

  @MaxLength(80)
  @IsOptional()
  @IsString()
  readonly name?: string;

  @MaxLength(80)
  @IsOptional()
  @IsString()
  readonly fullName?: string;

  @IsUUID()
  @IsOptional()
  readonly gameId?: string;

  @ArrayNotEmpty()
  @ArrayUnique()
  @IsOptional()
  @IsArray()
  readonly platformIds?: string[];

  @IsIn(statusMembers)
  @IsOptional()
  readonly status?: Status;

  @IsBoolean()
  @IsOptional()
  readonly isPublic?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isArchived?: boolean;

  @IsDateString()
  @IsOptional()
  readonly startsAt?: Date;

  @IsDateString()
  @IsOptional()
  readonly endsAt?: Date;

  @IsDateString()
  @IsOptional()
  readonly registrationStartsAt?: Date;

  @IsDateString()
  @IsOptional()
  readonly registrationEndsAt?: Date;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  readonly description?: string;

  @MaxLength(16777215)
  @IsString()
  @IsOptional()
  readonly rules?: string;
}
