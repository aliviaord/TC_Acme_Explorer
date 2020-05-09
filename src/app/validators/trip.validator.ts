import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export function ValidateStartDate() {
  return (group: FormGroup): {[key: string]: any} => {
    let startDate = group.controls['startDate'].value;

    if (startDate > new Date()) {
      return null;
    }
    return { 'startDate': true }
  }
}

export function ValidateEndDate() {
  return (group: FormGroup): {[key: string]: any} => {
    let startDate = group.controls['startDate'].value;
    let endDate = group.controls['endDate'].value;

    if (startDate !== '' && startDate < endDate) {
      return null;
    }
    return { endDate: true }
  }
}

export function ValidatePublicationDate() {
  return (group: FormGroup): {[key: string]: any} => {
    let publicationDate = group.controls['publicationDate'].value;
    let startDate = group.controls['startDate'].value;

    if (startDate && startDate !== '' && publicationDate >= new Date() && startDate > publicationDate) {
      return null;
    }
    return { publicationDate: true }
  }
}
