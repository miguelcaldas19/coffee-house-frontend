import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as XLSX from 'xlsx';


@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(element: any, fileName: any) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName + '.xlsx');
  }

}
