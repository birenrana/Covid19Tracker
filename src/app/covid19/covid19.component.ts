import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CountryReports } from 'src/countryReports';
import { CovidService } from '../covid.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {

 
  ELEMENT_DATA! : CountryReports[];
  displayedColumns: string[] = ['country','cases','todayCases','deaths','todayDeaths','recovered','active','critical','casesPerOneMillion','deathsPerOneMillion','tests','testsPerOneMillion'];
  dataSource = new MatTableDataSource<CountryReports>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  toggleControl = new FormControl(false);
  is_dark: boolean = false;
  mode_icon = 'light_mode';
  constructor(private service:CovidService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    this.getAllReports();
  }

  public getAllReports(){
    let resp = this.service.covid19Reports();
    resp.subscribe(report=>this.dataSource.data=report  as CountryReports[])
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }
  

}
