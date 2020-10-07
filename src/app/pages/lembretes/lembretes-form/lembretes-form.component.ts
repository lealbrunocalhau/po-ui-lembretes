import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoComboOption, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { Lembrete } from 'src/app/model/lembrete.model';
import { LembreteService } from '../shared/lembrete.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lembretes-form',
  templateUrl: './lembretes-form.component.html',
  styleUrls: ['./lembretes-form.component.scss']
})
export class LembretesFormComponent implements OnInit {

  form: FormGroup;
  lembretes: Lembrete[] = [];
  mode = 'criar';
  currentAction: string;
  submittingForm = false;
  lembrete: Lembrete;

  constructor(
    private poNotification: PoNotificationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private lembreteService: LembreteService
  ) { }

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildLembreteForm();
    this.loadLembrete();
    this.loadLembretes();
    this.abrirModal();
  }

  private loadLembretes(): void {
    this.lembreteService.getAll().subscribe(
      success => this.lembretes = success
    );
  }

  // Precisa Private Methods
  private setCurrentAction(): void {
    // verificar a rota que chegou, para saber se está editando ou adicionando
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  // Precisa
  private buildLembreteForm(): void {
    this.form = this.fb.group({
      id: [''],
      prioridade: ['', Validators.required],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  private loadLembrete(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.lembreteService.getById(+params.get('id')))
      )
        .subscribe(
          (resource) => {
            this.lembrete = resource;
            this.form.patchValue(resource);
          },
          (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    }
  }

  // Prioridade Options
  // tslint:disable-next-line:member-ordering
  public readonly prioridadeOptions: Array<PoComboOption> = [
    { value: 'Baixa', label: 'Baixa' },
    { value: 'Média', label: 'Média' },
    { value: 'Alta', label: 'Alta' }
  ];

  // Propriedade Confirm e Close do Modal
  // tslint:disable-next-line:member-ordering
  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Cancelar',
    danger: true
  };

  // tslint:disable-next-line:member-ordering
  confirm: PoModalAction = {
    action: () => {
      if (this.form.invalid) {
        return alert('Formulário não preenchido corretamente');
      }
      this.submitForm();
      this.notificacao();
      this.closeModal();
    },
    label: 'Salvar'
  };

  closeModal(): void {
    this.form.reset();
    this.poModal.close();
    this.router.navigateByUrl('/lembretes');
  }

  notificacao(): void {
    setTimeout(() => {
      if (this.currentAction === 'edit') {
        this.poNotification.success(`Seu lembrete foi atualizado com sucesso.`);
      } else {
        this.poNotification.success(`Seu lembrete foi salvo com sucesso.`);
      }
    }, 200);
  }

  public abrirModal(): void {
    this.form.reset();
    this.poModal.open();
  }

  load(): void {
    const data = localStorage.getItem('lembretes');
    if (data) {
      const items = JSON.parse(data)
      this.lembretes = items;
    } else {
      this.lembretes = [];
    }
  }

  submitForm(): void {
    this.submittingForm = true;
    // verificar se esta editando ou criando category
    if (this.currentAction === 'new') {
      this.createLembrete();
    } else {
      this.updateLembrete();
    }
  }

  private createLembrete(): void {
    const id = this.lembretes.length + 1;
    const lembrete: Lembrete = Lembrete.fromJson(this.form.value);
    lembrete.id = id;
    this.lembreteService.create(lembrete)
      .subscribe(
        success => { },
        error => { console.log('Deu erro'); }
      );
  }

  private updateLembrete(): void {
    const lembrete: Lembrete = Lembrete.fromJson(this.form.value);
    this.lembreteService.update(lembrete)
      .subscribe(
        success => { },
        error => { console.log('Deu erro'); }
      );
  }
}
