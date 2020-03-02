import { Injectable } from '@angular/core';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  private Folder = 'test-immagini-upload';

  private uploadSubject: Subject<string> = new Subject<string>();
  public uploadObservable = this.uploadSubject.asObservable();

  constructor() { }

  public upload(file: any, subFolder: string) {
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: 'xxx',
        secretAccessKey: 'yyy',
        region: 'eu-central-1'
      }
    );
    const params = {
      Bucket: 'beautifulvino2020-immagini',
      Key: this.Folder + '/' + subFolder + '/' + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    const baseUrl = 'https://' + params.Bucket + '.s3.eu-central-1.amazonaws.com/' + params.Key;
    const self = this;
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        self.uploadSubject.next('ERR');
        return false;
      }
      console.log('Successfully uploaded file.', data);
      self.uploadSubject.next(baseUrl);
      return true;
    });

    // for upload progress
    /*  bucket.upload(params).on('httpUploadProgress', function (evt) {
          console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
        }).send(function (err, data) {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                return false;
            }
            console.log('Successfully uploaded file.', data);
            return true;
        });
    */
  }
}
