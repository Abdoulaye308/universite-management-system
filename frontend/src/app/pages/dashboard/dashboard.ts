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

  // Données réelles pour les barres
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
      this.checkLoading();
      this.cdr.detectChanges();
    });

    this.dashboardService.getFormations().subscribe((data: any) => {
      this.formationsCount = data.length;
      this.formations = [...data];
      this.checkLoading();
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
  }

  checkLoading() {
    if (this.studentsCount > 0 || this.formationsCount > 0) {
      this.loading = false;
    }
  }

  // Ratio hommes/femmes pour une formation
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