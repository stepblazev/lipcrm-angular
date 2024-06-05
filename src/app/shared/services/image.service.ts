import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
    constructor(private http: HttpClient) {}

    public urlToFile(url: string): Observable<File> {
      return this.http.get(url, { responseType: 'blob' })
        .pipe(
            map((blob) => {
                const filename = url.split('/').pop() || 'image.png';
                return new File([blob], filename, { type: blob.type });
            })
        );
    }
}
