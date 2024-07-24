import { Injectable, Output, EventEmitter } from '@angular/core';
import { Globals } from '../global';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionsService {

  listTransactions = [];
  @Output() changes: EventEmitter<any> = new EventEmitter();

  constructor(
    private glb: Globals,
    private http: HttpClient
  ) { }

  refresh(){
    this.http.get(this.glb.apiCheckout + "get_many?get-all-transactions")
    .subscribe(
      (result: Array<any>) => {
        this.listTransactions = result;
      },
      (err: any) => {
        console.log("error get transaction", err);
      },
      () => {
        this.changes.emit(true);
      }
    );
  }

}
