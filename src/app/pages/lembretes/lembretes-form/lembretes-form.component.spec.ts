import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LembretesFormComponent } from './lembretes-form.component';

describe('LembretesFormComponent', () => {
  let component: LembretesFormComponent;
  let fixture: ComponentFixture<LembretesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LembretesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LembretesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
