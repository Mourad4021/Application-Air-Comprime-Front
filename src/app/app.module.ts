import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgReduxModule } from "@angular-redux/store";
import { NgRedux, DevToolsExtension } from "@angular-redux/store";
import { rootReducer, ArchitectUIState } from "./ThemeOptions/store";
import { ConfigActions } from "./ThemeOptions/store/config.actions";
import { AppRoutingModule } from "./app-routing.module";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { MatrialModule } from "./matrial/matrial.module";
// BOOTSTRAP COMPONENTS
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { ChartsModule } from "ng2-charts";
// LAYOUT
import { BaseLayoutComponent } from "./Layout/base-layout/base-layout.component";
import { PagesLayoutComponent } from "./Layout/pages-layout/pages-layout.component";
import { PageTitleComponent } from "./Layout/Components/page-title/page-title.component";
// HEADER
import { HeaderComponent } from "./Layout/Components/header/header.component";
import { SearchBoxComponent } from "./Layout/Components/header/elements/search-box/search-box.component";
import { UserBoxComponent } from "./Layout/Components/header/elements/user-box/user-box.component";
// SIDEBAR
import { SidebarComponent } from "./Layout/Components/sidebar/sidebar.component";
import { LogoComponent } from "./Layout/Components/sidebar/elements/logo/logo.component";
// FOOTER
import { FooterComponent } from "./Layout/Components/footer/footer.component";
// Login
import { LoginBoxedComponent } from "./DemoPages/UserPages/login-boxed/login-boxed.component";
// Components
import { HomeComponent } from "./home/home.component";
import { FournisseurComponent } from "./Gestion Fournisseur/Fournisseur-Get-Delete/Fournisseur.component";
import { FournisseurPostComponent } from "./Gestion Fournisseur/Fournisseur-Post-Update/Fournisseur-post.component";
import { GRHsGetDeleteComponent } from "./Gestion_Compresseur/grhs-get-delete/grhs-get-delete.component";
import { GRHsPostUpdateComponent } from "./Gestion_Compresseur/grhs-post-update/grhs-post-update.component";
import { ConsommablePostUpdateComponent } from "./Gestion_Compresseur/consommable-post-update/consommable-post-update.component";
import { ConsommableGetDeleteComponent } from "./Gestion_Compresseur/consommable-get-delete/consommable-get-delete.component";
import { FicheSuiviGetDeleteComponent } from "./Gestion_Compresseur/fiche-suivi-get-delete/fiche-suivi-get-delete.component";
import { FicheSuiviPostUpdateComponent } from "./Gestion_Compresseur/fiche-suivi-post-update/fiche-suivi-post-update.component";
import { SecheursGetDeleteComponent } from "./Gestion_Compresseur/Secheurs-get-delete/Secheurs-get-delete.component";
import { SecheurPostUpdateComponent } from "./Gestion_Compresseur/Secheur-post-update/Secheur-post-update.component";

import { UsersGetDeleteComponent } from "./Gestion_Utilisateur/users-get-delete/users-get-delete.component";
import { FilialeGetDeleteComponent } from "./Gestion_Utilisateur/filiale-get-delete/filiale-get-delete.component";
import { FilialePostUpdateComponent } from "./Gestion_Utilisateur/filiale-post-update/filiale-post-update.component";
import { UsersPostUpdateComponent } from "./Gestion_Utilisateur/users-post-update/users-post-update.component";
import { GestionFournisseurDataService } from "./Shared/Gestion Fournisseur/datafournisseur.service";
import { NgxPaginationModule } from "ngx-pagination";

import { filterPipe } from "./Shared/Gestion-Utilisateur/Users/filter.pipe";

import { JwtInterceptor } from './Shared/AuthenticationService/helpers/jwt.interceptor';
import { NotificationService } from './Shared/Notification/notification.service';
import { SendNotificationComponent } from './Notification/send-notification/send-notification.component';

import { RecieveNotificationComponent } from './Notification/recieve-notification/recieve-notification/recieve-notification.component';




import { RoleAppPostUpdateComponent } from './Gestion_Utilisateur/role-app-post-update/role-app-post-update.component';
import { ToastrModule } from 'ngx-toastr';
import { RoleAppGetDeleteComponent } from './Gestion_Utilisateur/role-app-get-delete/role-app-get-delete.component';
import { RoleAppEditInnerComponent } from './Gestion_Utilisateur/role-app-get-delete/role-app-edit-inner/role-app-edit-inner.component';
import { ChangePwdUserInAppComponent } from './Gestion_Utilisateur/role-app-get-delete/role-app-edit-inner/change-pwd-user-in-app/change-pwd-user-in-app.component';
import { ReservoirGetDeleteComponent } from './Gestion_Compresseur/reservoir-get-delete/reservoir-get-delete.component';
import { ReservoirPostUpdateComponent } from './Gestion_Compresseur/reservoir-post-update/reservoir-post-update.component';
import { CompresseurPostUpdateComponent } from './Gestion_Compresseur/compresseur-post-update/compresseur-post-update.component';
import { CompresseurGetDeleteComponent } from './Gestion_Compresseur/compresseur-get-delete/compresseur-get-delete.component';
import { EquipementFilialeGetDeleteComponent } from './Gestion_Compresseur/equipement-filiale-get-delete/equipement-filiale-get-delete.component';
import { EquipementFilialePostUpdateComponent } from './Gestion_Compresseur/equipement-filiale-post-update/equipement-filiale-post-update.component';

