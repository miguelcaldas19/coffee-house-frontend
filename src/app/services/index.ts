import { ProductsService } from './products.service';
import { NotificationsService } from './notifications.service';
import { CategoriesService } from './categories.service';
import { ExcelService } from './exportExcel.service';

export const services: any[] = [
    ProductsService, NotificationsService, CategoriesService, ExcelService
];

