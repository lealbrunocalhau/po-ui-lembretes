import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Lembrete } from '../../../model/lembrete.model';
import { LembreteService } from '../shared/lembrete.service';


@Component({
  selector: 'app-lembretes-list',
  templateUrl: './lembretes-list.component.html',
  styleUrls: ['./lembretes-list.component.scss']
})
export class LembretesListComponent implements OnInit {

  searchForm: FormGroup;
  searchControl: FormControl;
  baseResources: Lembrete[] = [];
  searchQuery = '';

  constructor(
    private lembreteService: LembreteService,
    private fb: FormBuilder
  ) { }

  lembretes: Lembrete[] = [];


  ngOnInit(): void {
    // aqui esta funcionando abaixo. acima estou implementando a busca
    this.lembreteService.getAll().subscribe(
      success => {
        this.lembretes = success;
        this.baseResources = success;
      },
      error => alert('Erro ao carrega a listagem de Lembretes')
    );


    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl,
    });
    // this.searchControl.valueChanges.subscribe(termSearch => console.warn('8888', termSearch));
    this.searchControl.valueChanges
      .pipe(
        switchMap(
          searchTerm => this.lembreteService.getAll(searchTerm)
        )
      ).subscribe(lembrete => {
        console.log('Olhar aqui 22222', lembrete)
        console.log('Olhar aqui 333', this.lembretes)
        // this.lembretes = lembrete;
        // this.baseResources = lembrete;
      });




  }

  bruno(): void {
    console.log('Entrei no search 0000', this.baseResources);
    console.log('Entrei no search 99999999999999', this.lembretes);
    console.log('Entrei no search ', this.searchQuery);
    this.searchList();
  }


  // Implementando a Busca Novo
  searchList(): void {
    console.log('Estamos aqui Brunao no searchList', this.baseResources);
    const query = (this.searchQuery && this.searchQuery !== null) ? this.searchQuery : '';
    this.lembretes = this.filterList(this.baseResources, query);
  }

  filterList(list, query): Array<any> {
    console.log('Entrei no filter list', list);
    return list.filter(item => {
      console.log('Olhe o item aqui', item);
      return item.titulo.toLowerCase().includes(query.toLowerCase());
    });
  }



}
