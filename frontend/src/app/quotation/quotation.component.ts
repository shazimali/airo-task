import { Component, OnInit } from '@angular/core';
import { Quotation } from '../interfaces/quotation';
import AgesListData from '../AgesList.json'
import CurrenciesListData from '../CurrenciesList.json'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { QuotationService } from '../services/quotation.service';
import { QuotationErrors } from '../interfaces/quotation-errors';
import { QuotationResponse } from '../interfaces/quotation-response';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.css',
})
export class QuotationComponent implements OnInit {

  constructor(private quotationObj: QuotationService ){
  }
  loading:boolean = false;
  message:string = '';
  errorMessage:string = '';
  dropdownList:Array<object> = [];
  dropdownSettings:IDropdownSettings = {};

  lstCurrencies:Array<string> = CurrenciesListData;
  lstAges:Array<object> = AgesListData
  quotation:Quotation = {
    age: [],
    currency_id:'',
    start_date:'',
    end_date:'',
  }
  errors:QuotationErrors = {
    age:'',
    currency_id:'',
    start_date:'',
    end_date:'',
  }
  quotationRes: QuotationResponse = {
    total:0,
    currency_id:'',
    quotation_id:0
  }


  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };


  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit(){
    this.quotationObj.getQuotation(this.quotation).subscribe(
      {
        next: (res:any) => {
          this.loading = true;
          this.quotationRes = res
          this.errors = <QuotationErrors>{};
          this.loading = false;
        },
        error: (err:any) => {
          this.loading = true;
          
          if(err.status == 422){
            this.errors = err.error.errors;
          }
          else{
            console.log(err)
            this.errorMessage = err.error.message;
          }
  
          this.loading = false;
        }
      }
    )
  }
}
