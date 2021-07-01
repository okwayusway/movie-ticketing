import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class PrintTicketService {

  constructor() { }

  printTicket(schedule, viewingTime, seatsReserved, title){
    //Sample Ticket Only
    var dd = {
      pageSize: 'A1',
      content: [
         {text:`Movie Title: ${title}`, bold:true},
         {text:`Schedule: ${schedule} ${viewingTime}`},
         {text:`Seats Reserved: ${seatsReserved}`},
         {image:'data:image/png;base64,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', fit:[100, 100]}
      ]
    }
    pdfMake.createPdf(dd).download('Sample Ticket');
  }
}
