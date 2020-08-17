import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as fromViews from '../views';
import * as fromComponents from '../components';

import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ICONS} from '../basic/icons';

@NgModule({
    imports: [
        CommonModule,
        ViewsRoutingModule,
        TranslateModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        ViewsComponent,
        ...fromViews.views,
        ...fromComponents.components
    ],
})
export class ViewsModule {

    constructor(private library: FaIconLibrary, private injector: Injector){
        library.addIcons(...ICONS);
    }

}
