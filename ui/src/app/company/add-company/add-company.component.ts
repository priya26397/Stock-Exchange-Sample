import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CompanyDTO } from '../../models/companyDTO';
import { COMPANY_URL, COMPANY_URL_REGISTER } from '../../models/url';
import { ApiService } from '../../services/api.service';
import { SnackbarService } from '../../services/snackbar.service';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  stockExchange: string[];
  companyForm: FormGroup;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;


  ngOnInit() {

    this.companyForm = new FormGroup({
      companyCode: new FormControl(),
      companyName: new FormControl(),
      ceo: new FormControl(),
      turnOver: new FormControl(null, [Validators.min(10000000)]),
      website: new FormControl(),
      stockExchange: new FormControl(),

    });
    this.stockExchange = ['Nse', 'Bse'];
  }


  constructor(private apiService: ApiService, private snackBar: SnackbarService) { }

  onSubmit() {
    if (this.companyForm.valid && !this.companyForm.errors) {
      const companyDTO: CompanyDTO = new CompanyDTO();
      this.setCompantDTO(companyDTO);
      this.save(companyDTO);
    }
  }

  private save(companyDTO: CompanyDTO) {
    this.apiService.postBody(COMPANY_URL_REGISTER, companyDTO).subscribe((response) => {
      this.companyForm.reset();
      this.formDirective.resetForm();
      this.snackBar.openSnackBar('Company added successfully', 'x');
    });
  }

  private setCompantDTO(companyDTO: CompanyDTO) {
    const ctrl = this.companyForm.controls;
    companyDTO.ceo = ctrl.ceo.value;
    companyDTO.code = ctrl.companyCode.value;
    companyDTO.name = ctrl.companyName.value;
    companyDTO.website = ctrl.website.value;
    companyDTO.turnOver = ctrl.turnOver.value;
    companyDTO.stockExchange = ctrl.stockExchange.value;
  }
}
