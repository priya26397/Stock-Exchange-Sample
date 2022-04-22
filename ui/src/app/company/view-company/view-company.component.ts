import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CompanyDTO } from '../../models/companyDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { COMPANY_URL, STOCK_URL } from '../../models/url';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Code', 'Name', 'Turnover',"Price"];
  dataSource = new MatTableDataSource<CompanyDTO>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
     this.fetchCompanies();
  }
  private fetchCompanies() {
    this.apiService.get(COMPANY_URL).subscribe(response => {
      if (response) {
        this.dataSource.data = response;
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
