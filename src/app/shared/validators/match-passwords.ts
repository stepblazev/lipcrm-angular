import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchPasswords(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordRepeat = control.get('password_repeat')?.value;

    // если пароли не совпадают, возвращаем объект ошибки
    if (password !== passwordRepeat) {
        return { passwordsMismatch: true };
    }

    // если пароли совпадают, возвращаем null
    return null;
}
