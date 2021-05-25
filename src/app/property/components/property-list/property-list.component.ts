import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property.interface';

@Component({
  selector: 'lh-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  allProperties: Property[];
  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getAllProperties().subscribe(
      (data: Property[]) => {
        this.allProperties = data;
        console.log('Properties data', this.allProperties);
      },
      (err: any) => console.log(err),
      () => console.log('All done getting properties in component')
    );
  }
}
