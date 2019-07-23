import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicNewDevProcessTicketComponent } from './epic-new-dev-process-ticket.component';

describe('EpicNewDevProcessTicketComponent', () => {
    let component: EpicNewDevProcessTicketComponent;
    let fixture: ComponentFixture<EpicNewDevProcessTicketComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EpicNewDevProcessTicketComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EpicNewDevProcessTicketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
