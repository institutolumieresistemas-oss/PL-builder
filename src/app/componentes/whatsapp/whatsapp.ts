import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type WhatsAppEstilo = 'verde' | 'rojo' | 'dark';
export type WhatsAppPosicion = 'derecha' | 'izquierda';
export type WhatsAppAnimacion = 'pulso' | 'rebote' | 'ninguna';

export interface WhatsAppProps {
  celular: string;
  mensaje: string;
  posicion: WhatsAppPosicion;
  tooltip: string;
  mostrarTooltip: boolean;
  estilo: WhatsAppEstilo;
  animacion: WhatsAppAnimacion;
}

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './whatsapp.html',
  styleUrls: ['./whatsapp.css']
})
export class WhatsappComponent implements OnInit {
  @Input() celular: string = '33 3589 3912';
  @Input() mensaje: string = '¡Hola Plasmex CNC! Me interesa cotizar un proyecto en corte láser/plasma.';
  @Input() posicion: WhatsAppPosicion = 'derecha';
  @Input() tooltip: string = '¿Deseas cotizar? ¡Escríbenos!';
  @Input() mostrarTooltip: boolean = true;
  @Input() estilo: WhatsAppEstilo = 'verde';
  @Input() animacion: WhatsAppAnimacion = 'pulso';

  @Input() isEditor: boolean = false;
  @Output() actualizarProps = new EventEmitter<WhatsAppProps>();
  @Output() eliminarElemento = new EventEmitter<void>();

  mostrarConfigModal: boolean = false;
  tooltipCerrado: boolean = false;

  estilosList: { id: WhatsAppEstilo; name: string; icon: string; desc: string }[] = [
    { id: 'verde', name: 'Verde Oficial', icon: 'fab fa-whatsapp', desc: 'Verde clásico oficial de WhatsApp con resplandor suave.' },
    { id: 'rojo', name: 'Rojo Láser Neón', icon: 'fas fa-fire-alt', desc: 'Rojo carmesí industrial al estilo Plasmex CNC con brillo neón.' },
    { id: 'dark', name: 'Dark Cyber CNC', icon: 'fas fa-shield-alt', desc: 'Gris carbón oscuro con detalles luminosos de alta definición.' }
  ];

  posicionesList: { id: WhatsAppPosicion; name: string; icon: string }[] = [
    { id: 'derecha', name: 'Inferior Derecha', icon: 'fas fa-arrow-down-right' },
    { id: 'izquierda', name: 'Inferior Izquierda', icon: 'fas fa-arrow-down-left' }
  ];

  ngOnInit() {}

  /** Formatea y limpia el número telefónico para la API de WhatsApp */
  getCleanPhone(): string {
    const raw = (this.celular || '').replace(/\D+/g, '');
    // Si tiene 10 dígitos (número estándar mexicano), agregar prefijo de país 52
    if (raw.length === 10) {
      return `52${raw}`;
    }
    return raw;
  }

  /** Genera el enlace directo wa.me con el número y el mensaje codificado */
  getWhatsAppUrl(): string {
    const phone = this.getCleanPhone();
    const encodedMsg = encodeURIComponent(this.mensaje || '');
    if (!phone) return 'https://wa.me/';
    return `https://wa.me/${phone}${encodedMsg ? '?text=' + encodedMsg : ''}`;
  }

  /** Abre el chat de WhatsApp en una pestaña nueva */
  abrirWhatsApp(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const url = this.getWhatsAppUrl();
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  cambiarEstilo(nuevoEstilo: WhatsAppEstilo) {
    this.estilo = nuevoEstilo;
    this.emitirCambios();
  }

  cambiarPosicion(nuevaPosicion: WhatsAppPosicion) {
    this.posicion = nuevaPosicion;
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

  cerrarTooltip(event?: Event) {
    if (event) event.stopPropagation();
    this.tooltipCerrado = true;
  }

  emitirCambios() {
    this.actualizarProps.emit({
      celular: this.celular,
      mensaje: this.mensaje,
      posicion: this.posicion,
      tooltip: this.tooltip,
      mostrarTooltip: this.mostrarTooltip,
      estilo: this.estilo,
      animacion: this.animacion
    });
  }
}
