import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type BannerEstiloType = 'cyber-laser-card' | 'glass-glow' | 'minimal-editorial';
export type BannerPosicionType = 'izquierda' | 'derecha';

export interface BannerProps {
  estilo: BannerEstiloType;
  posicionImagen: BannerPosicionType;
  badge: string;
  titulo: string;
  tituloResaltado: string;
  descripcion: string;
  puntosClave: string[];
  botonTexto: string;
  botonLink: string;
  botonSecundarioTexto?: string;
  botonSecundarioLink?: string;
  imagenUrl: string;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './banner.html',
  styleUrls: ['./banner.css']
})
export class BannerComponent implements OnInit {
  @Input() estilo: BannerEstiloType = 'cyber-laser-card';
  @Input() posicionImagen: BannerPosicionType = 'izquierda';
  
  @Input() badge: string = 'INGENIERÍA & MAQUILA INDUSTRIAL';
  @Input() titulo: string = 'Maquila de Corte Láser';
  @Input() tituloResaltado: string = 'y Plasma de Alta Definición';
  @Input() descripcion: string = 'Contamos con mesas de corte CNC equipadas con fuentes de plasma HD y fibra óptica láser de última generación para procesar desde calibres delgados hasta placas de 1 pulgada.';
  
  @Input() puntosClave: string[] = [
    'Corte sin rebaba con tolerancia de ±0.2mm',
    'Mesa de trabajo para placas de hasta 1.5m x 3.0m',
    'Archivos compatibles: DXF, DWG, PDF y AI',
    'Servicio de pintura electrostática Powder Coat'
  ];

  @Input() botonTexto: string = 'Cotizar Maquila';
  @Input() botonLink: string = '/contacto';
  @Input() botonSecundarioTexto: string = 'Ver Materiales';
  @Input() botonSecundarioLink: string = '/materiales';
  
  @Input() imagenUrl: string = 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80';

  @Input() isEditor: boolean = false;
  @Output() actualizarProps = new EventEmitter<BannerProps>();
  @Output() eliminarElemento = new EventEmitter<void>();

  mostrarConfigModal = false;
  puntoClaveTemp: string = '';

  bannerEstilosList = [
    { id: 'cyber-laser-card', name: 'Cyber CNC Láser', icon: 'fas fa-microchip', desc: 'Marco biselado con esquinas cortadas, tarjeta flotante y checklist con checks rojos.' },
    { id: 'glass-glow', name: 'Glassmorphism Neón', icon: 'fas fa-gem', desc: 'Fondo de cristal oscuro con aura roja, tarjetas de atributos y resplandor.' },
    { id: 'minimal-editorial', name: 'Editorial Minimalista', icon: 'fas fa-columns', desc: 'Diseño asimétrico limpio con número de índice, guiones rojos y botones dobles.' }
  ];

  ngOnInit() {
    if (!this.puntosClave || this.puntosClave.length === 0) {
      this.puntosClave = [
        'Corte sin rebaba con tolerancia de ±0.2mm',
        'Mesa de trabajo para placas de hasta 1.5m x 3.0m',
        'Archivos compatibles: DXF, DWG, PDF y AI'
      ];
    }
  }

  cambiarEstilo(nuevoEstilo: BannerEstiloType) {
    this.estilo = nuevoEstilo;
    this.emitirCambios();
  }

  togglePosicion() {
    this.posicionImagen = this.posicionImagen === 'izquierda' ? 'derecha' : 'izquierda';
    this.emitirCambios();
  }

  setPosicion(pos: BannerPosicionType) {
    this.posicionImagen = pos;
    this.emitirCambios();
  }

  abrirConfig() {
    this.mostrarConfigModal = true;
  }

  cerrarConfig() {
    this.mostrarConfigModal = false;
  }

  agregarPuntoClave() {
    if (this.puntoClaveTemp.trim()) {
      this.puntosClave.push(this.puntoClaveTemp.trim());
      this.puntoClaveTemp = '';
    }
  }

  eliminarPuntoClave(index: number) {
    this.puntosClave.splice(index, 1);
  }

  guardarConfig() {
    this.emitirCambios();
    this.cerrarConfig();
  }

  eliminar() {
    this.eliminarElemento.emit();
  }

  emitirCambios() {
    this.actualizarProps.emit({
      estilo: this.estilo,
      posicionImagen: this.posicionImagen,
      badge: this.badge,
      titulo: this.titulo,
      tituloResaltado: this.tituloResaltado,
      descripcion: this.descripcion,
      puntosClave: this.puntosClave,
      botonTexto: this.botonTexto,
      botonLink: this.botonLink,
      botonSecundarioTexto: this.botonSecundarioTexto,
      botonSecundarioLink: this.botonSecundarioLink,
      imagenUrl: this.imagenUrl
    });
  }
}
