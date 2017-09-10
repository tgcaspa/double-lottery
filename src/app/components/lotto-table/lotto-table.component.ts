import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultModel } from "../../models/result";
import { ResultsService } from "../../services/results.service";
import { SaveDialogComponent } from "./save-dialog/save-dialog.component";
import { MdDialog } from "@angular/material";

declare let $:any;
declare let _:any;

@Component({
    selector: 'lotto-table',
    templateUrl: './lotto-table.component.html',
    styleUrls: ['./lotto-table.component.scss']
})
export class LottoTableComponent implements OnInit {

    readonly REGULAR_MAX_SELECT = 6;
    readonly REGULAR_CELLS = 37;
    readonly STRONG_MAX_SELECT = 1;
    readonly STRONG_CELLS = 7;

    regularNums: number[] = [];
    strongNums: number[] = [];
    paisLastResult: ResultModel;
    pageMessage: string;

    constructor(private resultsSvc: ResultsService,
                public dialog: MdDialog) {}

    ngOnInit() {
        // last Pais result
        this.resultsSvc
            .paisLastResult
            .subscribe((result: ResultModel) => {
                this.paisLastResult = result;
            });
        // init clean table
        this.initRegularNums();
        this.initStrongNums();
    }

    isNewLine_regular(ix) {
        let res = [7, 17, 27].indexOf(ix);
        return Boolean(res !== -1);
    }

    initRegularNums() {
        this.regularNums = new Array(this.REGULAR_CELLS).fill(0);
    }

    initStrongNums() {
        this.strongNums = new Array(this.STRONG_CELLS).fill(0);
    }

    generateNumbers() {
        console.log('generating numbers...');
        this.initRegularNums();
        this.initStrongNums();
        this.generateRegularNums();
        this.generateStrongNums();
    }

    private generateRegularNums() {
        let collection = [];
        for (let ix = 0; ix < this.REGULAR_MAX_SELECT; ix++) {
            let n;
            do {
                n = Math.floor(Math.random() * this.REGULAR_CELLS);
            } while (collection.indexOf(n) !== -1);
            collection.push(n);
            this.regularNums[n] = 1;
        }
        console.log(`regular: ${this.getSelectedKeys(this.regularNums)}`);
    }

    private generateStrongNums() {
        let collection = [];
        for (let ix = 0; ix < this.STRONG_MAX_SELECT; ix++) {
            let n;
            do {
                n = Math.floor(Math.random() * this.STRONG_CELLS);
            } while (collection.indexOf(n) !== -1);
            collection.push(n);
            this.strongNums[n] = 1;
        }
        console.log(`strong: ${this.getSelectedKeys(this.strongNums)}`);
    }

    getSelectedKeys(numbers: number[]): number[] {
        let collection = [];
        for (let ix = 0; ix < numbers.length; ix++) {
            if(numbers[ix] === 1) {
                collection.push(ix+1);
            }
        }
        return collection;
    }

    cellClicked(e: Event, ix: number, type: string) {
        const selected = $(e.target).hasClass('selected');
        const val = Number(!selected);
        switch(type) {
            case 'regular':
                const countRegular = this.getSelectedKeys(this.regularNums);
                if(val && countRegular.length >= this.REGULAR_MAX_SELECT) {
                    alert(`אפשר לבחור לא יותר משישה מספרים רגילים.`);
                    return;
                }
                this.regularNums[ix] = val;
                break;
            case 'strong':
                const countStrong = this.getSelectedKeys(this.strongNums);
                if(val && countStrong.length >= this.STRONG_MAX_SELECT) {
                    alert(`אפשר לבחור לא יותר ממספר אחד חזק.`);
                    return;
                }
                this.strongNums[ix] = val;
                break;
        }
    }

    isNumbersAreSelected():boolean {
        // TODO: simplify getting selected numbers
        const countRegular = this.getSelectedKeys(this.regularNums);
        const countStrong = this.getSelectedKeys(this.strongNums);
        return (countRegular.length === 6) && (countStrong.length === 1);
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(SaveDialogComponent, {
            data: {
                regularNums: this.getSelectedKeys(this.regularNums),
                strongNums: this.getSelectedKeys(this.strongNums),
                paisLaResult: this.paisLastResult
            },
            direction: "rtl"
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if(result === true) {
                // init clean table
                this.initRegularNums();
                this.initStrongNums();
                alert("המספרים נשמרו בהצלחה!");
            }
        });
    }

}
