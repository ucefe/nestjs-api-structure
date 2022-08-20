import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { Role } from '../enums/role.enum';


  const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
      canActivate(context: ExecutionContext) {
        const {user} = context.switchToHttp().getRequest();
        return user?.role.includes(role);
      }
    }
   
    return mixin(RoleGuardMixin);
  }
   
  export default RoleGuard;