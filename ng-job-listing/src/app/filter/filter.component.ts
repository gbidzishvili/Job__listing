import { Component, EventEmitter, Output } from '@angular/core';
import { JobDataService } from '../job-data.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
    originalArr = [];
    filterArr = [];
    filterIsOn = false;
    @Output() newArrEvent = new EventEmitter<any[]>();
    constructor(public jobDataService: JobDataService) {}
    ngOnInit() {
        this.jobDataService.getJobData().subscribe((v) => {
            this.originalArr = v;
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
        this.jobDataService.filterbyValue.subscribe((v: string) => {
            console.log('eeheh', v);
            this.filterIsOn = true;
            if (!this.filterArr.includes(v)) {
                this.filterArr.push(v);
            }
            this.newArrEvent.emit(this.filter());
        });
    }
    remove(value) {
        if (this.filterArr.includes(value)) {
            const index = this.filterArr.indexOf(value);
            this.filterArr.splice(index, 1);
        }
        if (this.filterArr.length == 0) {
            this.newArrEvent.emit(this.originalArr);
            this.filterIsOn = false;
        } else {
            this.newArrEvent.emit(this.filter());
        }
    }
    filter() {
        let arr = this.originalArr;
        return arr.filter((v) => {
            return this.filterArr.every((value) => {
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
        });
    }
    clear() {
        this.filterArr = [];
        this.filterIsOn = false;
        this.newArrEvent.emit(this.originalArr);
    }
}
