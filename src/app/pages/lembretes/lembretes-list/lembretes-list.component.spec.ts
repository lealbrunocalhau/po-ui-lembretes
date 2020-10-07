import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LembretesListComponent } from './lembretes-list.component';

describe('LembretesListComponent', () => {
  let component: LembretesListComponent;
  let fixture: ComponentFixture<LembretesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LembretesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LembretesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
