import { Injectable } from '@angular/core';
import { ISchedule } from 'src/interface/ISchedule';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  schedules = new Map<string, ISchedule>()
  constructor() { }
}
