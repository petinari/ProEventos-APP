import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../../models/Evento';
import { EventoService } from '../../services/Evento.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline() {
    this.modalRef?.hide();
  }
  confirm() {
    this.modalRef?.hide();
    this.toastr.success('O evento foi deletado com sucesso.');
  }
  eventoFiltrados: Evento[] = [];

  private _filtroLista: string = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(v: string) {
    console.log(v);
    this._filtroLista = v;
    this.eventoFiltrados = this.filtrarEventos(this.filtroLista);
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLowerCase();
    return this.eventos.filter(
      (evento) =>
        evento.tema.toLowerCase().includes(filtrarPor) ||
        evento.local.toLowerCase().includes(filtrarPor)
    );
  }
  public eventos: Evento[] = [];
  widthImg = 150;
  marginImg = 2;
  mostrarImgBool = false;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    this.GetEventos();
  }

  public mostrarImg() {
    this.mostrarImgBool = !this.mostrarImgBool;
  }

  public GetEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventoFiltrados = this.eventos;
        console.log(_eventos);
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos.');
      },
      complete: () => this.spinner.hide(),
    });
  }
}
