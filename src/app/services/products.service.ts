import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasicService} from './basic.service';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {API_URL} from '../basic/constants';

const PATH = 'products';

@Injectable()
export class ProductsService extends BasicService {

  constructor(http: HttpClient, router: Router) {
    super(http);
  }

  listProducts() {
    return super.list(`${PATH}`).pipe(
      map(retornoApi => {
        return retornoApi;
      }),
      catchError(e => super.getError(e))
    );
  }

  saveProduct(product: any) {
    if (product.id == null) {
      return super.save(`${PATH}`, product).pipe(
          map(retornoApi => {
              return super.getResponse(retornoApi);
          }), catchError(e => super.getSimpleErrorMessage(e))
      );
    } else {
        return super.update(`${PATH}`, product.id, product).pipe(
            map(retornoApi => {
                return super.getResponse(retornoApi);
            }), catchError(e => super.getSimpleErrorMessage(e))
        );
    }
  }

  removeProduct(id: any) {
    return super.remove(`${PATH}`, id);
  }

  listById(id: any) {
    return super.listById(`${PATH}`, id).pipe(
        map(retornoApi => {
            return retornoApi;
        }),
        catchError(e => super.getError(e))
    );
  }

  uploadImage(uploadImageData: FormData, id: any) {
    return this.http.put(API_URL + `/${PATH}/upload/` + id, uploadImageData);
  }

}
