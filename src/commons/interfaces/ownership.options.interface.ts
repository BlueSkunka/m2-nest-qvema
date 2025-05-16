import { SetMetadata } from '@nestjs/common';

export const OWNERSHIP_KEY = 'ownership';

export interface OwnershipOptionsInterface {
  entity: any, // Classe de l'entitéé
  field: string, // Attribut représentant la possession
  param: string, // Nom du paramètre dans l'url
  adminBypass: boolean, // Permet au role admin de bypass le controle
}

export const OwnershipOptions = (options: OwnershipOptionsInterface) => SetMetadata(OWNERSHIP_KEY, options);
