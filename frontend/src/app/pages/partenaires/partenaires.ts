import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Partenaire
} from '../../services/partenaire.service';

@Component({
  selector: 'app-partenaires',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './partenaires.html',

  styleUrl: './partenaires.css'
})
export class Partenaires
  implements OnInit {

  partenaires: any[] = [];

  editMode = false;

  editId = 0;

  partenaire = {

    organisme: '',

    typePartenariat: '',

    contact: '',

    email: '',

    telephone: ''
  };

  constructor(
    private partenaireService:
      Partenaire,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.loadPartenaires();
  }

  loadPartenaires() {

    this.partenaireService
      .getPartenaires()
      .subscribe({

        next: (data: any) => {

          this.partenaires = data;
          this.cdr.detectChanges();

        }
      });
  }

  addPartenaire() {

    this.partenaireService
      .addPartenaire(
        this.partenaire
      )
      .subscribe({

        next: () => {

          this.loadPartenaires();

          this.resetForm();
        }
      });
  }

  editPartenaire(p: any) {

    this.editMode = true;

    this.editId = p.id;

    this.partenaire = {

      organisme: p.organisme,

      typePartenariat:
        p.typePartenariat,

      contact: p.contact,

      email: p.email,

      telephone: p.telephone
    };
  }

  updatePartenaire() {

    this.partenaireService
      .updatePartenaire(
        this.editId,
        this.partenaire
      )
      .subscribe({

        next: () => {

          this.loadPartenaires();

          this.editMode = false;

          this.resetForm();
        }
      });
  }

  deletePartenaire(
    id: number
  ) {

    this.partenaireService
      .deletePartenaire(id)
      .subscribe({

        next: () => {

          this.loadPartenaires();
        }
      });
  }

  resetForm() {

    this.partenaire = {

      organisme: '',

      typePartenariat: '',

      contact: '',

      email: '',

      telephone: ''
    };
  }
}