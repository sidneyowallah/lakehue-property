import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Property } from '../interfaces/property.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  API_URL = 'http://localhost:3020/properties';

  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<Property[]> {
    console.log('Getting all properties from API');
    return this.http.get<Property[]>(this.API_URL);
  }

  getPropertyById(id: number): Observable<Property> {
    if (id === 0) {
      return of(this.initializeProperty());
    }
    console.log('Getting property from API');
    return this.http.get<Property>(`${this.API_URL}/${id}`);
  }

  createProperty(newProperty: Property): Observable<Property> {
    console.log('Add property to API');
    return this.http.post<Property>(this.API_URL, newProperty, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  updateProperty(updatedProperty: Property): Observable<void> {
    console.log('Updating property in API');
    return this.http.put<void>(
      `${this.API_URL}/${updatedProperty.id}`,
      updatedProperty,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  deletePropertyById(id: number): Observable<void> {
    console.log('Deleting property from API');
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  private initializeProperty(): Property {
    return {
      id: 0,
      name: null,
      description: null,
      type: null,
      imageUrl: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      price: null,
      categories: null,
      active: null,
      appliances: null,
      createdAt: null,
      updatedAt: null,
    };
  }
}
