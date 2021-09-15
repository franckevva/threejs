import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSceneComponent } from './book.component';

describe('FirstComponent', () => {
  let component: BookSceneComponent;
  let fixture: ComponentFixture<BookSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
