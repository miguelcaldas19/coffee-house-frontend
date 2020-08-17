import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { ExcelService } from '../../services/exportExcel.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { TokenStorageService } from '../../services/token-storage.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  returnListProducts: Array<any> = Array([]);
  returnListCategories: Array<any> = Array([]);
  registerForm: FormGroup;
  product: any = {};
  errorMessage: any;
  managerRole = false;

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  currentId: any;

  constructor(private formBuilder: FormBuilder,
              private service: ProductsService,
              private serviceCategories: CategoriesService,
              private ngbModal: NgbModal,
              private tokenStorage: TokenStorageService,
              private serviceExcel: ExcelService,
              public http: HttpClient) {

    this.managerRole = tokenStorage.managerMode;
  }

  ngOnInit(){
    this.listCategories();
    this.listProducts();
  }

  createForm(obj: any, edit: any) {
    if (obj == null) {
      obj = {};
    }

    this.registerForm = new FormGroup({
      id: this.formBuilder.control(obj.id),
      name: this.formBuilder.control({value: obj.name || '', disabled: edit}, [Validators.required]),
      description: this.formBuilder.control({value: obj.description || '', disabled: edit}, [Validators.required]),
      category: this.formBuilder.control({value: obj.category || '', disabled: edit}, [Validators.required]),
      quantity: this.formBuilder.control(obj.quantity, [Validators.required])
    });

  }

  onSave(modal: any) {
    this.service.saveProduct(this.registerForm.getRawValue())
        .subscribe(returnValue => {
          modal.close();
          this.listProducts();
        }, error => {
          this.errorMessage = error;
    });
  }


  onRemove(id: number){
    this.service.removeProduct(id).subscribe(returnValue => {
      this.listProducts();
    });
  }

  onEdit(item: any, content: any) {

    this.errorMessage = '';

    if (item == null) {
      this.createForm(item, false);
      this.ngbModal.open(content, { size: 'lg', backdrop: 'static' });
    } else {
      this.service.listById(item.id).subscribe(returnValue => {
        this.product = returnValue;
        this.createForm(this.product, true);
        this.ngbModal.open(content, { size: 'lg', backdrop: 'static' });
      });

    }

  }

  listProducts(){

    this.returnListProducts = [];

    this.service.listProducts().subscribe(returnValue => {
      this.returnListProducts = returnValue;
      this.returnListProducts.forEach(item => item.image !== null ? item.image = 'data:image/jpeg;base64,' +  item.image : null);
    });

  }

  listCategories() {
    this.returnListCategories = [];

    this.serviceCategories.listCategories().subscribe(returnValue => {
      this.returnListCategories = returnValue;
    });

  }

  onDownload(){
    const element = document.getElementById('products-list');
    this.serviceExcel.exportAsExcelFile(element, 'ProductsList');
  }

  get f() {
    return this.registerForm.controls;
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSendImage(modal: any) {

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.service.uploadImage(uploadImageData, this.currentId).subscribe(returnValue => {
      modal.close();
      this.listProducts();
    });
  }

  onUploadImage(item: any, content: any) {
    this.currentId = item.id;
    this.ngbModal.open(content, { size: 'lg', backdrop: 'static' });
  }

}
