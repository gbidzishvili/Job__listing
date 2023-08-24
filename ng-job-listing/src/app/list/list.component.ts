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
    isMoreThan768: boolean;
    constructor(public jobDataService: JobDataService) {}

    ngOnInit() {
        this.viewportWidth = window.innerWidth;
        this.isMoreThan768 = this.viewportWidth > 768 ? true : false;
        this.jobDataService.getJobData().subscribe((v) => {
            this.list.push(...v);
            console.log('ListComponent list', this.list);
        });
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        console.log(event);
        let window = event.target as Window;
        this.viewportWidth = window.innerWidth;
        this.isMoreThan768 = this.viewportWidth > 768 ? true : false;
    }
    replaceSpacesWithHyphens(text: string): string {
        return text.toLowerCase().replaceAll(' ', '-').replaceAll('.', '');
    }
    passValue(value: string) {
        this.jobDataService.transferData(value);
        this.list = this.filter(value);
    }
    filter(value: string) {
        return this.list.filter((v) => {
            return (
                v.role === value ||
                v.level === value ||
                v.tools.some((tool: string) => {
                    return tool === value;
                }) ||
                v.languages.some((lang: string) => {
                    return lang === value;
                }) ||
                (value === 'NEW' && v.new === true) ||
                (value === 'FEATURED' && v.featured === true)
            );
        });
    }
    renewArr(list: []) {
        console.log('list is :', list);
        this.list = list;
    }
}
