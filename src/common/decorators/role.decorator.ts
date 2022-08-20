import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const Roles = (...roles: Role[]): CustomDecorator => SetMetadata('roles', roles);