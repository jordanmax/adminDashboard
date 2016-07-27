import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AddJobModalService {
  // Observable string sources
  private modelOpenedSource = new Subject<string>();
  private updatedDirectionSource = new Subject<string>();
  // Observable string streams
  updatedDirection$ = this.updatedDirectionSource.asObservable();
  modelOpened$ = this.modelOpenedSource.asObservable();
  // Service message commands
  openModal(date: string) {
    this.modelOpenedSource.next(date);
  }
}
