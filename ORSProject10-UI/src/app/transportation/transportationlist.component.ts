import { Component, OnInit } from '@angular/core';
import { BaseListCtl } from '../base-list.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transportationlist',
  templateUrl: './transportationlist.component.html',
  styleUrls: ['./transportationlist.component.css']
})
export class TransportationlistComponent extends BaseListCtl implements OnInit {

  public form = {
    error: false,
    message: null,
    preload: [],
    data: { id: null },
    inputerror: {},
    searchParams: {

      name: '',
      cost: '',
      date: '', // Initialize date field
      modeId: '',
    },
    searchMessage: null,
    list: [],
    pageNo: 0
  };


  isValidCost: boolean = true;
  costErrorMessage: string = '';

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute, private httpClient: HttpClient) {
    super(locator.endpoints.TRANSPORTATION, locator, route);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  // Format date function
  formatDate(event: any) {
    const selectedDate = new Date(event);
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Ensure it's in ISO format
    this.form.searchParams.date = formattedDate;
  }


  // Convert date to local format for display
  convertToLocalDate(dateString: string): string {
    const date = new Date(dateString);
    // Format date to 'MM/DD/YYYY'
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  }


  validateCost() {
    const cost = this.form.searchParams.cost;
    const costValue = Number(cost);
    if (!cost || isNaN(costValue) || costValue <= 0 || costValue > 5000000) {
      this.isValidCost = false;
      this.costErrorMessage = 'Please enter valid cost value';
    } else {
      this.isValidCost = true;
      this.costErrorMessage = '';
    }
  }

  // Submit method
  submit() {
    // Reset page number before searching
    this.form.pageNo = 0;
    // Call the search method after formatting the date
    this.search();
  }


  // Search method
  search() {
    // Clear previous search message
    this.form.searchMessage = null;
    // Perform the search operation with the search parameters
    super.search();
  }
}
