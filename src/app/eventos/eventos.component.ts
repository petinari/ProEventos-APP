import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  eventoFiltrados: any = [];

  private _filtroLista: string = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(v: string) {
    console.log(v);
    this._filtroLista = v;
    this.eventoFiltrados = this.filtrarEventos(this.filtroLista);
    console.log(this.eventoFiltrados);
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLowerCase();
    return this.eventos.filter(
      (evento: any) =>
        evento.tema.toLowerCase().includes(filtrarPor) ||
        evento.local.toLowerCase().includes(filtrarPor)
    );
  }
  public eventos: any = [];
  widthImg = 150;
  marginImg = 2;
  mostrarImgBool = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.GetEventos();
  }

  public mostrarImg() {
    this.mostrarImgBool = !this.mostrarImgBool;
  }

  public GetEventos(): any {
    this.http.get('https://localhost:7238/evento').subscribe(
      (response) => {
        this.eventos = response;
        this.eventoFiltrados = this.eventos;
      },
      (error) => console.log(error)
    );
  }
}
