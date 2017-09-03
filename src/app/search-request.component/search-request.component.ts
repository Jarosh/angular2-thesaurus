import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";


@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.component.html',
  styleUrls: ['./search-request.component.css']
})

export class SearchRequestComponent {
    
  @Input() value: string;

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  private query$: Subject<string> = new Subject<string>();
  private query: string = '';
  private model: string = '';
  private subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(this.query$.asObservable()
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe((value: string) => {
        this.emitValue(value);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  ngOnChanges(data: any): void {
    if (data.value) {
      this.emitValue(data.value.currentValue);
    }
  }

  public onSearch(): void {
    this.emitValue(this.model);
  }

  public onSearchInput(): void {
    this.query$.next(this.model);
  }

  private emitValue(value: string): void {
    if (this.query != value) {
      this.changed.emit(value);
      this.query = this.model = value;
    }
  }

}
