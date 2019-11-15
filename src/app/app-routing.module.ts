import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BaseLayoutComponent } from "./Layout/base-layout/base-layout.component";
import { PagesLayoutComponent } from "./Layout/pages-layout/pages-layout.component";
import { HomeComponent } from "./home/home.component";
import { FournisseurComponent } from "./Gestion Fournisseur/Fournisseur-Get-Delete/Fournisseur.component";
import { LoginBoxedComponent } from "./DemoPages/UserPages/login-boxed/login-boxed.component";
import { ConsommableGetDeleteComponent } from "./Gestion_Compresseur/consommable-get-delete/consommable-get-delete.component";
import { GRHsGetDeleteComponent } from "./Gestion_Compresseur/grhs-get-delete/grhs-get-delete.component";
import { FicheSuiviGetDeleteComponent } from "./Gestion_Compresseur/fiche-suivi-get-delete/fiche-suivi-get-delete.component";
import { SecheursGetDeleteComponent } from "./Gestion_Compresseur/Secheurs-get-delete/Secheurs-get-delete.component";

import { AuthGuard } from "../app/Shared/AuthenticationService/helpers/auth.guard";
import { FilialeGetDeleteComponent } from "./Gestion_Utilisateur/filiale-get-delete/filiale-get-delete.component";
import { UsersGetDeleteComponent } from "./Gestion_Utilisateur/users-get-delete/users-get-delete.component";

import { SendNotificationComponent } from './Notification/send-notification/send-notification.component';

import { RecieveNotificationComponent } from './Notification/recieve-notification/recieve-notification/recieve-notification.component';
import { RoleAppGetDeleteComponent } from './Gestion_Utilisateur/role-app-get-delete/role-app-get-delete.component';
import { AuthorizationGuard } from './Shared/guards/authorization.guard';
import { ReservoirGetDeleteComponent } from './Gestion_Compresseur/reservoir-get-delete/reservoir-get-delete.component';
import { CompresseurGetDeleteComponent } from './Gestion_Compresseur/compresseur-get-delete/compresseur-get-delete.component';
import { EquipementFilialeGetDeleteComponent } from './Gestion_Compresseur/equipement-filiale-get-delete/equipement-filiale-get-delete.component';
import { ReservoirFilialeGetDeleteComponent } from './Gestion_Compresseur/reservoir-filiale-get-delete/reservoir-filiale-get-delete.component';
import { EntretienCompresseurGetDeleteComponent } from './Gestion_Compresseur/entretien-compresseur-get-delete/entretien-compresseur-get-delete.component';
import { EntretienReservoirGetDeleteComponent } from './Gestion_Compresseur/entretien-reservoir-get-delete/entretien-reservoir-get-delete.component';
import { FicheSuiviComponent } from './Gestion_Compresseur/fiche-suivi/fiche-suivi.component';



const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,

    children: [
      // Home
      {
        path: "",
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {}
      },
      // Fournisseur
      {
        path: "Fournisseur",
        component: FournisseurComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin'] }
      },
      // Consommable
      {
        path: "Consommable",
        component: ConsommableGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },
      // GRHs
      {
        path: "GRHs",
        component: GRHsGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },

      // Filiale
      {
        path: "Filiale",
        component: FilialeGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },
      // Users
      {
        path: "Users",
        component: UsersGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin'] }
      },
      // Fiche Suivi
      {
        path: "Fiche_Suivi",
        component: FicheSuiviGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },
      // Fiche Suivi
      {
        path: "Fiche_Suivi_Groupe",
        component: FicheSuiviComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },
      // Types Sécheurs
      {
        path: "Types_Secheurs",
        component: SecheursGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },
      // Types Réservoirs
      {
        path: "Types_Reservoirs",
        component: ReservoirGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },
      // Types Compresseurs
      {
        path: "Types_Compresseurs",
        component: CompresseurGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },
      {
        path: "EquipementFiliale",
        component: EquipementFilialeGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },
      {
        path: "ReservoirFiliale",
        component: ReservoirFilialeGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },

      // Compresseur Filiale


      {
        path: "Notification",
        component: SendNotificationComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin'] }
      },
      {

        path: "gestionRoleApp",
        component: RoleAppGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin'] }
      },
      {

        path: "Entretien_Compresseur",
        component: EntretienCompresseurGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },
      {

        path: "Entretien_Reservoir",
        component: EntretienReservoirGetDeleteComponent,
        canActivate: [AuthGuard, AuthorizationGuard],
        data: { role: ['Admin', 'SuperAdmin', 'Responsable'] }
      },

    ]
  },

  {
    path: "",
    component: PagesLayoutComponent,
    children: [
      // User Pages
      {
        path: "pages/login-boxed",
        component: LoginBoxedComponent,
        data: { extraParameter: "" }
      }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
