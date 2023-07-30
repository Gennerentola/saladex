import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-feedback-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './loading-feedback-modal.component.html',
  styleUrls: ['./loading-feedback-modal.component.scss']
})
export class LoadingFeedbackModalComponent {
  constructor(private dialogRef: MatDialogRef<LoadingFeedbackModalComponent>) { }

  closeModal() {
    this.dialogRef.close();
  }
}
