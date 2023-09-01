import { Component, ElementRef, Renderer2, OnInit, Input, SimpleChanges } from '@angular/core';

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

  animationDuration = 2000; // Duración de la animación en milisegundos
  animationInterval = 0.5; // Intervalo de tiempo entre cada incremento

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    if(this.targetCompleted > 0)
    this.startAnimation();
  }

  /**
 * Se ejecuta cuando ocurren cambios en las propiedades de entrada de componente
 * @param {SimpleChanges} changes - Cambios.
 * @returns {void} Se fija si la propiedad targetComplet ha cambiado y si no es el primer cambio para volver a ejecutar la animacion.
 */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['targetCompleted'] && !changes['targetCompleted'].isFirstChange()) {
      if (this.targetCompleted > 0) {
        this.completed = 0; // Reinicia 
        this.startAnimation(); // Inicia 
      }
    }
  }
  


  /**
   *
   * Inicia una animación que incrementa gradualmente el número de tareas completadas.
   * @memberof AnimatedCounterComponent
   */
  startAnimation() {
    // Calcula el intervalo de tiempo entre incrementos en función de la duración total de la animación
    const interval = this.animationDuration / (this.targetCompleted / this.animationInterval);
    let currentTasks = 0; // Inicializa la variable para contar las tareas completadas

     // Establece un intervalo para actualizar la animación
    const animationInterval = setInterval(() => {
      currentTasks++; 

      // Actualiza el contenido del elemento HTML que muestra el nro actual de tareas completadas
      // Crea la ilusion
      this.renderer.setProperty(this.elementRef.nativeElement.querySelector('.number'), 'textContent', currentTasks);

      // Detiene la animacion cuando el contador de tareas completadas alcanza el objetivo
      if (currentTasks >= this.targetCompleted) {
        clearInterval(animationInterval);
      }
    }, interval);
  }
}