import { ReservoirFilialeGetDeleteComponent } from './Gestion_Compresseur/reservoir-filiale-get-delete/reservoir-filiale-get-delete.component';
import { EntretienCompresseurGetDeleteComponent } from './Gestion_Compresseur/entretien-compresseur-get-delete/entretien-compresseur-get-delete.component';
import { EntretienCompresseurPostUpdateComponent } from './Gestion_Compresseur/entretien-compresseur-post-update/entretien-compresseur-post-update.component';
import { EntretienReservoirGetDeleteComponent } from './Gestion_Compresseur/entretien-reservoir-get-delete/entretien-reservoir-get-delete.component';
import { EntretienReservoirPostUpdateComponent } from './Gestion_Compresseur/entretien-reservoir-post-update/entretien-reservoir-post-update.component';
import { FicheSuiviComponent } from './Gestion_Compresseur/fiche-suivi/fiche-suivi.component';
import { ReservoirFilialePostUpdateComponent } from './Gestion_Compresseur/reservoir-filiale-post-update/reservoir-filiale-post-update.component';
import { AttachementListComponent } from './Gestion_Compresseur/attachement_list/attachement-list.component';
import { AttachementFournisseurComponent } from './Gestion Fournisseur/attachement-fournisseur/attachement-fournisseur.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    // LAYOUT
    AppComponent,
    BaseLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,
    // HEADER
    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,
    // SIDEBAR
    SidebarComponent,
    LogoComponent,
    // FOOTER
    FooterComponent,
    // Login//
    LoginBoxedComponent,
    // Home
    HomeComponent,
    // Compresseur-Filiale
    FournisseurComponent,
    FournisseurPostComponent,
    GRHsGetDeleteComponent,
    GRHsPostUpdateComponent,
    ConsommablePostUpdateComponent,
    ConsommableGetDeleteComponent,
    FicheSuiviGetDeleteComponent,
    FicheSuiviPostUpdateComponent,
    SecheursGetDeleteComponent,
    SecheurPostUpdateComponent,
    AttachementListComponent,
    UsersGetDeleteComponent,
    FilialeGetDeleteComponent,
    FilialePostUpdateComponent,
    UsersPostUpdateComponent,

    filterPipe,

    RoleAppPostUpdateComponent,

    RoleAppGetDeleteComponent,

    SendNotificationComponent,
    RecieveNotificationComponent,
    RoleAppEditInnerComponent,
    ChangePwdUserInAppComponent,
    ReservoirGetDeleteComponent,
    ReservoirPostUpdateComponent,
    CompresseurPostUpdateComponent,
    CompresseurGetDeleteComponent,
    EquipementFilialeGetDeleteComponent,
    EquipementFilialePostUpdateComponent,
    ReservoirFilialePostUpdateComponent,
    ReservoirFilialeGetDeleteComponent,
    EntretienCompresseurGetDeleteComponent,
    EntretienCompresseurPostUpdateComponent,
    EntretienReservoirGetDeleteComponent,
    EntretienReservoirPostUpdateComponent,
    FicheSuiviComponent,
    AttachementFournisseurComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    MatrialModule,
    // Angular Bootstrap Components
    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Charts
    ChartsModule,

    NgxPaginationModule,


    ToastrModule.forRoot({
      timeOut: 0,

      autoDismiss: false,
      tapToDismiss: true,
      positionClass: "toast-bottom-right",
      extendedTimeOut: 5000000,





    })
  ],
  providers: [

    NotificationService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      // DEFAULT_DROPZONE_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    ConfigActions
  ],

  bootstrap: [AppComponent],
  entryComponents: [
    FournisseurPostComponent,
    ConsommablePostUpdateComponent,
    GRHsPostUpdateComponent,
    FilialePostUpdateComponent,
    UsersPostUpdateComponent,

    RoleAppPostUpdateComponent,
    FicheSuiviPostUpdateComponent,
    ChangePwdUserInAppComponent,
    SecheurPostUpdateComponent,
    ReservoirPostUpdateComponent,
    CompresseurPostUpdateComponent,
    EquipementFilialePostUpdateComponent,
    ReservoirFilialePostUpdateComponent,
    EntretienCompresseurPostUpdateComponent,
    EntretienReservoirPostUpdateComponent
  ]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<ArchitectUIState>,
    private devTool: DevToolsExtension
  ) {
    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );
  }
}
