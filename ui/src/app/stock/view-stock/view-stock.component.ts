import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyDTO } from '../../models/companyDTO';
import { StockDTO } from '../../models/stockDTO';
import { COMPANY_URL, STOCK_URL } from '../../models/url';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css']
})
export class ViewStockComponent implements OnInit, AfterViewInit {

  stockForm: FormGroup;
  dateRange: FormGroup;
  companies: CompanyDTO[];
  displayedColumns: string[] = ['CompanyName', 'Price', 'DateTime'];
  dataSource = new MatTableDataSource<StockDTO>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  min: number;
  max: number;
  avg: number;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  ngOnInit() {

    this.dateRange = new FormGroup({
      start: new FormControl(null, [Validators.required]),
      end: new FormControl(null, [Validators.required]),
    });
    this.stockForm = this.formBuilder.group({
      company: new FormControl(null, [Validators.required]),
      dateRange: this.dateRange
    });

    this.fetchCompanies();

  }


  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  private fetchCompanies() {
    this.apiService.get(COMPANY_URL).subscribe(response => {
      if (response) {
        this.companies = response;
      }
    });
  }

  onSubmit() {
    if (this.stockForm.valid && !this.stockForm.errors) {
      const ctrl = this.stockForm.controls;
      const stDate = this.datePipe.transform(this.dateRange.controls.start.value, 'yyyy-MM-dd');
      const endDate = this.datePipe.transform(this.dateRange.controls.end.value, 'yyyy-MM-dd');
      const url = STOCK_URL + '/' + ctrl.company.value.code + '/' + stDate + '/' + endDate;
      this.apiService.get(url).subscribe((response: StockDTO[]) => {
        if (response.length) {
          this.dataSource.data = response;
          const prices = response.map(v => v.price);

          this.min = prices.reduce(function (a, b) {
            return Math.min(a, b);
          });
          this.max = prices.reduce(function (a, b) {
            return Math.max(a, b);
          });
          this.avg = prices.reduce((a, b) => a + b) / response.length;
        }
      });
    }
  }

  reset() {
    this.dataSource.data  = [];
    this.min = 0.0;
    this.max = 0.0;
    this.avg = 0.0;
    this.stockForm.reset();
    this.formDirective.resetForm();
    this.paginator.firstPage();

  }


}
