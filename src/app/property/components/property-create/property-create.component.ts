import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Property } from '../../interfaces/property.interface';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'lh-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css'],
})
export class PropertyCreateComponent implements OnInit {
  newProperty: Property;
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

  constructor(private fb: FormBuilder, private dataservice: DataService) {
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

  ngOnInit(): void {}

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

  createProperty() {
    let newProperty: Property = <Property>this.propertyForm.value;
    newProperty.createdAt = new Date().toISOString();
    console.log('new Property', newProperty);
    this.dataservice.createProperty(newProperty).subscribe(
      (data: Property) => {
        this.newProperty = data;
        console.log('New property data', this.newProperty);
      },
      (err: any) => console.log(err),
      () => console.log('All done getting property in component')
    );
  }
}
