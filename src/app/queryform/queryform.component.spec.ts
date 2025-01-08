import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryformComponent } from './queryform.component';

describe('QueryformComponent', () => {
  let component: QueryformComponent;
  let fixture: ComponentFixture<QueryformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
