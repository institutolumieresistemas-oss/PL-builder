import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type TestimoniosLayoutType = 'grid-cards' | 'carousel-slider' | 'google-reviews-wall' | 'split-stats-quote' | 'minimal-quotes-marquee';

export interface TestimonioItem {
  id: string;
  nombre: string;
  cargo: string;
  avatarUrl: string;
  comentario: string;
  calificacion: number;
  proyecto: string;
  fecha: string;
}

export interface TestimoniosProps {
  tipo: TestimoniosLayoutType;
  badge: string;
  titulo: string;
  tituloResaltado: string;
  descripcion: string;
  calificacionPromedio: string;
  totalReviews: string;
  testimonios: TestimonioItem[];
}

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './testimonios.html',
  styleUrls: ['./testimonios.css']
})
export class TestimoniosComponent implements OnInit {
  @Input() tipo: TestimoniosLayoutType = 'grid-cards';

  @Input() badge: string = 'OPINIONES DE CLIENTES & ALIADOS';
  @Input() titulo: string = 'La Confianza de Nuestros';
  @Input() tituloResaltado: string = 'Clientes en Plasmex CNC';
  @Input() descripcion: string = 'Arquitectos, diseñadores, empresas constructoras y herreros respaldan la precisión y puntualidad de nuestros trabajos en corte plasma y láser.';

  @Input() calificacionPromedio: string = '4.9';
  @Input() totalReviews: string = '+150 Reseñas Verificadas';

  @Input() testimonios: TestimonioItem[] = [
    {
      id: 't-1',
      nombre: 'Arq. Roberto Sandoval',
      cargo: 'Director en Sandoval Arquitectos (GDL)',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comentario: 'Mandamos a cortar celosías de 3 metros para la fachada de una residencia en Puerta de Hierro. La precisión del láser y el acabado sin rebaba nos ahorraron días de trabajo. Excelente calidad.',
      calificacion: 5,
      proyecto: 'Celosía de Fachada en Acero Cal. 12',
      fecha: 'Hace 2 semanas'
    },
    {
      id: 't-2',
      nombre: 'Ing. Fernando Valenzuela',
      cargo: 'Gerente de Proyectos - Metalmecánica Jalisco',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comentario: 'La maquila de placa de 1/2 pulgada salió impecable con plasma de alta definición. El tiempo de entrega fue de apenas 48 horas cumpliendo exactamente con los planos en DXF.',
      calificacion: 5,
      proyecto: 'Maquila de Placas & Bridas Industriales',
      fecha: 'Hace 3 semanas'
    },
    {
      id: 't-3',
      nombre: 'Lic. Mariana Garza',
      cargo: 'Propietaria de Boutique & Café Áurea',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      comentario: 'Diseñaron el letrero 3D retroiluminado para nuestro local. El corte es súper limpio y la pintura electrostática quedó perfecta. Todos nuestros clientes nos felicitan por el letrero.',
      calificacion: 5,
      proyecto: 'Anuncio 3D Corpóreo con Luz LED',
      fecha: 'Hace 1 mes'
    },
    {
      id: 't-4',
      nombre: 'Héctor Morales',
      cargo: 'Herrería & Estructuras Morales (Zapopan)',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      comentario: 'Llevo 2 años trabajando con ellos para paneles decorativos y barandales. Nunca me han quedado mal con los tiempos y los costos son muy justos para la calidad que ofrecen.',
      calificacion: 5,
      proyecto: 'Paneles para Portón & Barandal CNC',
      fecha: 'Hace 1 mes'
    }
  ];

  @Input() isEditor: boolean = false;
  @Output() actualizarProps = new EventEmitter<TestimoniosProps>();
  @Output() eliminarElemento = new EventEmitter<void>();

  mostrarConfigModal = false;
  carruselIndex: number = 0;

  testimonioEditando: TestimonioItem = {
    id: '',
    nombre: '',
    cargo: '',
    avatarUrl: '',
    comentario: '',
    calificacion: 5,
    proyecto: '',
    fecha: ''
  };

