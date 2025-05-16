import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource, Repository } from 'typeorm';
import {
  OWNERSHIP_KEY,
  OwnershipOptionsInterface,
} from 'src/commons/interfaces/ownership.options.interface';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly dataSource: DataSource
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<OwnershipOptionsInterface>(
      OWNERSHIP_KEY,
      context.getHandler()
    );
    console.log(options);

    // Si aucun controle nécessaire
    if (!options) return true;

    // Déstructuration de l'interface
    const { entity, field, param } = options;

    // Récupération de la requete
    const request = context.switchToHttp().getRequest();

    // Controle de la présence d'un id dans la requete
    const id = request.params[param];

    if (!id) {
      throw new BadRequestException(`Le paramètre "${param}" est absent de la requête`);
    }

    // Récupération de l'utilisateur
    const user = request.user;

    // Récupération du repository de l'entité
    const repository: Repository<any> = this.dataSource.getRepository(entity);

    // Récupération de la ressource à sécuriser
    const resource = await repository.findOne({where: {id}, relations: ['user']});

    if (!resource) {
      throw new NotFoundException(`La ressource "${entity}" n'a pas été trouvé`);
    }

    const fieldValues = field.split('.');

    // Contrôle ownership
    if (resource[fieldValues[0]][fieldValues[1]] !== user.userId) {
      throw new ForbiddenException("Vous n'avez pas accès à cette ressource");
    }

    return true;

  }
}