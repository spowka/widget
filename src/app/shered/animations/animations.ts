import { trigger, animate, transition, style, AnimationTriggerMetadata, keyframes, sequence } from '@angular/animations';

export const fadeOut: AnimationTriggerMetadata =
   trigger('fadeInOut', [
      transition(':enter', [
         style({ opacity: 0, }),
         animate('250ms', style({ opacity: 1, }))
      ]),
      transition(':leave', [
         style({ opacity: 1, }),
         animate('250ms', style({ opacity: 0, }))
      ])
   ]);

export const rollCardAnimation: AnimationTriggerMetadata =
   trigger('rollCard', [
      transition('front => back', [
         sequence([
            animate('300ms cubic-bezier(0,1.11,.55,1.21)', style({ transform: "translate(-20px, 85px)", zIndex: "1" })),
            animate('300ms cubic-bezier(0,1.11,.55,1.21)', style({ transform: "translate(65px, 0px)", zIndex: "0" })),
         ])
      ]),
      transition('back => front', [
         sequence([
            animate('300ms cubic-bezier(0,1.11,.55,1.21)', style({ transform: "translate(85px, -20px)", zIndex: '0' })),
            animate('300ms cubic-bezier(0,1.11,.55,1.21)', style({ transform: "translate(0px, 65px)", zIndex: '1' })),
         ])
      ])

   ]);