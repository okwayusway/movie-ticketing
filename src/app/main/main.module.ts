import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PurchaseTicketsComponent } from './purchase-tickets/purchase-tickets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormsModule } from '@angular/forms';
import { MatCardModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { BuyerInfoComponent } from './buyer-info/buyer-info.component';

@NgModule({
  declarations: [MainComponent, PurchaseTicketsComponent, BuyerInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    MatDialogModule,
    MatCardModule,
    FontAwesomeModule
  ],
  providers:[{
    provide: MatDialogRef,
    useValue: {}
  }],
  entryComponents: [PurchaseTicketsComponent]
})
export class MainModule { }
