import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicUserProductsComponent } from './epic-user-products.component';

describe('EpicUserProductsComponent', () => {
    let component: EpicUserProductsComponent;
    let fixture: ComponentFixture<EpicUserProductsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EpicUserProductsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EpicUserProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
