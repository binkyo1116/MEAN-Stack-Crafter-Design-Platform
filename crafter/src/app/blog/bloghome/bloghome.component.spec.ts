import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloghomeComponent } from './bloghome.component';

describe('BloghomeComponent', () => {
  let component: BloghomeComponent;
  let fixture: ComponentFixture<BloghomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloghomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloghomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
