import { Component, OnInit } from '@angular/core';

import { FalconeService } from 'src/app/services/falcone.service';

import { message } from '../../../assets/config/message';

@Component({
  selector: 'app-falcone-result',
  templateUrl: './falcone-result.component.html',
  styleUrls: ['./falcone-result.component.css']
})
export class FalconeResultComponent implements OnInit {
  result: any;
  message: string;
  isSuccess: boolean;
  timeTaken: any;
  errMsg: string;

  constructor(private falconService: FalconeService) {
    this.isSuccess = false;
  }

  ngOnInit(): void {
    this.result = this.falconService.getFalconeResult();
    this.timeTaken = this.result.time;
    if (this.result.data.status === 'success') {
      this.isSuccess = true;
      this.message = message.falcon.success.findFalcon;
    } else {
      this.message = message.falcon.err.failedMessage;
      this.errMsg = message.falcon.err.findFalconeError;
    }
  }
}
