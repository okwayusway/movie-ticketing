import { Component, Inject, Input, OnInit, TRANSLATIONS_FORMAT } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { ISchedule } from 'src/interface/ISchedule';
import { PrintTicketService } from 'src/services/print-ticket.service';
import { SchedulesService } from 'src/services/schedules.service';

@Component({
  selector: 'app-purchase-tickets',
  templateUrl: './purchase-tickets.component.html',
  styleUrls: ['./purchase-tickets.component.scss']
})
export class PurchaseTicketsComponent implements OnInit {
  movieId: number;
  movieTime: string;
  faCouch = faCouch;
  seats = [];
  schedule = new Date();
  selected = []
  total = 0;
  constructor(public dialogRef: MatDialogRef<PurchaseTicketsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private sched:SchedulesService, private print:PrintTicketService) { }

  ngOnInit() {
    this.movieTime = this.data.time;
    this.movieId = this.data.id;
    this.checkSchedules();
  }

  onScheduleChange(event) {
    this.schedule = new Date(event);
    this.checkSchedules();
  }

  checkSchedules(){
    this.seats.length = 0;
    this.selected = [];
    const mapKey = `${this.schedule.toLocaleDateString()}-${this.movieId}`
    if (this.sched.schedules.has(mapKey)) {
      let seat = this.sched.schedules.get(mapKey);
      for (let index = 1; index <= 60; index++) {
        this.seats.push({
          seatNumber: index,
          status: seat.occupied.includes(index),
        })
      }
    }
    else {
      let occupied:ISchedule = {
        occupied: []
      }
      this.sched.schedules.set(mapKey,occupied);
      for (let index = 1; index <= 60; index++) {
        this.seats.push({
          seatNumber: index,
          status: false,
        })
      }
    }
  }

  onSelected(seatNo) {
    if (this.selected.includes(seatNo)) {
      this.selected.splice(this.selected.indexOf(seatNo), 1);
    }
    else {
      this.selected.push(seatNo);
    }
    this.total = this.selected.length * 200;

  }

  check(seatNo) {
    return this.selected.includes(seatNo)
  }

  buy() {
    if(this.selected.length > 0){
      const mapKey = `${this.schedule.toLocaleDateString()}-${this.movieId}`
      const reserved = this.sched.schedules.get(mapKey);
      console.log(this.sched.schedules);
          //@ts-ignore
      reserved.occupied.push(...this.selected);
      this.sched.schedules.set(mapKey, reserved);
      this.print.printTicket(this.schedule.toLocaleDateString(), this.movieTime, this.selected, this.data.title)
      this.total = 0;
      this.checkSchedules();
    }
    else{
      alert("Please choose a seat");
    }
  }

  reset() {
    this.total = 0;
    this.checkSchedules();
    this.dialogRef.close();
  }

}


