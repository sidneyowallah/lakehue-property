import { Component, OnInit } from '@angular/core';
import { Property } from '../../interfaces/property.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'lh-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  selectedProperty: Property;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const propertyId = +params.get('id');
      this.getProperty(propertyId);
    });
  }

  getProperty(propertyId: number) {
    this.propertyService.getPropertyById(propertyId).subscribe(
      (data: Property) => {
        this.selectedProperty = data;
        console.log('Property data', this.selectedProperty);
      },
      (err: any) => console.log(err),
      () => console.log('All done getting property in component')
    );
  }
}
