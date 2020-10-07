import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
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
  lembretes: Lembrete[] = [];
  returnedArray: Lembrete[];

  constructor(
    private lembreteService: LembreteService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.lembreteService.getAll().subscribe(
      success => {
        this.lembretes = success;
        this.baseResources = success;
        this.returnedArray = this.lembretes.slice(0, 1);
      },
      error => alert('Erro ao carrega a listagem de Lembretes')
    );

    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl,
    });
    this.searchControl.valueChanges
      .pipe(
        switchMap(
          searchTerm => this.lembreteService.getAll(searchTerm)
        )
      ).subscribe(lembrete => {});
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.lembretes.slice(startItem, endItem);
  }

  search(): void {
    this.searchList();
  }

  searchList(): void {
    const query = (this.searchQuery && this.searchQuery !== null) ? this.searchQuery : '';
    this.returnedArray = this.filterList(this.baseResources, query);
  }
  filterList(list, query): Array<any> {
    return list.filter(item => {
      return item.titulo.toLowerCase().includes(query.toLowerCase());
    });
  }



}
