import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { AlertService } from 'bvino-lib';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  @Input() labelText: string;
  @Input() maxFileSize: string;
  @Input() folder: string = 'common';
  @Output() uploaded: EventEmitter<string> = new EventEmitter<string>();

  private unsubscribe$ = new Subject<void>();
  public selectedFiles: FileList;
  public uploadedFileUrl = '';
  public fileName = '';

  constructor(
    private uploadService: FileuploadService,
    private alertService: AlertService) {
  }

  ngOnInit() {
  }

  public selectFile(event: any) {
    this.selectedFiles = event.target.files;
    const size = this.selectedFiles.item(0).size;
    console.log('fileSize selezionato: ' + size);
    if (this.maxFileSize) {
      const maxFileSizeNumber = parseInt(this.maxFileSize, 10) * 1000;
      if (size > maxFileSizeNumber) {
        this.alertService.presentErrorAlert('Il file non deve superare i ' + this.maxFileSize + ' KBytes');
        this.selectedFiles = undefined;
      } else {
        this.fileName = this.selectedFiles.item(0).name;
      }
    }

  }

  public upload() {
    this.uploadService.uploadObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      // mi sgancio dalla subscribe
      this.unsubscribe$.next();
      this.unsubscribe$.complete();

      if (r !== 'ERR') {
        this.alertService.presentAlert('Upload completato con successo, filename: ' + r);
        this.uploaded.emit(r);
        this.uploadedFileUrl = r;
        this.selectedFiles = undefined;
        this.fileName = '';
      } else {
        this.alertService.presentErrorAlert('Problema durante Upload');
      }
    });
    const file = this.selectedFiles.item(0);
    this.uploadService.upload(file, this.folder);
  }

  public caricaEnabled(): boolean {
    return this.selectedFiles !== undefined && this.selectedFiles.length > 0;
  }
}
