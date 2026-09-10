import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class WhatsappComponent implements OnInit, OnChanges {
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
  guardadoExitoso: boolean = false;

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['celular'] && changes['celular'].currentValue !== undefined) {
      this.celular = changes['celular'].currentValue;
    }
    if (changes['mensaje'] && changes['mensaje'].currentValue !== undefined) {
      this.mensaje = changes['mensaje'].currentValue;
    }
    if (changes['posicion'] && changes['posicion'].currentValue !== undefined) {
      this.posicion = changes['posicion'].currentValue;
    }
    if (changes['tooltip'] && changes['tooltip'].currentValue !== undefined) {
      this.tooltip = changes['tooltip'].currentValue;
    }
    if (changes['mostrarTooltip'] && changes['mostrarTooltip'].currentValue !== undefined) {
      this.mostrarTooltip = changes['mostrarTooltip'].currentValue;
    }
    if (changes['estilo'] && changes['estilo'].currentValue !== undefined) {
      this.estilo = changes['estilo'].currentValue;
    }
    if (changes['animacion'] && changes['animacion'].currentValue !== undefined) {
      this.animacion = changes['animacion'].currentValue;
    }
  }

  /** Formatea y limpia el número telefónico para la API de WhatsApp wa.me */
  getCleanPhone(): string {
    const raw = (this.celular || '').replace(/\D+/g, '');
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

  /** Abre el chat de WhatsApp en una pestaña nueva, o abre la configuración si está en el editor */
  abrirWhatsApp(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.isEditor) {
      this.abrirConfig();
      return;
    }
    const url = this.getWhatsAppUrl();
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  onCampoCambiado() {
    this.emitirCambios();
  }

  cambiarEstilo(nuevoEstilo: WhatsAppEstilo) {
    this.estilo = nuevoEstilo;
    this.emitirCambios();
  }

  cambiarPosicion(nuevaPosicion: WhatsAppPosicion) {
    this.posicion = nuevaPosicion;
    this.emitirCambios();
  }

  abrirConfig(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.mostrarConfigModal = true;
  }

  cerrarConfig() {
    this.mostrarConfigModal = false;
  }

  guardarConfig() {
    this.emitirCambios();
    this.cerrarConfig();
    this.guardadoExitoso = true;
    setTimeout(() => {
      this.guardadoExitoso = false;
    }, 3000);
  }

  eliminar(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
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
