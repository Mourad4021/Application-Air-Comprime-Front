
import { UserDTO } from '../../Users/userDTO.model'

export class Application {
    ApplicationID: string
    ApplicationCode:string
    ApplicationName: string
    ApplicationDisplayName: string
    ApplicationDescription: string
    ApplicationState: string
    ListeUtilisateurs:UserDTO[]
}
