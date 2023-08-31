import { Component, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  templateUrl: './animated-counter.component.html',
  styleUrls: ['./animated-counter.component.scss']
})
export class AnimatedCounterComponent implements OnInit{
  @Input () title: string = '';
  @Input () targetCompleted: number = 30;
  @Input () icon:string|undefined = undefined;

  @Input () message1: string = '';
  @Input () message2: string = '';
  completed = 0;

  animationDuration = 1000; // Duración de la animación en milisegundos
  animationInterval = 1; // Intervalo de tiempo entre cada incremento

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    if(this.targetCompleted > 0)
    this.startAnimation();
  }

  startAnimation() {
    const interval = this.animationDuration / (this.targetCompleted / this.animationInterval);
    let currentTasks = 0;

    const animationInterval = setInterval(() => {
      currentTasks++;
      this.renderer.setProperty(this.elementRef.nativeElement.querySelector('.number'), 'textContent', currentTasks);
      if (currentTasks >= this.targetCompleted) {
        clearInterval(animationInterval);
      }
    }, interval);
  }
}