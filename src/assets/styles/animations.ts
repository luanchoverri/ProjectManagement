import { trigger, state, style, animate, transition } from '@angular/animations';

export const puffAnimation = trigger('puff', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.5)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0, transform: 'scale(0.5)' })),
  ]),
]);


