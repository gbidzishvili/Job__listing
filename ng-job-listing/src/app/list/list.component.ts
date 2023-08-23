import { Component, HostListener } from '@angular/core';
import { JobDataService } from '../job-data.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent {
    list = [];
    viewportWidth: number;
    isMoreThan768;
    constructor(public jobDataService: JobDataService) {}

    ngOnInit() {
        this.viewportWidth = window.innerWidth;
        if (this.viewportWidth > 768) {
            this.isMoreThan768 = true;
        } else {
            this.isMoreThan768 = false;
        }
        this.jobDataService.getJobData().subscribe((v) => {
            this.list.push(...v);
            console.log('ListComponent list', this.list);
        });
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.viewportWidth = event.target.innerWidth;
        if (this.viewportWidth > 768) {
            this.isMoreThan768 = true;
        } else {
            this.isMoreThan768 = false;
        }
    }
    replaceSpacesWithHyphens(text: string): string {
        return text.toLowerCase().replaceAll(' ', '-').replaceAll('.', '');
    }
    passValue(value) {
        this.jobDataService.transferData(value);
        let filtered = [];
        filtered = this.list.filter((v) => {
            console.log(v.role, value);
            return (
                v.role === value ||
                v.level === value ||
                v.tools.some((tool: string) => {
                    return tool === value;
                }) ||
                v.languages.some((lang: string) => {
                    return lang === value;
                })
            );
        });
        this.list = filtered;
    }
}
