import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[validateNotEqual][formControlName],[validateNotEqual][formControl],[validateNotEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualNotValidator), multi: true }
    ]
})
export class EqualNotValidator implements Validator {
    constructor( @Attribute('validateNotEqual') public validateNotEqual: string) {}

    validate(c: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        let v = c.value;

        // control value (e.g. password)
        let e = c.root.get(this.validateNotEqual);

        // value not equal
        if (e && v === e.value) return {
            validateNotEqual: false
        }
        return null;
    }
}
