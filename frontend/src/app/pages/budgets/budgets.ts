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
  BudgetService
} from '../../services/budget.service';

@Component({
  selector: 'app-budgets',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './budgets.html',

  styleUrl: './budgets.css'
})
export class Budgets
  implements OnInit {

  budgets: any[] = [];

  editMode = false;

  editId = 0;

  budget = {

    type: '',

    titre: '',

    description: '',

    montant: 0,

    dateCreation: ''
  };

  constructor(
    private budgetService:
      BudgetService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.getBudgets();
  }

  getBudgets() {

    this.budgetService
      .getBudgets()
      .subscribe({

        next: (data: any) => {

          this.budgets = data;
          this.cdr.detectChanges();

        }
      });
  }

  addBudget() {
        if (
    !this.budget.titre?.trim() ||
    !this.budget.type?.trim() ||
    !this.budget.dateCreation?.trim()||
    !this.budget.description?.trim()
  ) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

    this.budgetService
      .addBudget(this.budget)
      .subscribe({

        next: () => {

          this.getBudgets();

          this.resetForm();

          alert(
            'Budget ajouté'
          );
        }
      });
  }

  editBudget(
    budget: any
  ) {

    this.editMode = true;

    this.editId = budget.id;

    this.budget = {

      type: budget.type,

      titre: budget.titre,

      description:
        budget.description,

      montant:
        budget.montant,

      dateCreation:
        budget.dateCreation
    };
  }

  updateBudget() {

    this.budgetService
      .updateBudget(
        this.editId,
        this.budget
      )
      .subscribe({

        next: () => {

          this.getBudgets();

          this.resetForm();

          this.editMode =
            false;

          alert(
            'Budget modifié'
          );
        }
      });
  }

  deleteBudget(
    id: number
  ) {

    this.budgetService
      .deleteBudget(id)
      .subscribe({

        next: () => {

          this.getBudgets();

          alert(
            'Budget supprimé'
          );
        }
      });
  }

  getTypeLabel(type: string): string {
  const map: any = {
    'PROJET_BUDGET':   'Projet Budget',
    'NOTE_ORIENTATION': "Note d'orientation",
    'BUDGET_REALISE':  'Budget réalisé'
  };
  return map[type] || type;
}

getTypeClass(type: string): string {
  const map: any = {
    'PROJET_BUDGET':    'type-projet',
    'NOTE_ORIENTATION': 'type-orientation',
    'BUDGET_REALISE':   'type-realise'
  };
  return map[type] || '';
}

getTotalMontant(): number {
  return this.budgets.reduce((sum: number, b: any) => sum + (b.montant || 0), 0);
}

getBudgetRealise(): number {
  return this.budgets
    .filter((b: any) => b.type === 'BUDGET_REALISE')
    .reduce((sum: number, b: any) => sum + (b.montant || 0), 0);
}

resetForm() {
  this.budget = { type: '', titre: '', description: '', montant: 0, dateCreation: '' };
  this.editMode = false;
}

}