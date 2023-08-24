import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { JobDataService } from '../job-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @ViewChild('menuContainer', { static: false }) menuContainer: ElementRef;
    expanded;
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
    toggle() {
        this.expanded = !this.expanded;
    }
    ngAfterViewInit() {
        // Here, the menuContainer should be properly initialized.
        console.log('**', this.menuContainer); // Make sure it's not undefined
    }
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
        console.log(this.menuContainer);
        if (!this.menuContainer.nativeElement.contains(event.target)) {
            this.expanded = false;
        }
    }
}
