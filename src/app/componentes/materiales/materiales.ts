import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type MaterialesLayoutType = 'cyber-tech-cards' | 'comparison-table-cards' | 'interactive-tabs' | 'gauge-matrix-grid';

export interface MaterialItem {
  id: string;
  nombre: string;
  tipoCorte: string;
  espesorMinMax: string;
  dimensionesMax: string;
  tolerancia: string;
  acabados: string;
  usosRecomendados: string;
  badgeStock: string;
  icono: string;
  imagenUrl: string;
}

export interface MaterialesProps {
  tipo: MaterialesLayoutType;
  badge: string;
  titulo: string;
  tituloResaltado: string;
  descripcion: string;
  materiales: MaterialItem[];
}

@Component({
  selector: 'app-materiales',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './materiales.html',
  styleUrls: ['./materiales.css']
})
export class MaterialesComponent implements OnInit {
  @Input() tipo: MaterialesLayoutType = 'cyber-tech-cards';

  @Input() badge: string = 'CAPACIDADES DE CORTE CNC & METALES';
  @Input() titulo: string = 'Tabla Técnica de';
  @Input() tituloResaltado: string = 'Materiales & Calibres';
  @Input() descripcion: string = 'Procesamos una amplia variedad de metales y calibres con tecnología de fibra óptica láser y plasma de alta definición para herrería, arquitectura e industria pesada.';

  @Input() materiales: MaterialItem[] = [
    {
      id: 'm-1',
      nombre: 'Acero al Carbón (A36)',
      tipoCorte: 'Láser Fibra & Plasma HD',
      espesorMinMax: 'Cal. 20 (0.9mm) hasta 1" (25.4mm)',
      dimensionesMax: '1.50m x 3.00m (5\' x 10\')',
      tolerancia: '±0.20 mm',
      acabados: 'Natural, Decapado, Pintura Electrostática',
      usosRecomendados: 'Celosías arquitectónicas, portones, placas base, bridas y estructuras.',
      badgeStock: 'Stock Permanente en Taller',
      icono: 'fas fa-cube',
      imagenUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'm-2',
      nombre: 'Acero Inoxidable (304 / 316)',
      tipoCorte: 'Corte Láser Nitrógeno',
      espesorMinMax: 'Cal. 24 (0.6mm) hasta 1/2" (12.7mm)',
      dimensionesMax: '1.50m x 3.00m (5\' x 10\')',
      tolerancia: '±0.15 mm',
      acabados: 'Acabado Satinado, Espejo, 2B Industrial',
      usosRecomendados: 'Anuncios 3D, decoración de lujo, barandales, industria química y alimentaria.',
      badgeStock: 'Alta Resistencia a Corrosión',
      icono: 'fas fa-shield-alt',
      imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'm-3',
      nombre: 'Aluminio (5052 / 6061)',
      tipoCorte: 'Láser Fibra Óptica',
      espesorMinMax: 'Cal. 18 (1.2mm) hasta 3/8" (9.5mm)',
      dimensionesMax: '1.25m x 2.50m (4\' x 8\')',
      tolerancia: '±0.15 mm',
      acabados: 'Natural, Anodizado, Powder Coat',
      usosRecomendados: 'Fachadas ligeras, paneles decorativos exteriores, gabinetes electrónicos.',
      badgeStock: 'Ultraligero & Inoxidable',
      icono: 'fas fa-feather-alt',
      imagenUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'm-4',
      nombre: 'Lámina Galvanizada',
      tipoCorte: 'Láser Fibra Óptica',
      espesorMinMax: 'Cal. 26 (0.45mm) hasta Cal. 10 (3.4mm)',
      dimensionesMax: '1.22m x 2.44m (4\' x 8\')',
      tolerancia: '±0.20 mm',
      acabados: 'Cincado Galvanizado de Fábrica',
      usosRecomendados: 'Ductos, gabinetes, mamparas y cubiertas resistentes a la intemperie.',
      badgeStock: 'Excelente Rendimiento/Costo',
      icono: 'fas fa-layer-group',
      imagenUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'm-5',
      nombre: 'Placa Antiderrapante (Alfajor)',
      tipoCorte: 'Plasma HD CNC',
      espesorMinMax: 'Cal. 14 (1.9mm) hasta 1/4" (6.3mm)',
      dimensionesMax: '1.22m x 2.44m (4\' x 8\')',
      tolerancia: '±0.30 mm',
      acabados: 'Patrón Diamante Antideslizante',
      usosRecomendados: 'Escalones, rampas, pisos industriales y carrocerías de transporte.',
      badgeStock: 'Uso Rudo Industrial',
      icono: 'fas fa-grip-lines',
      imagenUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
    }
  ];

  @Input() isEditor: boolean = false;
  @Output() actualizarProps = new EventEmitter<MaterialesProps>();
  @Output() eliminarElemento = new EventEmitter<void>();

  tabActivaIndex: number = 0;
  mostrarConfigModal = false;

  materialesLayoutList = [
    { id: 'cyber-tech-cards', name: 'Tarjetas Industriales', icon: 'fas fa-th-large', desc: 'Cuadrícula de tarjetas con bisel y chips técnicos.' },
    { id: 'comparison-table-cards', name: 'Tabla Pro (Cards en Móvil)', icon: 'fas fa-table', desc: 'Tabla en escritorio que se convierte en cards en móvil y tablet.' },
    { id: 'interactive-tabs', name: 'Pestañas por Metal', icon: 'fas fa-folder', desc: 'Selector de metal con vista en gran formato y detalles.' },
    { id: 'gauge-matrix-grid', name: 'Matriz de Calibres', icon: 'fas fa-ruler-combined', desc: 'Visualización rápida con rangos de espesor destacados.' }
  ];

  ngOnInit() {}

  cambiarTipo(nuevoTipo: MaterialesLayoutType) {
    this.tipo = nuevoTipo;
    this.emitirCambios();
  }

  seleccionarTab(index: number) {
    this.tabActivaIndex = index;
  }

  abrirConfig() {
    this.mostrarConfigModal = true;
  }

  cerrarConfig() {
    this.mostrarConfigModal = false;
  }

  agregarMaterial() {
    const nuevoId = 'm-' + (this.materiales.length + 1);
    this.materiales.push({
      id: nuevoId,
      nombre: 'Nuevo Metal / Aleación',
      tipoCorte: 'Láser Fibra & Plasma HD',
      espesorMinMax: 'Cal. 18 hasta 1/2"',
      dimensionesMax: '1.50m x 3.00m',
      tolerancia: '±0.20 mm',
      acabados: 'Natural, Pintura',
      usosRecomendados: 'Uso industrial y arquitectónico',
      badgeStock: 'Disponible',
      icono: 'fas fa-cube',
      imagenUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
    });
  }

  eliminarMaterial(index: number) {
    this.materiales.splice(index, 1);
    if (this.tabActivaIndex >= this.materiales.length) {
      this.tabActivaIndex = Math.max(0, this.materiales.length - 1);
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
      materiales: this.materiales
    });
  }
}
