import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  templateUrl: './animated-counter.component.html',
  styleUrls: ['./animated-counter.component.scss']
})
export class AnimatedCounterComponent implements OnInit{

  completedTasks = 0;
  targetCompletedTasks = 50; // Número de tareas completadas objetivo
  animationDuration = 2000; // Duración de la animación en milisegundos
  animationInterval = 1; // Intervalo de tiempo entre cada incremento

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    this.startAnimation();
  }

  startAnimation() {
    const interval = this.animationDuration / (this.targetCompletedTasks / this.animationInterval);
    let currentTasks = 0;

    const animationInterval = setInterval(() => {
      currentTasks++;
      this.renderer.setProperty(this.elementRef.nativeElement.querySelector('.number'), 'textContent', currentTasks);
      if (currentTasks >= this.targetCompletedTasks) {
        clearInterval(animationInterval);
      }
    }, interval);
  }
}