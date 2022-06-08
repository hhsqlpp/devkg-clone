import { AuthGuard } from '@nestjs/passport';

export class Auth extends AuthGuard('jwt') {}
