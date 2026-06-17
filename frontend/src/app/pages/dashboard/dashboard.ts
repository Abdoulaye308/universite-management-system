import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dashboard as DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  studentsCount = 0;
  formationsCount = 0;
  formateursCount = 0;
  reunionsCount = 0;
  inscriptionsCount = 0;
  stagesCount = 0;
  insertionsCount = 0;
  partenairesCount = 0;

  formations: any[] = [];
  students: any[] = [];
  loading = true;

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.dashboardService.getStudents().subscribe((data: any) => {
      this.studentsCount = data.length;
      this.students = [...data];
      this.loading = false;
      this.cdr.detectChanges();
    });

    this.dashboardService.getFormations().subscribe((data: any) => {
      this.formationsCount = data.length;
      this.formations = [...data];
      this.cdr.detectChanges();
    });

    this.dashboardService.getFormateurs().subscribe((data: any) => {
      this.formateursCount = data.length;
      this.cdr.detectChanges();
    });

    this.dashboardService.getReunions().subscribe((data: any) => {
      this.reunionsCount = data.length;
      this.cdr.detectChanges();
    });

    // Nouveaux endpoints à ajouter dans DashboardService
    this.dashboardService.getInscriptions().subscribe((data: any) => {
      this.inscriptionsCount = data.length;
      this.cdr.detectChanges();
    });

    this.dashboardService.getStages().subscribe((data: any) => {
      this.stagesCount = data.length;
      this.cdr.detectChanges();
    });

    this.dashboardService.getInsertions().subscribe((data: any) => {
      this.insertionsCount = data.length;
      this.cdr.detectChanges();
    });

    this.dashboardService.getPartenaires().subscribe((data: any) => {
      this.partenairesCount = data.length;
      this.cdr.detectChanges();
    });
  }

  getRatioHommes(f: any): number {
    const total = (f.nombreHommes || 0) + (f.nombreFemmes || 0);
    return total > 0 ? Math.round((f.nombreHommes / total) * 100) : 0;
  }

  getTotalParticipants(f: any): number {
    return (f.nombreHommes || 0) + (f.nombreFemmes || 0);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}