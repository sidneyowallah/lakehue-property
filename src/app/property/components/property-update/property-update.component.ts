import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Property } from '../../interfaces/property.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lh-property-update',
  templateUrl: './property-update.component.html',
  styleUrls: ['./property-update.component.css'],
})
export class PropertyUpdateComponent implements OnInit {
  selectedProperty: Property;
  constructor(
    private route: ActivatedRoute,
    private dataservice: DataService
  ) {}

  ngOnInit(): void {
    let propertyId = parseInt(this.route.snapshot.params['id']);
    this.dataservice.getPropertyById(propertyId).subscribe(
      (data: Property) => {
        this.selectedProperty = data;
        console.log('Property data', this.selectedProperty);
      },
      (err: any) => console.log(err),
      () => console.log('All done getting property in component')
    );
  }
}
