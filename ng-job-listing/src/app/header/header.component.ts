import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { JobDataService } from '../job-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @ViewChild('filterContainer', { static: false })
    filterContainer: ElementRef;
    @ViewChild('menuContainer', { static: false }) menuContainer: ElementRef;
    expanded;
    displayNone = false;
    filterbyArr = [
        'Frontend',
        'Fullstack',
        'Senior',
        'Junior',
        'Midweight',
        'HTML',
        'CSS',
        'JavaScript',
        'Python',
        'Django',
        'Ruby',
        'RoR',
        'React',
        'Vue',
        'Sass',
        'New',
        'Featured',
    ];
    constructor(public jobDataService: JobDataService) {}
    filterby(val) {
        if (val == 'New') {
            val = 'NEW';
        } else if (val == 'Featured') {
            val = 'FEATURED';
        }
        console.log(val);
        this.jobDataService.filterBy(val);
    }
    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.menuContainer) {
            if (!this.menuContainer.nativeElement.contains(event.target)) {
                this.expanded = false;
            }
        } else if (this.filterContainer.nativeElement.contains(event.target)) {
            this.expanded = true;
        }
    }
}
