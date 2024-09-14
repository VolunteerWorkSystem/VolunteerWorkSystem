import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LineJwtAuthGuard extends AuthGuard('line-jwt') {}
