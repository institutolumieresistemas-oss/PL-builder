import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type HeroType = 'industrial-split' | 'centered-cyber' | 'laser-showcase' | 'dark-cinematic' | 'stats-precision';

export interface HeroMetrica {
  numero: string;
  etiqueta: string;
}

export interface HeroProps {
  tipo: HeroType;
  badge: string;
  titulo: string;
  tituloResaltado: string;
  descripcion: string;
  botonPrimarioTexto: string;
  botonPrimarioLink: string;
  botonSecundarioTexto: string;
  botonSecundarioLink: string;
  imagenUrl: string;
  metricas?: HeroMetrica[];
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class HeroComponent implements OnInit {
  @Input() tipo: HeroType = 'industrial-split';
  @Input() badge: string = 'TECNOLOGÍA CNC DE ALTA PRECISIÓN';
  @Input() titulo: string = 'Transformamos el Metal en';
  @Input() tituloResaltado: string = 'Diseño y Precisión';
  @Input() descripcion: string = 'Especialistas en maquila de corte plasma y láser CNC. Fabricamos celosías arquitectónicas, decoración metálica y anuncios comerciales con acabados de primera.';
  @Input() botonPrimarioTexto: string = 'Cotizar Proyecto';
  @Input() botonPrimarioLink: string = '/contacto';
  @Input() botonSecundarioTexto: string = 'Ver Catálogo';
  @Input() botonSecundarioLink: string = '/celosias';
  @Input() imagenUrl: string = 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80';
  @Input() metricas: HeroMetrica[] = [
    { numero: '+10', etiqueta: 'Años de Experiencia' },
    { numero: '±0.2mm', etiqueta: 'Tolerancia de Corte' },
    { numero: '100%', etiqueta: 'Calidad en Acero' }
  ];

  @Input() isEditor: boolean = false;
  @Output() actualizarProps = new EventEmitter<HeroProps>();
  @Output() eliminarElemento = new EventEmitter<void>();

  mostrarConfigModal = false;

  heroTypesList = [
    { id: 'industrial-split', name: 'Industrial Split', icon: 'fas fa-columns', desc: 'Diseño en 2 columnas con imagen destacada y métricas técnicas.' },
    { id: 'centered-cyber', name: 'Cyber Centrado', icon: 'fas fa-crosshairs', desc: 'Tipografía central masiva con aura de neón y badges de materiales.' },
    { id: 'laser-showcase', name: 'Laser Showcase', icon: 'fas fa-th-large', desc: 'Encabezado superior con 3 tarjetas de productos y maquila destacadas.' },
    { id: 'dark-cinematic', name: 'Cinematic Dark', icon: 'fas fa-film', desc: 'Fondo oscuro cinematográfico con malla de gradiente rojo y contacto rápido.' },
    { id: 'stats-precision', name: 'Stats & Precisión', icon: 'fas fa-tachometer-alt', desc: 'Enfoque técnico corporativo con checklist de capacidades y métricas clave.' }
  ];

  ngOnInit() {
    if (!this.metricas || this.metricas.length === 0) {
      this.metricas = [
        { numero: '+10', etiqueta: 'Años de Experiencia' },
        { numero: '±0.2mm', etiqueta: 'Tolerancia de Corte' },
        { numero: '100%', etiqueta: 'Calidad en Acero' }
      ];
    }
  }

  cambiarTipo(nuevoTipo: HeroType) {
    this.tipo = nuevoTipo;
    this.emitirCambios();
  }

  abrirConfig() {
    this.mostrarConfigModal = true;
  }

  cerrarConfig() {
    this.mostrarConfigModal = false;
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
      tipo: this.tipo,
      badge: this.badge,
      titulo: this.titulo,
      tituloResaltado: this.tituloResaltado,
      descripcion: this.descripcion,
      botonPrimarioTexto: this.botonPrimarioTexto,
      botonPrimarioLink: this.botonPrimarioLink,
      botonSecundarioTexto: this.botonSecundarioTexto,
      botonSecundarioLink: this.botonSecundarioLink,
      imagenUrl: this.imagenUrl,
      metricas: this.metricas
    });
  }
}
