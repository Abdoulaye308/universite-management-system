import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications implements OnInit {

  notifications: any[] = [];

  notification = {
    titre: '',
    message: '',
    roleCible: 'ETUDIANT',
    dateCreation: ''
  };

  editMode = false;
  editId = 0;

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  // LISTE
  getNotifications() {
    this.notificationService.getNotifications()
      .subscribe({
        next: (data) => {
          this.notifications = data;
          this.cdr.detectChanges();
        }
      });
  }

  // AJOUT
  add() {
    this.notificationService.addNotification(this.notification)
      .subscribe(() => {
        this.getNotifications();
        this.reset();
        alert("Notification ajoutée");
      });
  }

  // EDIT
  edit(n: any) {
    this.editMode = true;
    this.editId = n.id;

    this.notification = {
      titre: n.titre,
      message: n.message,
      roleCible: n.roleCible,
      dateCreation: n.dateCreation
    };
  }

  // UPDATE
  update() {
    this.notificationService.updateNotification(this.editId, this.notification)
      .subscribe(() => {
        this.getNotifications();
        this.reset();
        this.editMode = false;
        alert("Notification modifiée");
      });
  }

  // DELETE
  delete(id: number) {
    this.notificationService.deleteNotification(id)
      .subscribe(() => {
        this.getNotifications();
      });
  }

  reset() {
    this.notification = {
      titre: '',
      message: '',
      roleCible: 'ETUDIANT',
      dateCreation: ''
    };
  }
}