import {AuthenticationBindings, AuthenticationMetadata, AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
//import {RolMenuRepository} from '../repositories';
//import {SeguridadUsuarioService} from '../services';

export class AuthStrategy implements AuthenticationStrategy {
  name: string = 'auth';

  constructor(

    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata[],

  ) { }

  /**
   * Autenticacion de un usuario frente a una accion en la base de datos
   * @param request la solicitud con el token
   * @returns el perfin de usuario, undefined cuando no tiene permiso o un HttpError
   */
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    //console.log("ejecutando estrategia");
    let token = parseBearerToken(request);
    if (token) {
      //let idRol = this.servicioSeguridad.obtenerRolDesdeToken(token);
      let idMenu: string = this.metadata[0].options![0];
      let accion: string = this.metadata[0].options![1];

      console.log(this.metadata);

      //conectar con ms-seguridad
      console.log("conectar con ms-seguridad");

      /*let permiso = await this.repositorioRolMenu.findOne({
        where: {
          rolId: idRol,
          menuId: idMenu
        }
      });*/
      let continuar: boolean = false;
      if (continuar) {
        let perfil: UserProfile = Object.assign({  //Si retorma aqui está bien
          permitido: "ok"
        });
        return perfil;
      } else {
        return undefined; //Si retorna aqui es que algo ocurrio
      }
    }
    throw new HttpErrors[401]("No es posible ejecutar la accion por falta de un token");
  }
}
