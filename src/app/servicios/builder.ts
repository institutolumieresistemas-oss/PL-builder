import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { PageElement } from '../models/element.model';
import { map } from 'rxjs/operators';
import { PagesService } from './page';

@Injectable({ providedIn: 'root' })
export class Builder {

  private currentPage$ = new BehaviorSubject<Page | null>(null);
  private menuStyle$ = new BehaviorSubject<string>('capsule');
  private menuSinTransparencia$ = new BehaviorSubject<boolean>(false);

  constructor(private pagesService: PagesService) {
    // Cargar estilo del menú global de la página de inicio al inicializar
    this.pagesService.traer({ id: '215b86d9-b308-43f5-b649-d8d234580607' }).subscribe((res: any) => {
      const elements = res?.content?.elements || [];
      const menuEl = elements.find((el: any) => el.type === 'menu');
      if (menuEl) {
        this.menuStyle$.next(menuEl.props?.styleType || 'capsule');
        this.menuSinTransparencia$.next(menuEl.props?.sinTransparencia ?? false);
      }
    });
  }

  getCurrentPage(): Observable<Page | null> {
    return this.currentPage$.asObservable();
  }

  getCurrentPageValue(): Page | null {
    return this.currentPage$.value;
  }

  getMenuStyle(): Observable<string> {
    return this.menuStyle$.asObservable();
  }

  getMenuStyleValue(): string {
    return this.menuStyle$.value;
  }

  getMenuSinTransparenciaValue(): boolean {
    return this.menuSinTransparencia$.value;
  }

  saveGlobalMenu(styleType: string, sinTransparencia: boolean = false) {
    this.menuStyle$.next(styleType);
    this.menuSinTransparencia$.next(sinTransparencia);
    this.pagesService.traer({ id: '215b86d9-b308-43f5-b649-d8d234580607' }).subscribe((res: any) => {
      const elements = res?.content?.elements || [];
      let menuEl = elements.find((el: any) => el.type === 'menu');
      if (menuEl) {
        menuEl.props = { styleType, sinTransparencia };
      } else {
        elements.unshift({
          type: 'menu',
          props: { styleType, sinTransparencia }
        });
      }
      this.pagesService.contenido({ id: '215b86d9-b308-43f5-b649-d8d234580607', content: { elements } }).subscribe(() => {
        console.log("💾 Menú global guardado en Home (Página de inicio)");
      });
    });
  }

  loadPage(pageId: string) {

    this.pagesService.traer({ id: pageId })
      .pipe(
        map((res: any) => ({
          id: res.id,
          name: res.name,
          slug: res.slug,
          elements: res.content?.elements || []
        } as Page))
      )
      .subscribe(page => {

        console.log("📥 Página cargada desde BD:", page);

        this.currentPage$.next(page);

      });

  }

  addElement(type: PageElement['type'], props?: any) {

    const page = this.currentPage$.value;
  
    if (!page) return;
  
    const newElement: PageElement = {
      id: crypto.randomUUID(),
      type,
      col: 12,
      props: props || this.getDefaultProps(type)
    };
  
    const updatedPage: Page = {
      ...page,
      elements: [...page.elements, newElement]
    };
  
    this.currentPage$.next(updatedPage);
    this.saveCurrentPage();
  
  }

  saveCurrentPage() {

    const page = this.getCurrentPageValue(); // 🔥 usar getter
  
    if (!page) return;

    // Normalizar: si algún elemento no tiene col, asignar 12 por default
    const elements = page.elements.map(el => ({
      ...el,
      col: el.col ?? 12
    }));
  
    const payload = {
      id: page.id,
      content: { elements }
    };
  
    this.pagesService.contenido(payload).subscribe(
      res => {
        console.log("✅ RESPUESTA BACKEND:", res);
      },
      err => {
        console.error("❌ ERROR GUARDANDO CONFIGURACIÓN:", err);
      }
    );
  
  }

  updateElements(elements: PageElement[]) {

    const page = this.getCurrentPageValue();
  
    if (!page) return;
  
    const updatedPage: Page = {
      ...page,
      elements: [...elements]
    };
  
    this.currentPage$.next(updatedPage);
    this.saveCurrentPage();
  
  }

