import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CompanyDTO } from '../../models/companyDTO';
import { StockDTO } from '../../models/stockDTO';
import { COMPANY_URL, STOCK_URL_ADD } from '../../models/url';
import { ApiService } from '../../services/api.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  stockForm: FormGroup;
  companies: CompanyDTO[];
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;


  ngOnInit() {

    this.stockForm = new FormGroup({
      company: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.pattern('^(0|[1-9]\\d*)?(\\.\\d+)?(?<=\\d)$')]),
    });

     this.fetchCompanies();
  }


  constructor(private apiService: ApiService, private snackBar: SnackbarService) { }

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
      const stock: StockDTO = new StockDTO();
      stock.price = ctrl.price.value;
      stock.companyCode = ctrl.company.value.code;
      this.apiService.postBody(STOCK_URL_ADD, stock).subscribe((response) => {

          this.stockForm.reset();
          this.formDirective.resetForm();
          this.snackBar.openSnackBar('Stock price added successfully', 'x');

      });
    }
  }

}

