import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, RequestMethod, Request } from '@angular/http';
import { ActivatedRoute, Router, NavigationCancel, Params } from '@angular/router';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from "@angular/common";
import {
  Dropdown, SelectItem, InputTextModule, DataTable
  , DialogModule, DataGridModule, PanelModule 
} from "primeng/primeng";
import { DataViewModule } from 'primeng/dataview';
import { Subscription, Observable } from "rxjs";
import { StockService } from '../../shared/stock.service'
import { IStockSymbol } from '../../models/StockSymbol';
import { ILogo } from '../../models/Logo';
import { ICompany } from '../../models/Company';
import { IPrice } from '../../models/Price';
@Component({
  selector: 'myapp',
  templateUrl: './myapp.component.html',
  providers: [StockService],
  styles: [`
          .ui-datatable-scrollable {
          display: flex;
          flex-direction: column;
        }

        .ui-datatable-scrollable-wrapper {
          flex: 1 1 0;
        }

        .ui-datatable-scrollable-view {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .ui-datatable-scrollable-body {
          flex: 1 1 0;
        }

        .ui-datatable-scrollable-header {
          overflow: visible
        }
    `]
})

export class MyAppComponent implements OnInit {
  private http: Http;
  private route: ActivatedRoute;
  private router: Router;
  private busy: Subscription;
  private routeValue: string;


  private apis: SelectItem[];
  filteredCountriesSingle: any[];
  stockSymbols: IStockSymbol[];
  selectedStock: IStockSymbol;
  displayDialog: boolean;
  sortKey: string;
  sortField: string;
  sortOptions: SelectItem[];
  sortOrder: number;
  selectedLogo: ILogo;
  selectCompanyInfo: ICompany;
  selectPrice: string;
  constructor(private stockService: StockService) {
    console.log("START constructor");

    this.stockService.getStockSymbols().subscribe(
      result => this.stockSymbols = result);
    console.log(this.stockSymbols);
  }



  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  selectStock(event: Event, stocksymbol: IStockSymbol) {
    this.selectedStock = stocksymbol;
    
    this.stockService.GetStockLogoAPI(stocksymbol.symbol).subscribe(
      result => this.selectedLogo = result); //get selected logo for details

    //this.stockService.GetStockPriceAPI(stocksymbol.symbol).subscribe(
    //  result => this.selectPrice = result); //get selected price for details

    //this.stockService.GetStockCompanyInfoAPI(stocksymbol.symbol).subscribe(
     // result => this.selectCompanyInfo = result); //get selected company info for details the api i was hitting seemed to go down at some point during development
    this.displayDialog = true;
    event.preventDefault();
  }

  //selectLogo(symbol: string) {

  // return this.stockService.GetStockLogoAPI(symbol).subscribe(
  //    result => this.selectedLogo = result);

  //}

  //getCompanyInfo(symbol: string) {
      
  //  return this.stockService.GetStockCompanyInfoAPI(symbol).subscribe(
  //    result => this.selectedLogo = result);

  //}


  ngOnInit() {
   
    this.sortOptions = [
      { label: 'Symbol', value: 'symbol' },
      { label: 'Name', value: 'name' }
    ];
  }
}


