import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export function ValidateStartDate() {
  return (group: FormGroup): {[key: string]: any} => {
    let startDate = new Date(group.controls['startDate'].value).setHours(0,0,0,0);

    if (startDate > new Date().setHours(0,0,0,0)) {
      return null;
    }
    return { 'startDate': true }
  }
}

export function ValidateEndDate() {
  return (group: FormGroup): {[key: string]: any} => {
    let startDate = new Date(group.controls['startDate'].value).setHours(0,0,0,0);
    let endDate = new Date(group.controls['endDate'].value).setHours(0,0,0,0);

    if (startDate && startDate < endDate) {
      return null;
    }
    return { endDate: true }
  }
}

export function ValidatePublicationDate() {
  return (group: FormGroup): {[key: string]: any} => {
    let publicationDate = new Date(group.controls['publicationDate'].value).setHours(0,0,0,0);
    let startDate = new Date(group.controls['startDate'].value).setHours(0,0,0,0);

    if (startDate && publicationDate >= new Date().setHours(0,0,0,0) && startDate > publicationDate) {
      return null;
    }
    return { publicationDate: true }
  }
}
