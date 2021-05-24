import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Property } from '../../interfaces/property.interface';

@Component({
  selector: 'lh-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  allProperties: Property[];
  constructor(private dataservice: DataService) {}

  ngOnInit(): void {
    this.dataservice.getAllProperties().subscribe(
      (data: Property[]) => {
        this.allProperties = data;
        console.log('Properties data', this.allProperties);
      },
      (err: any) => console.log(err),
      () => console.log('All done getting properties in component')
    );
  }
}
