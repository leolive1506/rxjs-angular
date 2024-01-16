import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, filter, map, switchMap, tap, throwError } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl()
  mensagemErro = ''

  constructor(private service: LivroService) { }

  // valueChanges -> retorna um observable que emite um evento toda vez que houver uma mudança no campo
  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter(valorDigitado => valorDigitado.length >= 3),
      tap(() => console.log('Fluxo inicial')),
      switchMap(valorDigitado => this.service.buscar(valorDigitado)),
      map(items => this.livrosResultadoParaLivros(items)),
      catchError(erro => { // não emite valores, apenas captura o erro
        return throwError(() => new Error(
          this.mensagemErro = 'Ops ocorreu um erro, Recarregue a aplicação'
        ))
      }),
      tap(() => console.log('Requisição ao servidor')),
      // map(items => {
      //   this.listaLivros = this.livrosResultadoParaLivros(items)
      // })
    )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => new LivroVolumeInfo(item));
  }
}
