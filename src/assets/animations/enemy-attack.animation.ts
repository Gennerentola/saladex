import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const EnemyAttackAnimation = trigger('enemyAttack', [
  state('default', style({
    opacity: 0
  })),

  transition('default => start', [
    animate('0.1s ease-out', keyframes([
      style({ top: '30%', left: '80%' , opacity: 0 })
    ]))
  ]),

  transition('start => middle', [
    animate('1.5s ease-out', keyframes([
      style({ top: '40%', left: '80%', opacity: 1 }),
      style({ top: '75%', left: '25%', opacity: 1 })
    ]))
  ]),

  transition('middle => end', [
    animate('1s ease-in', keyframes([
      style({ top: '75%', left: '25%', opacity: 1 }),
      style({ top: '65%', left: '15%',transform: 'scale(3)', opacity: 0 })
    ]))
  ]),

  transition('end => default', [
    animate('0.1s ease-in', style({
      opacity: 0
    }))
  ])
]);
