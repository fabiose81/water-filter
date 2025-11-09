import { Component, ChangeDetectorRef, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AccordionComponent } from './accordion.component';
import { AppService } from '../service/app.service';
import { Water } from '../interface/water.interface'
import { Status } from '../interface/status.interface'

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: 'tabs.component.html',
  imports: [AccordionComponent]
})
export class TabsComponent {

    constructor(private appService: AppService, private cdr: ChangeDetectorRef) { }

    activeTab = signal<'start' | 'list'>('start');
    waters: Water[] = [];
    water: Water = ({} as any) as Water;
    isLoading = signal(false);
    connectionInterval?: ReturnType<typeof setInterval>;
    progress = 0;
    isFilteringProcess = signal(false);

    alertStatus = {
        visible: false,
        class: 'bg-red-600',
        label: ''
    };

    setActive(tab: 'start' | 'list') {
        this.activeTab.set(tab);
        this.alertStatus.visible = false;

        if (tab == 'list' && this.waters.length == 0) {
            this.list();
        }
    }

    handleMessage(alertClass: string, alertClassLabel: string): void {
        this.alertStatus.visible = true;
        this.alertStatus.class = alertClass;
        this.alertStatus.label = alertClassLabel;
    }

    showLoading() {
        this.isLoading.set(true);
    }

    hideLoading() {
        this.isLoading.set(false);
    }

    start(): void {
        this.showLoading();
        this.isFilteringProcess.set(true);
        this.appService.start()
            .subscribe({
                next: (result) => {                     
                    const id = result.executionArn.split(':').pop()!;
                    localStorage.setItem('id', id);
                    this.handleMessage('bg-green-600', 'Water filter process started. Wait a few seconds for the status progress.');
                    this.cdr.detectChanges(); 
                    this.checkFilteringProcess();     
                },
                error: (err: HttpErrorResponse) => {
                    this.handleMessage('bg-red-600', err.error);
                    this.isFilteringProcess.set(false);
                },
                complete: () => {
                    this.hideLoading();
                }
            });
    }

    checkFilteringProcess(): void {
         this.connectionInterval = setInterval(() => {
            this.get();
        }, (20 * 1000));
    }

    get(): void {
        const id: string = localStorage.getItem('id')!;

        this.appService.get(id)
            .subscribe({
                next: (result: Water) => {
                    if (result !== undefined) {
                        this.water = result;
                        const last = this.water.status.length - 1;
                        const status: Status = this.water.status[last];
                        this.progress = (100 - status.percent_dirt);
                        this.cdr.detectChanges();

                        if (this.water.finished) {
                            clearInterval(this.connectionInterval);
                            this.isFilteringProcess.set(false)
                        }
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this.handleMessage('bg-red-600', err.error);
                },
                complete: () => {
                }
            });
    }

    list(): void {
        this.showLoading();
        this.appService.list()
            .subscribe({
                next: (result: Water[]) => {
                    this.waters = [...result];
                    this.cdr.detectChanges();
                },
                error: (err: HttpErrorResponse) => {
                    this.handleMessage('bg-red-600', err.error);
                },
                complete: () => {
                    this.hideLoading();
                }
            });
    }
}