import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdetailComponent } from './blogdetail.component';

describe('BlogdetailComponent', () => {
  let component: BlogdetailComponent;
  let fixture: ComponentFixture<BlogdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
