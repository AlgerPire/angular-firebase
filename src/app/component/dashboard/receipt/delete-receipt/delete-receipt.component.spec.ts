import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReceiptComponent } from './delete-receipt.component';

describe('DeleteReceiptComponent', () => {
  let component: DeleteReceiptComponent;
  let fixture: ComponentFixture<DeleteReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
