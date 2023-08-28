import { ValidatorFn, AbstractControl } from "@angular/forms";

export function dateLessThan(firstDateField: string, secondDateField: string ): ValidatorFn {
    return (form: AbstractControl): {[key: string]: any } | null => {
        const firstDateValue = form.get(firstDateField)?.value;
        const secondDateValue = form.get(secondDateField)?.value;


        if (!firstDateValue || !secondDateValue) {
            return null;
        }

        const firstDate = new Date(firstDateValue);
        const secondDate = new Date(secondDateValue);

        if (firstDate.getTime() > secondDate.getTime()) {
            const err = {'dateLessThan': true};
            form.get(secondDateField)?.setErrors({ 'dateLessThan': true });
            return { err };
        }
        return null;

    };
  }