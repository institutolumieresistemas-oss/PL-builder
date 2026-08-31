import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type FooterStyleType = 'cyber-laser' | 'minimal-dark' | 'bold-industrial';

export interface FooterProps {
  tipo: FooterStyleType;
  // Columna 1: Dirección & Contacto
  direccion: string;
  telefono: string;
  whatsapp: string;
  email: string;
  horario: string;
  
  // Columna 2: Nosotros & Enlaces
  nosotrosTexto: string;
  
  // Columna 3: Instagram & Redes
  instagramUsuario: string;
  instagramUrl: string;
  instagramFotos: string[];
  
  // Copyright
  copyright: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent implements OnInit {
  @Input() tipo: FooterStyleType = 'cyber-laser';

  // COLUMNA 1: DIRECCIÓN & CONTACTO
  @Input() direccion: string = 'Av. Industrial #2450, Col. El Álamo, Guadalajara, Jalisco, México';
  @Input() telefono: string = '33 3589 3912';
  @Input() whatsapp: string = '33 3589 3912';
  @Input() email: string = 'ventas@plasmexcnc.com';
  @Input() horario: string = 'Lun - Vie: 8:00 AM - 6:30 PM | Sáb: 8:30 AM - 2:00 PM';

  // COLUMNA 2: NOSOTROS
  @Input() nosotrosTexto: string = 'Especialistas líderes en corte plasma y láser CNC. Diseñamos y fabricamos celosías arquitectónicas, anuncios 3D corpóreos, decoración en metal y maquila industrial de placa pesada.';

  // COLUMNA 3: INSTAGRAM & REDES
  @Input() instagramUsuario: string = '@plasmexcnc';
  @Input() instagramUrl: string = 'https://instagram.com/plasmexcnc';
  @Input() instagramFotos: string[] = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80'
  ];

  @Input() copyright: string = '© 2026 Plasmex CNC. Todos los derechos reservados. Guadalajara, Jalisco.';

  @Input() isEditor: boolean = false;
  @Output() actualizarProps = new EventEmitter<FooterProps>();
  @Output() eliminarElemento = new EventEmitter<void>();

  mostrarConfigModal = false;

  enlacesPaginas = [
    { name: 'Inicio', slug: '/home' },
    { name: 'Nosotros', slug: '/nosotros' },
    { name: 'Celosías', slug: '/celosias' },
    { name: 'Decoración', slug: '/decoracion' },
    { name: 'Anuncios', slug: '/anuncios' },
    { name: 'Materiales', slug: '/materiales' },
    { name: 'Galería', slug: '/galeria' },
    { name: 'Contacto', slug: '/contacto' }
  ];

  footerStylesList = [
    { id: 'cyber-laser', name: 'Cyber CNC Láser', icon: 'fas fa-microchip', desc: 'Borde rojo láser superior con grid de Instagram con hover rojo.' },
    { id: 'minimal-dark', name: 'Minimal Dark', icon: 'fas fa-gem', desc: 'Negro puro con tipografía limpia y enlaces alineados.' },
    { id: 'bold-industrial', name: 'Industrial Bold', icon: 'fas fa-industry', desc: 'Encabezados en rojo fuego con badges metálicos.' }
  ];

  ngOnInit() {
    if (!this.instagramFotos || this.instagramFotos.length === 0) {
      this.instagramFotos = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80'
      ];
    }
  }

  cambiarTipo(nuevoTipo: FooterStyleType) {
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
      direccion: this.direccion,
      telefono: this.telefono,
      whatsapp: this.whatsapp,
      email: this.email,
      horario: this.horario,
      nosotrosTexto: this.nosotrosTexto,
      instagramUsuario: this.instagramUsuario,
      instagramUrl: this.instagramUrl,
      instagramFotos: this.instagramFotos,
      copyright: this.copyright
    });
  }
}
