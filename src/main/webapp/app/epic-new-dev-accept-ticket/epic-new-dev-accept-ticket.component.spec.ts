import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicNewDevAcceptTicketComponent } from './epic-new-dev-accept-ticket.component';

describe('EpicNewDevAcceptTicketComponent', () => {
    let component: EpicNewDevAcceptTicketComponent;
    let fixture: ComponentFixture<EpicNewDevAcceptTicketComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EpicNewDevAcceptTicketComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EpicNewDevAcceptTicketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
