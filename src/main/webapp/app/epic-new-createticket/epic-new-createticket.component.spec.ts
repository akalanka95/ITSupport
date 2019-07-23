import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicNewCreateticketComponent } from './epic-new-createticket.component';

describe('EpicNewCreateticketComponent', () => {
    let component: EpicNewCreateticketComponent;
    let fixture: ComponentFixture<EpicNewCreateticketComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EpicNewCreateticketComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EpicNewCreateticketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
