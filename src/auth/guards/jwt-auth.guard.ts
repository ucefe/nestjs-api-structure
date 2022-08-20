import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext, GqlContextType } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public getRequest(context: ExecutionContext): Request {
        if (context.getType<GqlContextType>() === 'graphql') {
          const ctx = GqlExecutionContext.create(context).getContext();
          return <Request>ctx.req;
        }
    
        return context.switchToHttp().getRequest<Request>();
      }
}
