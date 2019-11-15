import { Component, OnInit } from "@angular/core";
import { DataFilialeService } from "src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { Filiale } from "src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model";
import { FilialePostUpdateComponent } from "../filiale-post-update/filiale-post-update.component";
import { FormBuilder } from "@angular/forms";
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';

@Component({
  selector: "app-filiale-get-delete",
  templateUrl: "./filiale-get-delete.component.html",
  styles: []
})
export class FilialeGetDeleteComponent implements OnInit {

  constructor(
    public data: DataFilialeService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) { }
  FilialeSearchForm = this.fb.group({
    nom: [""],
    conformite_d_Exploitation: [""]
  });
  //pagination variables
  p: number = 1;
  listF: Filiale[] = new Array();
  filialeId = '';
  userRole = '';
  ngOnInit() {
    this.getactiveFiliale();

  }
  edit(filiale: Filiale) { }

  onEdit(filiale: Filiale) {
    this.data.initializeFormGroupForEdit(filiale);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    //  dialogConfig.height = "90%";
    this.dialog.open(FilialePostUpdateComponent, dialogConfig);
  }
  delete(filialeID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.data.DeleteFiliale(filialeID).subscribe(
        res => {
          if (res == "Update Done") {
            this.dialog.closeAll();
            this.getactiveFiliale();
            this._snackBar.open(
              "La suppression a été effectuée avec succès",
              "X",
              {
                duration: 4000,
                verticalPosition: "top",
                horizontalPosition: "center",
                panelClass: ["green-snackbar"]
              }
            );
          }
        },
        err => {
          this._snackBar.open("Erreur", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        }
      );
    }
  }
  onCreate() {
    this.data.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    // dialogConfig.height = "100%";
    this.dialog.open(FilialePostUpdateComponent, dialogConfig);
  }

  getactiveFiliale() {
    this.data.list = new Array();
    this.data.listActive = new Array();
    this.data.getFiliale().subscribe(
      res => {
        this.data.list = res as Filiale[];
        if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
          this.data.list = this.data.list.filter(x => x.filialeID == this.authService.currentUserValue.Filiale_Utilisateur);
        }
      },
      err => { },
      () => {
        this.data.list.forEach(element => {
          if (element.active == true) {
            this.data.listActive.push(element);
          }
        });
      }
    );
  }
}