  testimoniosLayoutList = [
    { id: 'grid-cards', name: 'Grid Láser con Estrellas', icon: 'fas fa-th-large', desc: 'Cuadrícula de tarjetas con borde rojo y 5 estrellas de calificación.' },
    { id: 'carousel-slider', name: 'Slider Destacado', icon: 'fas fa-play-circle', desc: 'Gran formato interactivo con comillas gigantes y selector previo/siguiente.' },
    { id: 'google-reviews-wall', name: 'Muro Tipo Google Reviews', icon: 'fab fa-google', desc: 'Encabezado con insignia oficial de reseñas verificadas y muro dinámico.' },
    { id: 'split-stats-quote', name: 'Dividido con Métricas', icon: 'fas fa-chart-pie', desc: 'Columna con contadores de satisfacción (99%, +350 proyectos) y testimonio VIP.' },
    { id: 'minimal-quotes-marquee', name: 'Cápsulas Minimalistas', icon: 'fas fa-stream', desc: 'Píldoras horizontales oscuras con acento rojo y opiniones resumidas.' }
  ];

  ngOnInit() {
    if (!this.testimonios || this.testimonios.length === 0) {
      this.testimonios = [
        {
          id: 't-1',
          nombre: 'Arq. Roberto Sandoval',
          cargo: 'Director en Sandoval Arquitectos (GDL)',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          comentario: 'Mandamos a cortar celosías de 3 metros para la fachada de una residencia. La precisión del láser y el acabado sin rebaba nos ahorraron días de trabajo. Excelente calidad.',
          calificacion: 5,
          proyecto: 'Celosía de Fachada en Acero Cal. 12',
          fecha: 'Hace 2 semanas'
        },
        {
          id: 't-2',
          nombre: 'Ing. Fernando Valenzuela',
          cargo: 'Gerente de Proyectos - Metalmecánica Jalisco',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          comentario: 'La maquila de placa de 1/2 pulgada salió impecable con plasma de alta definición. El tiempo de entrega fue de apenas 48 horas cumpliendo exactamente con los planos en DXF.',
          calificacion: 5,
          proyecto: 'Maquila de Placas & Bridas Industriales',
          fecha: 'Hace 3 semanas'
        },
        {
          id: 't-3',
          nombre: 'Lic. Mariana Garza',
          cargo: 'Propietaria de Boutique & Café Áurea',
          avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
          comentario: 'Diseñaron el letrero 3D retroiluminado para nuestro local. El corte es súper limpio y la pintura electrostática quedó perfecta. Todos nuestros clientes nos felicitan por el letrero.',
          calificacion: 5,
          proyecto: 'Anuncio 3D Corpóreo con Luz LED',
          fecha: 'Hace 1 mes'
        }
      ];
    }
  }

  cambiarTipo(nuevoTipo: TestimoniosLayoutType) {
    this.tipo = nuevoTipo;
    this.emitirCambios();
  }

  prevCarrusel() {
    if (this.carruselIndex > 0) {
      this.carruselIndex--;
    } else {
      this.carruselIndex = this.testimonios.length - 1;
    }
  }

  nextCarrusel() {
    if (this.carruselIndex < this.testimonios.length - 1) {
      this.carruselIndex++;
    } else {
      this.carruselIndex = 0;
    }
  }

  abrirConfig() {
    this.mostrarConfigModal = true;
  }

  cerrarConfig() {
    this.mostrarConfigModal = false;
  }

  agregarTestimonio() {
    const nuevoId = 't-' + (this.testimonios.length + 1);
    this.testimonios.push({
      id: nuevoId,
      nombre: 'Nuevo Cliente',
      cargo: 'Empresa / Particular',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      comentario: 'Excelente servicio en corte CNC y entrega puntual.',
      calificacion: 5,
      proyecto: 'Corte CNC Personalizado',
      fecha: 'Reciente'
    });
  }

  eliminarTestimonio(index: number) {
    this.testimonios.splice(index, 1);
    if (this.carruselIndex >= this.testimonios.length) {
      this.carruselIndex = Math.max(0, this.testimonios.length - 1);
    }
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
      calificacionPromedio: this.calificacionPromedio,
      totalReviews: this.totalReviews,
      testimonios: this.testimonios
    });
  }
}
