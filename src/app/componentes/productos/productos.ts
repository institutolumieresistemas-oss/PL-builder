import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type ProductosLayoutType = 'grid-cards' | 'photo-overlay' | 'polaroid-industrial' | 'masonry-gallery' | 'cyber-carousel' | 'catalog-filter';

export interface ProductoItem {
  id: string;
  nombre: string;
  imagenUrl: string;
  categoria?: string;
  link?: string;
}

export interface ProductosProps {
  tipo: ProductosLayoutType;
  badge: string;
  titulo: string;
  tituloResaltado: string;
  descripcion: string;
  productos: ProductoItem[];
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {
  @Input() tipo: ProductosLayoutType = 'grid-cards';
  @Input() badge: string = 'GALERÍA DE MODELOS Y DISEÑOS';
  @Input() titulo: string = 'Nuestros Modelos en';
  @Input() tituloResaltado: string = 'Corte Láser & Plasma';
  @Input() descripcion: string = 'Explora nuestro catálogo visual de celosías, anuncios, decoración y piezas industriales.';
  
  @Input() productos: ProductoItem[] = [
    {
      id: 'p-1',
      nombre: 'Celosía Modelo Árabe',
      categoria: 'Celosías',
      imagenUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      link: '/contacto'
    },
    {
      id: 'p-2',
      nombre: 'Letrero 3D Retroiluminado',
      categoria: 'Anuncios',
      imagenUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      link: '/contacto'
    },
    {
      id: 'p-3',
      nombre: 'Cuadro Árbol de la Vida',
      categoria: 'Decoración',
      imagenUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      link: '/contacto'
    },
    {
      id: 'p-4',
      nombre: 'Panel Fachada Diamante 3D',
      categoria: 'Celosías',
      imagenUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      link: '/contacto'
    },
    {
      id: 'p-5',
      nombre: 'Placas & Bridas Industriales',
      categoria: 'Industrial',
      imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      link: '/contacto'
    },
    {
      id: 'p-6',
      nombre: 'Barandal Geométrico CNC',
      categoria: 'Celosías',
      imagenUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      link: '/contacto'
    }
  ];

  @Input() isEditor: boolean = false;
  @Output() actualizarProps = new EventEmitter<ProductosProps>();
  @Output() eliminarElemento = new EventEmitter<void>();

  categoriaSeleccionada = 'Todos';
  carruselIndex = 0;
  mostrarConfigModal = false;

  layoutOptions = [
    { id: 'grid-cards', name: 'Grid Foto & Nombre', icon: 'fas fa-th', desc: 'Cuadrícula limpia con fotos grandes y nombres debajo en marco láser.' },
    { id: 'photo-overlay', name: 'Foto con Nombre Flotante', icon: 'fas fa-id-badge', desc: 'Foto de borde a borde con nombre integrado en gradiente oscuro.' },
    { id: 'polaroid-industrial', name: 'Marco Industrial CNC', icon: 'fas fa-vector-square', desc: 'Marco oscuro biselado con foto protagónica y nombre centrado.' },
    { id: 'masonry-gallery', name: 'Mosaico / Galería Visual', icon: 'fas fa-images', desc: 'Muro visual dinámico con nombres en resplandor rojo al hover.' },
    { id: 'cyber-carousel', name: 'Carrusel de Fotos', icon: 'fas fa-sliders-h', desc: 'Slider deslizable horizontal de fotos con nombres.' },
    { id: 'catalog-filter', name: 'Catálogo con Filtros', icon: 'fas fa-filter', desc: 'Filtros superiores de categoría con fotos y nombres en cuadrícula.' }
  ];

  ngOnInit() {
    if (!this.productos || this.productos.length === 0) {
      this.productos = [];
    }
  }

  get categorias(): string[] {
    const cats = new Set<string>();
    cats.add('Todos');
    this.productos.forEach(p => {
      if (p.categoria) cats.add(p.categoria);
    });
    return Array.from(cats);
  }

  get productosFiltrados(): ProductoItem[] {
    if (this.categoriaSeleccionada === 'Todos') {
      return this.productos;
    }
    return this.productos.filter(p => p.categoria === this.categoriaSeleccionada);
  }

  cambiarTipo(nuevoTipo: ProductosLayoutType) {
    this.tipo = nuevoTipo;
    this.emitirCambios();
  }

  filtrarCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
  }

  siguienteSlide() {
    if (this.productos.length > 0) {
      this.carruselIndex = (this.carruselIndex + 1) % this.productos.length;
    }
  }

  anteriorSlide() {
    if (this.productos.length > 0) {
      this.carruselIndex = (this.carruselIndex - 1 + this.productos.length) % this.productos.length;
    }
  }

  irASlide(index: number) {
    this.carruselIndex = index;
  }

  abrirConfig() {
    this.mostrarConfigModal = true;
  }

  cerrarConfig() {
    this.mostrarConfigModal = false;
  }

  agregarProducto() {
    const nuevoId = 'p-' + Date.now();
    this.productos.push({
      id: nuevoId,
      nombre: 'Nuevo Modelo ' + (this.productos.length + 1),
      categoria: 'Celosías',
      imagenUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      link: '/contacto'
    });
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
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
      productos: this.productos
    });
  }
}
