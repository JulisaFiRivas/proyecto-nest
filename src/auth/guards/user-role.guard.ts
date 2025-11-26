import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/get-protected.decorator';
import { User } from '../../users/entities/user.entity'; // Asegúrate de importar tu entidad User correcta

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    // Si no hay roles definidos en el decorador, la ruta es pública (dentro del contexto de autenticación)
    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user; // Tu JwtStrategy devuelve { id, email, username, role }

    if ( !user ) 
      throw new BadRequestException('User not found');

    // Validación: Si el rol del usuario está dentro de los roles válidos
    if ( validRoles.includes( user.role ) ) {
      return true;
    }

    throw new ForbiddenException(
      `User ${ user.username } needs a valid role: [${ validRoles }]`
    );
  }
}