import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Builder } from '../../servicios/builder';

export type MenuStyleType = 'capsule' | 'glass-dark' | 'cyber-cnc' | 'split-brand' | 'neon-glow' | 'compact-topbar';

export interface MenuItem {
  name: string;
  slug: string;
  icon?: string;
}

export interface MenuOption {
  id: MenuStyleType;
  name: string;
  icon: string;
  desc: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent {
  private builder = inject(Builder);

  @Input() styleType: MenuStyleType | string = 'capsule';
  @Input() sinTransparencia: boolean = false;
  @Input() isEditorPreview: boolean = false;

  @Output() styleChange = new EventEmitter<string>();
  @Output() transparencyChange = new EventEmitter<boolean>();

  mostrarModalEstilos = signal(false);
  mobileMenuOpen = signal(false);

  menuOptions: MenuOption[] = [
    { id: 'capsule', name: 'Cápsula Flotante', icon: 'fas fa-capsules', desc: 'Píldora centrada moderna con glassmorphism' },
    { id: 'glass-dark', name: 'Cristal Negro', icon: 'fas fa-gem', desc: 'Minimalista con frosted glass y línea roja' },
    { id: 'cyber-cnc', name: 'Cyber CNC Láser', icon: 'fas fa-microchip', desc: 'Industrial geométrico con esquinas biseladas' },
    { id: 'split-brand', name: 'Logo Central Split', icon: 'fas fa-columns', desc: 'Emblema central con navegación simétrica' },
    { id: 'neon-glow', name: 'Neón Rojo OLED', icon: 'fas fa-bolt', desc: 'Fondo negro puro con resplandor carmesí' },
    { id: 'compact-topbar', name: 'Doble Barra', icon: 'fas fa-layer-group', desc: 'Microbar de contacto superior + navegación' },
  ];

  menuItems: MenuItem[] = [
    { name: 'Inicio', slug: '/home', icon: 'fas fa-home' },
    { name: 'Nosotros', slug: '/nosotros', icon: 'fas fa-shield-alt' },
    { name: 'Celosías', slug: '/celosias', icon: 'fas fa-border-all' },
    { name: 'Decoración', slug: '/decoracion', icon: 'fas fa-gem' },
    { name: 'Anuncios', slug: '/anuncios', icon: 'fas fa-bullhorn' },
    { name: 'Materiales', slug: '/materiales', icon: 'fas fa-layer-group' },
    { name: 'Galería', slug: '/galeria', icon: 'fas fa-images' },
    { name: 'Contacto', slug: '/contacto', icon: 'fas fa-envelope' },
  ];

  get leftMenuItems(): MenuItem[] {
    return this.menuItems.slice(0, 4);
  }

  get rightMenuItems(): MenuItem[] {
    return this.menuItems.slice(4);
  }

  seleccionarEstilo(styleId: MenuStyleType) {
    this.styleType = styleId;
    this.styleChange.emit(styleId);
    if (this.isEditorPreview) {
      this.builder.saveGlobalMenu(styleId, this.sinTransparencia);
    }
  }

  toggleTransparencia() {
    this.sinTransparencia = !this.sinTransparencia;
    this.transparencyChange.emit(this.sinTransparencia);
    if (this.isEditorPreview) {
      this.builder.saveGlobalMenu(this.styleType as string, this.sinTransparencia);
    }
  }

  abrirModalEstilos() {
    this.mostrarModalEstilos.set(true);
  }

  cerrarModalEstilos() {
    this.mostrarModalEstilos.set(false);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
