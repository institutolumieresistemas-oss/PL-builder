import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type CintilloType = 'laser-gradient-red' | 'dark-cyber-strip' | 'minimal-capsule' | 'split-accent-box';

export interface CintilloProps {
  tipo: CintilloType;
  badge: string;
  titulo: string;
  tituloResaltado: string;
  subtitulo: string;
  botonTexto: string;
  botonLink: string;
  botonIcono: string;
}

@Component({
  selector: 'app-cintillo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cintillo.html',
  styleUrls: ['./cintillo.css']
})
export class CintilloComponent implements OnInit {
  @Input() tipo: CintilloType = 'laser-gradient-red';
  @Input() badge: string = 'ATENCIÓN Y COTIZACIÓN INMEDIATA';
  @Input() titulo: string = '¿Tienes un proyecto de corte en mente?';
  @Input() tituloResaltado: string = 'Cotiza hoy mismo con Plasmex CNC';
  @Input() subtitulo: string = 'Fabricamos celosías, anuncios 3D y piezas industriales con entrega puntual en Guadalajara y envíos a todo México.';
  @Input() botonTexto: string = 'Cotizar por WhatsApp';
  @Input() botonLink: string = 'https://wa.me/523335893912';
  @Input() botonIcono: string = 'fab fa-whatsapp';

  @Input() isEditor: boolean = false;
  @Output() actualizarProps = new EventEmitter<CintilloProps>();
  @Output() eliminarElemento = new EventEmitter<void>();

  mostrarConfigModal = false;

  cintilloTypesList = [
    { id: 'laser-gradient-red', name: 'Rojo Láser Neón', icon: 'fas fa-fire-alt', desc: 'Fondo rojo carmesí de alto impacto con botón oscuro brillante.' },
    { id: 'dark-cyber-strip', name: 'Dark Cyber Industrial', icon: 'fas fa-bolt', desc: 'Fondo carbón con líneas láser rojas superior e inferior y botón pulsante.' },
    { id: 'minimal-capsule', name: 'Cápsula Flotante', icon: 'fas fa-capsules', desc: 'Píldora moderna con borde rojo neón, fondo translúcido y botón estilizado.' },
    { id: 'split-accent-box', name: 'Dividido con Badge Express', icon: 'fas fa-columns', desc: 'Badge lateral de entrega rápida, texto central y botón destacado a la derecha.' }
  ];

  ngOnInit() {}

  cambiarTipo(nuevoTipo: CintilloType) {
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
      subtitulo: this.subtitulo,
      botonTexto: this.botonTexto,
      botonLink: this.botonLink,
      botonIcono: this.botonIcono
    });
  }
}
