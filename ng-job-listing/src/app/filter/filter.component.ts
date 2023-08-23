import { Component } from '@angular/core';
import { JobDataService } from '../job-data.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
    arr = [];
    filterArr = [];
    filterIsOn = false;
    constructor(public jobDataService: JobDataService) {}
    ngOnInit() {
        this.jobDataService.getJobData().subscribe((v) => {
            this.arr = v;
        });
        this.jobDataService.value.subscribe((v) => {
            this.filterIsOn = true;
            if (!this.filterArr.includes(v)) {
                this.filterArr.push(v);
            }
            if (this.filterArr.length == 0) {
                this.filterIsOn = false;
            }
        });
    }
    remove(value) {
        if (this.filterArr.includes(value)) {
            const index = this.filterArr.indexOf(value);
            this.filterArr.splice(index, 1);
        }
    }
    clear() {
        this.filterArr = [];
        this.filterIsOn = false;
    }
}
