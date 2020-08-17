import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasicService} from './basic.service';
import {catchError, map} from 'rxjs/operators';

const PATH = 'notifications';

@Injectable()
export class NotificationsService extends BasicService {

  constructor(http: HttpClient) {
    super(http);
  }

  removeProduct(id: any) {
    return super.remove(`${PATH}`, id);
  }

  list(id: any) {
    return super.listById(`${PATH}`, id).pipe(
        map(retornoApi => {
            return retornoApi;
        }),
        catchError(e => super.getError(e))
    );
  }

}
