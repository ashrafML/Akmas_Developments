import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WrpperVue } from './Wrpper_vue';

describe('WrpperVue', () => {
  let component: WrpperVue;
  let fixture: ComponentFixture<WrpperVue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrpperVue],
    }).compileComponents();

    fixture = TestBed.createComponent(WrpperVue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
