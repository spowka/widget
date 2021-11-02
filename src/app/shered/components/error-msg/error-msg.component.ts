import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
   selector: 'err-msg',
   templateUrl: './error-msg.component.html',
   styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent {
   @Input() control: AbstractControl;
   @Input() relativeControl: AbstractControl;
   @Input() relativeTrigger: string;
   @Input() ignoreTouch = false;
   @Input() withPatternControlName: string

   // is used to manually set error message
   @Input() manualErrorMessage: string;
   // array with overrirded messages for standart validation errors

   constructor(

   ) { }

   get errorMessage() {

      if (this.manualErrorMessage) {
         return this.manualErrorMessage;
      }

      if (this.control) {
         for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && (this.control.value || this.control.touched || this.control.dirty || this.ignoreTouch)) {
               let message = '';

               if (this.withPatternControlName && propertyName === 'pattern') {
                  propertyName += this.withPatternControlName
                  console.log(propertyName)
               }

               return message
                  ? message
                  : ValidationService.getValidatorErrorMessage(
                     propertyName,
                     this.control.errors[propertyName],
                     this.relativeControl ? this.relativeControl.value : null);
            }
         }
      }

      return null;
   }

}
