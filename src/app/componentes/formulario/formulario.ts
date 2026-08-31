import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type FormularioType = 'cotizador-express' | 'contacto-split-info' | 'cyber-laser-card' | 'multistep-wizard' | 'minimal-newsletter-strip';

export interface FormularioProps {
  tipo: FormularioType;
  badge: string;
  titulo: string;
  tituloResaltado: string;
  descripcion: string;
  telefono: string;
  whatsapp: string;
  email: string;
  direccion: string;
  horario: string;
  botonTexto: string;
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrls: ['./formulario.css']
})
export class FormularioComponent implements OnInit {
  @Input() tipo: FormularioType = 'cotizador-express';

  @Input() badge: string = 'SOLICITUD DE COTIZACIÓN ONLINE';
  @Input() titulo: string = 'Inicia tu Proyecto';
  @Input() tituloResaltado: string = 'con Plasmex CNC';
  @Input() descripcion: string = 'Envíanos las especificaciones de tu proyecto o plano y te responderemos con una cotización formal en menos de 24 horas.';
  
  @Input() telefono: string = '33 3589 3912';
  @Input() whatsapp: string = '33 3589 3912';
  @Input() email: string = 'ventas@plasmexcnc.com';
  @Input() direccion: string = 'Av. Industrial #2450, Col. El Álamo, Guadalajara, Jal.';
  @Input() horario: string = 'Lunes a Viernes de 8:00 AM a 6:30 PM';
  @Input() botonTexto: string = 'Enviar Cotización';

  @Input() isEditor: boolean = false;
  @Output() actualizarProps = new EventEmitter<FormularioProps>();
  @Output() eliminarElemento = new EventEmitter<void>();

  mostrarConfigModal = false;
  mensajeEnviado = false;

  // Estado del formulario interactivo
  formData = {
    nombre: '',
    telefono: '',
    email: '',
    servicio: 'Celosías Arquitectónicas',
    material: 'Acero al Carbón (A36)',
    espesor: 'Calibre 14 (1.9mm)',
    medidas: '',
    detalles: '',
    archivoPlano: '',
    contactoRapido: ''
  };

  serviciosList = [
    'Celosías Arquitectónicas',
    'Anuncios 3D Corpóreos',
    'Decoración en Metal',
    'Maquila de Corte Láser / Plasma',
    'Placas & Piezas Industriales'
  ];

  materialesList = [
    'Acero al Carbón (A36)',
    'Acero Inoxidable (304 / 316)',
    'Aluminio',
    'Lámina Galvanizada'
  ];

  espesoresList = [
    'Calibre 18 a 12 (Lámina delgada)',
    'Calibre 10 a 1/8" (Media)',
    'Placa 3/16" a 1/2" (Pesada)',
    'Placa 5/8" a 1" (Industrial)'
  ];

  // Estado del Multi-step Wizard
  pasoActual: number = 1;

  formTypesList = [
    { id: 'cotizador-express', name: 'Cotizador Express', icon: 'fas fa-bolt', desc: 'Selector de servicio, material, medidas y envío directo.' },
    { id: 'contacto-split-info', name: 'Contacto + Info', icon: 'fas fa-columns', desc: 'Tarjeta izquierda de datos de contacto y formulario detallado a la derecha.' },
    { id: 'cyber-laser-card', name: 'Cyber Plano CNC', icon: 'fas fa-microchip', desc: 'Tarjeta oscura neón enfocada en maquila industrial y carga de planos.' },
    { id: 'multistep-wizard', name: 'Paso a Paso Wizard', icon: 'fas fa-tasks', desc: 'Asistente guiado interactivo en 3 pasos con barra de progreso.' },
    { id: 'minimal-newsletter-strip', name: 'Barra Asesoría Rápida', icon: 'fas fa-paper-plane', desc: 'Cintillo horizontal minimalista para solicitud de llamada en 1 clic.' }
  ];

  ngOnInit() {}

  cambiarTipo(nuevoTipo: FormularioType) {
    this.tipo = nuevoTipo;
    this.emitirCambios();
  }

  avanzarPaso() {
    if (this.pasoActual < 3) {
      this.pasoActual++;
    }
  }

  retrocederPaso() {
    if (this.pasoActual > 1) {
      this.pasoActual--;
    }
  }

  enviarFormulario() {
    this.mensajeEnviado = true;
    
    // Generar enlace dinámico de WhatsApp si el usuario desea
    const textoMensaje = `*Cotización Plasmex CNC*%0A*Nombre:* ${this.formData.nombre || 'Cliente'}%0A*Servicio:* ${this.formData.servicio}%0A*Material:* ${this.formData.material}%0A*Teléfono:* ${this.formData.telefono}%0A*Detalles:* ${this.formData.detalles || 'Solicito cotización de proyecto'}`;
    const cleanWa = this.whatsapp.replace(/\s+/g, '');
    const waUrl = `https://wa.me/52${cleanWa}?text=${textoMensaje}`;
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  }

  resetForm() {
    this.mensajeEnviado = false;
    this.pasoActual = 1;
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
      telefono: this.telefono,
      whatsapp: this.whatsapp,
      email: this.email,
      direccion: this.direccion,
      horario: this.horario,
      botonTexto: this.botonTexto
    });
  }
}
