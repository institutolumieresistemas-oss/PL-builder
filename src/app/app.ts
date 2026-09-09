import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('builder');

  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(event: PointerEvent) {
    if (typeof document === 'undefined') return;
    this.createWeldingSpark(event.clientX, event.clientY);
  }

  private createWeldingSpark(x: number, y: number) {
    const container = document.createElement('div');
    container.className = 'welding-click-spark';
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;

    const sparkCount = 8;
    let sparksHtml = '<div class="welding-spark-flash"></div><div class="welding-spark-puddle"></div>';
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.floor(Math.random() * 360);
      const dist = Math.floor(25 + Math.random() * 35);
      const size = (2 + Math.random() * 2.5).toFixed(1);
      const dur = (0.4 + Math.random() * 0.25).toFixed(2);
      sparksHtml += `<span class="welding-spark-particle" style="--angle:${angle}deg;--dist:${dist}px;--size:${size}px;--dur:${dur}s"></span>`;
    }

    container.innerHTML = sparksHtml;
    document.body.appendChild(container);

    setTimeout(() => {
      container.remove();
    }, 700);
  }
}
