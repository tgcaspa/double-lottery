import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainHeaderComponent } from './main-header.component';

describe('LayoutMainHeaderComponent', () => {
  let component: LayoutMainHeaderComponent;
  let fixture: ComponentFixture<LayoutMainHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutMainHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
