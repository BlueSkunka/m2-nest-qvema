import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { MariadbErrorsEnum } from 'src/enums/mariadb.errors.enum';

@Catch(QueryFailedError)
export class DatabaseExceptionFiter implements ExceptionFilter {
 catch(exception: any, host: ArgumentsHost): any {
   const context = host.switchToHttp();
   const response = context.getResponse();
   const request = context.getRequest();

   let status: number = 500;
   let message: string = "Une erreur incoonue est survenue";
   console.log(exception);
   switch (exception?.errno) {
     case MariadbErrorsEnum.DUPLICATE_ENTRY:
       status = 400;
       message = `Doublon détecté lors de la création de la ressource`;
       break;
     default:
       console.error('Unhandled DB Exception : ', exception);
       break;
   }

   response.status(status).send({
     statusCode: status,
     message: message
   });
 }
}