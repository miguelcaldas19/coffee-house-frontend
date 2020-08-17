import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasicService} from './basic.service';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';

const PATH = 'categories';

@Injectable()
export class CategoriesService extends BasicService {

  constructor(http: HttpClient, router: Router) {
    super(http);
  }

  listCategories() {
    return super.list(`${PATH}`).pipe(
      map(retornoApi => {
        return retornoApi;
      }),
      catchError(e => super.getError(e))
    );
  }

}
