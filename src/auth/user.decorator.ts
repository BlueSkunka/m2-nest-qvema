import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadInterface } from 'src/auth/payload.interface';

export const UserDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as PayloadInterface;
  }
)