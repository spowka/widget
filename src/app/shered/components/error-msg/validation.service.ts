import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class ValidationService {
   static getValidatorErrorMessage(validatorName: string, validatorValue?: any, relativeValue?: any) {
      const config = {
         'required': 'Обызательное поле',
         'minlength': `Минимальная длина ` + (validatorValue ? validatorValue.requiredLength : ''),
         'email': 'Неверный формат почты',
         'greaterThan': `Должно превышать минимальное значение`,
         'minValue': `Minimum ${relativeValue ? relativeValue : validatorValue}`,
         'patternname': 'Неверный формат имени',
         'patternlastname': 'Неверный формат фамилии',
         'patternemail': 'Неверный формат почты',
         'patternpostcode': 'Неверный формат почтовый индекса',
      };

      // @ts-ignore: Unreachable code error
      return config[validatorName];
   }
}
