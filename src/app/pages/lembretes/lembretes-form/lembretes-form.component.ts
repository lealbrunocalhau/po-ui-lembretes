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
  ) {

  }

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
  protected setCurrentAction(): void {
    // verificar a rota que chegou, para saber se está editando ou adicionando
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  // Precisa
  protected buildLembreteForm(): void {
    this.form = this.fb.group({
      id: [''],
      prioridade: ['', Validators.compose(
        [
          Validators.required,
        ]
      )
      ],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required]
    });

  }

  protected loadLembrete(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.lembreteService.getById(+params.get('id')))
      )
        .subscribe(
          (resource) => {
            console.log('Com sucesso no LoadLembrete');
            this.lembrete = resource;
            this.form.patchValue(resource);
            // binds loaded resource data to resourceForm
          },
          (error) => alert('Ocorreu um erro no servidor, tente mais tarde. (category-form->LoadCategory())')
        );
    }
  }


  // Prioridade Options
  // tslint:disable-next-line:member-ordering
  public readonly prioridadeOptions: Array<PoComboOption> = [
    { value: 'baixa', label: 'Baixa' },
    { value: 'média', label: 'Média' },
    { value: 'alta', label: 'Alta' }
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
    console.warn('teste no close');
    this.form.reset();
    this.poModal.close();
    this.router.navigateByUrl('/lembretes');
  }


  notificacao(): void {
    console.warn('Validar current action aqui', this.currentAction);
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
    console.log('Entrei no abrirModal');
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

  // Nova implementação


  submitForm(): void {
    console.log('Entrei no SubmitForm');
    // quando o usuario clicar no botao de salvar
    this.submittingForm = true;

    // verificar se esta editando ou criando category
    if (this.currentAction === 'new') {
      this.createLembrete();
    } else {
      console.warn('No submit Form porem UpdateLembrete precisa ser implementado');
      // currentAction == 'edit'
      this.updateLembrete();
    }
  }


  protected createLembrete(): void {

    console.warn('2222', this.lembretes);
    const id = this.lembretes.length + 1;
    // vai precisar criar um objeto do tipo category e enviar atraves do categoryService
    const lembrete: Lembrete = Lembrete.fromJson(this.form.value);
    lembrete.id = id;
    console.log('Olhar aqui o lembrete 111111', lembrete);

    this.lembreteService.create(lembrete)
      .subscribe(
        success => console.log('Muito bem Bruno'),
        error => console.log('Deu erro')
      );


    // this.resourceService.create(resource)
    //   .subscribe(
    //     // tslint:disable-next-line:no-shadowed-variable
    //     resource => this.actionsForSuccess(resource),
    //     error => this.actionsForError(error)
    //   );

  }



  protected updateLembrete() {
    const lembrete: Lembrete = Lembrete.fromJson(this.form.value);
    this.lembreteService.update(lembrete)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        resource => console.log('Muito bem estou no updateLembrete com sucesso no subcribe')//this.actionsForSuccess(resource),
        // error => this.actionsForError(error)
      );
  }


}