  private getDefaultProps(type: PageElement['type']): any {
    switch (type) {
      case 'materiales':
        return {
          tipo: 'comparison-table-cards',
          badge: 'CAPACIDADES DE CORTE CNC & METALES',
          titulo: 'Tabla Técnica de',
          tituloResaltado: 'Materiales & Calibres',
          descripcion: 'Procesamos una amplia variedad de metales y calibres con tecnología de fibra óptica láser y plasma de alta definición para herrería, arquitectura e industria pesada.',
          materiales: [
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
          ]
        };
      case 'testimonios':
        return {
          tipo: 'grid-cards',
          badge: 'OPINIONES DE CLIENTES & ALIADOS',
          titulo: 'La Confianza de Nuestros',
          tituloResaltado: 'Clientes en Plasmex CNC',
          descripcion: 'Arquitectos, diseñadores, empresas constructoras y herreros respaldan la precisión y puntualidad de nuestros trabajos en corte plasma y láser.',
          calificacionPromedio: '4.9',
          totalReviews: '+150 Reseñas Verificadas',
          testimonios: [
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
            }
          ]
        };
      case 'formulario':
        return {
          tipo: 'cotizador-express',
          badge: 'SOLICITUD DE COTIZACIÓN ONLINE',
          titulo: 'Inicia tu Proyecto',
          tituloResaltado: 'con Plasmex CNC',
          descripcion: 'Envíanos las especificaciones de tu proyecto o plano y te responderemos con una cotización formal en menos de 24 horas.',
          telefono: '33 3589 3912',
          whatsapp: '33 3589 3912',
          email: 'ventas@plasmexcnc.com',
          direccion: 'Av. Industrial #2450, Col. El Álamo, Guadalajara, Jal.',
          horario: 'Lunes a Viernes de 8:00 AM a 6:30 PM',
          botonTexto: 'Enviar Cotización'
        };
      case 'banner':
        return {
          estilo: 'cyber-laser-card',
          posicionImagen: 'izquierda',
          badge: 'INGENIERÍA & MAQUILA INDUSTRIAL',
          titulo: 'Maquila de Corte Láser',
          tituloResaltado: 'y Plasma de Alta Definición',
          descripcion: 'Contamos con mesas de corte CNC equipadas con fuentes de plasma HD y fibra óptica láser de última generación para procesar desde calibres delgados hasta placas de 1 pulgada.',
          puntosClave: [
            'Corte sin rebaba con tolerancia de ±0.2mm',
            'Mesa de trabajo para placas de hasta 1.5m x 3.0m',
            'Archivos compatibles: DXF, DWG, PDF y AI',
            'Servicio de pintura electrostática Powder Coat'
          ],
          botonTexto: 'Cotizar Maquila',
          botonLink: '/contacto',
          botonSecundarioTexto: 'Ver Materiales',
          botonSecundarioLink: '/materiales',
          imagenUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
        };
      case 'footer':
        return {
          tipo: 'cyber-laser',
          direccion: 'Av. Industrial #2450, Col. El Álamo, Guadalajara, Jalisco, México',
          telefono: '33 3589 3912',
          whatsapp: '33 3589 3912',
          email: 'ventas@plasmexcnc.com',
          horario: 'Lun - Vie: 8:00 AM - 6:30 PM | Sáb: 8:30 AM - 2:00 PM',
          nosotrosTexto: 'Especialistas líderes en corte plasma y láser CNC. Diseñamos y fabricamos celosías arquitectónicas, anuncios 3D corpóreos, decoración en metal y maquila industrial de placa pesada.',
          instagramUsuario: '@plasmexcnc',
          instagramUrl: 'https://instagram.com/plasmexcnc',
          instagramFotos: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80'
          ],
          copyright: '© 2026 Plasmex CNC. Todos los derechos reservados. Guadalajara, Jalisco.'
        };
      case 'cintillo':
        return {
          tipo: 'laser-gradient-red',
          badge: 'ATENCIÓN Y COTIZACIÓN INMEDIATA',
          titulo: '¿Tienes un proyecto de corte en mente?',
          tituloResaltado: 'Cotiza hoy mismo con Plasmex CNC',
          subtitulo: 'Fabricamos celosías, anuncios 3D y piezas industriales con entrega puntual en Guadalajara y envíos a todo México.',
          botonTexto: 'Cotizar por WhatsApp',
          botonLink: 'https://wa.me/523335893912',
          botonIcono: 'fab fa-whatsapp'
        };
      case 'hero':
        return {
          tipo: 'industrial-split',
          badge: 'TECNOLOGÍA CNC DE ALTA PRECISIÓN',
          titulo: 'Transformamos el Metal en',
          tituloResaltado: 'Diseño y Precisión',
          descripcion: 'Especialistas en maquila de corte plasma y láser CNC. Fabricamos celosías arquitectónicas, decoración metálica y anuncios comerciales con acabados de primera calidad.',
          botonPrimarioTexto: 'Cotizar Proyecto',
          botonPrimarioLink: '/contacto',
          botonSecundarioTexto: 'Ver Catálogo',
          botonSecundarioLink: '/celosias',
          imagenUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
          metricas: [
            { numero: '+10', etiqueta: 'Años de Experiencia' },
            { numero: '±0.2mm', etiqueta: 'Tolerancia de Corte' },
            { numero: '100%', etiqueta: 'Calidad en Acero' }
          ]
        };
      case 'productos':
        return {
          tipo: 'grid-cards',
          badge: 'CATÁLOGO & MAQUILA',
          titulo: 'Nuestros Proyectos y',
          tituloResaltado: 'Productos de Precisión',
          descripcion: 'Descubre nuestra línea de celosías arquitectónicas, anuncios 3D y piezas decorativas cortadas en plasma y láser CNC con acabados de primera calidad.',
          productos: [
            {
              id: 'p-1',
              nombre: 'Celosía Modelo Árabe',
              categoria: 'Celosías',
              descripcion: 'Panel decorativo para fachadas y muros divisorios con corte láser de alta definición.',
              material: 'Calibre 14 / Acero al Carbón',
              precio: 'Desde $1,250 / m²',
              imagenUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
              link: '/celosias',
              destacado: true
            },
            {
              id: 'p-2',
              nombre: 'Letrero 3D Retroiluminado',
              categoria: 'Anuncios',
              descripcion: 'Logotipo corpóreo en metal con iluminación LED posterior y acabado automotriz.',
              material: 'Acero Inoxidable & Acrílico',
              precio: 'Cotización personalizada',
              imagenUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
              link: '/anuncios',
              destacado: false
            },
            {
              id: 'p-3',
              nombre: 'Cuadro Árbol de la Vida',
              categoria: 'Decoración',
              descripcion: 'Pieza de arte mural contemporáneo en metal con pintura electrostática en polvo.',
              material: 'Calibre 12 / Negro Mate',
              precio: '$1,850 MXN',
              imagenUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
              link: '/decoracion',
              destacado: false
            },
            {
              id: 'p-4',
              nombre: 'Panel Fachada Diamante 3D',
              categoria: 'Celosías',
              descripcion: 'Revestimiento arquitectónico para exteriores de casas y edificios comerciales.',
              material: 'Aluminio 1/8" / Pintura Hornos',
              precio: 'Desde $1,650 / m²',
              imagenUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
              link: '/celosias',
              destacado: false
            },
            {
              id: 'p-5',
              nombre: 'Placas & Bridas Industriales',
              categoria: 'Industrial',
              descripcion: 'Corte de placa pesada para herrería estructural, maquinaria y ensambles industriales.',
              material: 'Placa A36 hasta 1" Espesor',
              precio: 'Maquila por volumen',
              imagenUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
              link: '/materiales',
              destacado: false
            },
            {
              id: 'p-6',
              nombre: 'Barandal Geométrico CNC',
              categoria: 'Celosías',
              descripcion: 'Módulos para balcones y barandales de escalera seguros y elegantes.',
              material: 'Calibre 11 / Acero al Carbón',
              precio: 'Desde $2,400 / ml',
              imagenUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
              link: '/celosias',
              destacado: false
            }
          ]
        };
      case 'ejemplo':
        return {
          titulo: 'Mi Componente Ejemplo',
          contenido: 'Este es un contenido de prueba.'
        };
      default:
        return {};
    }
  }

  // OLD_METHODS_REST_REMOVED
}