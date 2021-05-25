import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property.interface';

import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'lh-property-update',
  templateUrl: './property-update.component.html',
  styleUrls: ['./property-update.component.css'],
})
export class PropertyUpdateComponent implements OnInit {
  selectedProperty: Property;
  newProperty: Property;
  errorMessage: string;
  propertyId: number;
  propertyForm: FormGroup;
  propertyType = [
    'Single-family',
    'Townhome',
    'Condominium',
    'Apartment',
    'Commercial',
    'Manufactured',
  ];
  applianceList = [
    'Dishwasher',
    'Refirgerator',
    'Disposal',
    'Washer',
    'Dryer',
    'Microwave',
  ];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private fb: FormBuilder
  ) {
    this.propertyForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      type: [''],
      imageUrl: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      price: [''],
      categories: this.fb.array([this.fb.control('')]),
      active: [false, Validators.required],
      appliance: this.fb.array([]),
    });
  }

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

  deleteProperty() {
    if (
      confirm(
        `Did you want to delete the property:${this.selectedProperty.name}`
      )
    ) {
      this.propertyService
        .deletePropertyById(this.selectedProperty.id)
        .subscribe({
          next: () => console.log(`${this.selectedProperty.id} was deleted`),
          error: (err) => (this.errorMessage = err),
        });
    }
  }

  saveProperty() {
    if (this.propertyId === 0) {
      let newProperty: Property = <Property>this.propertyForm.value;
      this.propertyService.createProperty(newProperty).subscribe({
        next: () => console.log(`${newProperty.name} was created`),
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this.propertyService.updateProperty(this.selectedProperty).subscribe({
        next: () => console.log(`${this.selectedProperty.id} was updated`),
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  get categories() {
    return this.propertyForm.get('categories') as FormArray;
  }

  addCategory() {
    this.categories.push(this.fb.control(''));
  }

  onCheckboxChange(e) {
    const appliance: FormArray = this.propertyForm.get(
      'appliance'
    ) as FormArray;
    if (e.target.checked) {
      appliance.push(new FormControl(e.target.value));
    } else {
      const index = appliance.controls.findIndex(
        (x) => x.value === e.target.value
      );
      appliance.removeAt(index);
    }
  }
}
