import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import {
  AbstractTableField,
  ErrorMessage,
  FilterBase,
  FilterTypeConstants,
  SearchInfo,
  SearchResult,
} from '@engular/base-models';
import { Observable, Subscription } from 'rxjs';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  template: '',
})
export abstract class SearchBasePageComponent<MODEL> extends BasePageComponent implements OnInit {
  /**
   * The array of filter criteria managed by page
   */
  public filtersCriteria: FilterBase[] = [];

  /**
   * Witch filed use for sort the result
   */
  public sortFieldActive: string;

  /**
   * Kind of sort
   */
  public sortType: 'asc' | 'desc' = 'asc';

  /**
   * Actual page of result loaded
   */
  public pageNumber = 0;
  public pageSizeNumber = 10;
  /**
   * Maintain pages cache to optimize the request
   */
  protected pageCache: any[] = [];

  /**
   * This will contain the subscription to search operation
   */
  protected searchSubscription: Subscription;

  /**
   * Contain the table structure for result
   */
  tableStructure: AbstractTableField[] = [];

  FILTER_TYPE_CONSTANT = FilterTypeConstants;

  public showResult: SearchResult<MODEL> | undefined;

  @Output('newSearch')
  newSearch = new EventEmitter<SearchInfo>();

  @Input()
  public set startSearchOnInit(value: boolean) {
    this._startSearchOnInit = value;
  }
  protected _startSearchOnInit = false;

  public searchLoading = false;

  criteria: any;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit() {
    this.filtersCriteria = this.defineFiltersCriteria(this.filtersCriteria);
    this.tableStructure = this.defineTableStructure(this.tableStructure);
    this.sortFieldActive = this.getDefaultSortField();
    super.ngOnInit();
    if (this._startSearchOnInit) {
      this.refreshSearch(false);
    }
  }

  /**
   * Change the sort field to input one. If the field it's the same change the sort type.
   * @param field The sortable field
   */
  public changeSort(field: string) {
    if (field === this.sortFieldActive) {
      // switch sort type
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortType = 'asc';
      this.sortFieldActive = field;
    }
    // after change refresh the search
    this.refreshSearch(true);
  }

  /**
   * Change the page to load
   */
  public changePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.criteria = undefined;
    this.runSearch();
  }

  public changePageElementsShowed(pageSizeNumber: number) {
    this.pageSizeNumber = pageSizeNumber;
    this.refreshSearch(false);
  }
  /**
   * Refresh the search and managing also the reset of page cache
   */
  public refreshSearch(newSearch = true) {
    this.pageCache = [];
    this.showResult = undefined;

    if (newSearch) {
      this.criteria = undefined;
      this.pageNumber = 0;
    }
    this.runSearch();
  }

  /**
   * This internal method build the new criteriaDto and run a search managing also the page number and result
   */
  protected runSearch() {
    this.log.info('runSearch');
    // 1. build criteria
    const criteriaDto = this.buildCriteriaDto();
    this.log.debug('queryDto:', criteriaDto);
    // 2. manage page ++ and cache
    const cache = this.pageCache[this.pageNumber];
    if (cache) {
      this.showResult = cache;
      return;
    }
    // 3. manage old search don't complete
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
      this.stopSearchLoading();
    }
    // 4. run search
    this.startSearchLoading();

    this.searchSubscription = this.search(criteriaDto).subscribe(
      (result: SearchResult<MODEL>) => {
        // 4. manage result
        this.showResult = result;
        this.pageCache[this.pageNumber] = result;
        this.log.debug('search result are:', result);
        this.newSearch.emit(new SearchInfo(result.totalElements, result.totalPages, this.pageNumber, criteriaDto));
      },
      (error: ErrorMessage) => {
        this.messageService.throwMessage(error);
        this.stopSearchLoading();
      },
      () => {
        this.stopSearchLoading();
      }
    );
  }
  /**
   * Build the dto for backend from criteria
   */
  protected buildCriteriaDto(): any {
    if (this.criteria) {
      return this.criteria;
    }
    this.criteria = {};
    let criteria = this.criteria;
    this.filtersCriteria.forEach((filter) => {
      if (!filter.disabled && filter.payload !== undefined && filter.payload !== null && filter.payload !== '') {
        this.log.debug('start filter', filter, criteria);
        // create condition to check the type of filter if date or not
        switch (filter.type) {
          case this.FILTER_TYPE_CONSTANT.TEXT:
            this.log.debug('1 filter', filter, criteria);
            criteria[filter.dtoField] = filter.payload;
            break;

          case this.FILTER_TYPE_CONSTANT.SELECT:
            this.log.debug('2 filter', filter, criteria);
            criteria[filter.dtoField] = filter.payload;
            break;
          case this.FILTER_TYPE_CONSTANT.DATE_INTERVAL:
            this.log.debug('3 filter', filter, criteria);
            criteria[filter.dtoField + 'From'] = filter.payload.from != null ? filter.payload.from.toDTO() : null;
            criteria[filter.dtoField + 'To'] = filter.payload.to != null ? filter.payload.to.toDTO() : null;
            break;
          case this.FILTER_TYPE_CONSTANT.DATE:
            this.log.debug('filter date', filter, criteria);
            criteria[filter.dtoField] = filter.payload ? filter.payload.toDTO() : null;
            break;
          case this.FILTER_TYPE_CONSTANT.NUMBER_INTERVAL:
            this.log.debug('4 filter', filter, criteria);
            criteria[filter.dtoField + 'From'] = filter.payload.from;
            criteria[filter.dtoField + 'To'] = filter.payload.to;
            break;
          default:
            criteria[filter.dtoField] = filter.payload;
        }
      }
    });
    criteria['sort'] = this.sortFieldActive + ',' + this.sortType;
    criteria['page'] = this.pageNumber;
    criteria['size'] = this.pageSizeNumber || 10;
    criteria = JSON.parse(JSON.stringify(criteria).replace(/"_/g, '"'));
    return criteria;
  }

  public resetSearch() {
    this.sortType = 'asc';
    this.sortFieldActive = this.getDefaultSortField();
    this.pageNumber = 0;
    this.showResult = undefined;
    this.criteria = undefined;
    if (this._startSearchOnInit) {
      this.refreshSearch(true);
    }
  }

  isSearchLoading() {
    return this.searchLoading;
  }

  startSearchLoading() {
    this.searchLoading = true;
  }

  stopSearchLoading() {
    this.searchLoading = false;
  }

  /*
	************************************************
		TEMPLATE METHOD AT GO GO
		http://wikipedia.org/wiki/Template_method
	************************************************
                    ____________________
                   /\                   \
                  /  \    _______________\
                  \   \   \              /
                   \   \   \________    /
                    \   \   \  /   /   /
                     \   \   \/   /   /
                      \   \   \  /   /
                       \   \   \/   /
                        \   \   \  /
                         \   \   \/
                         /\   \   \
                        /  \   \   \
                       /   /\   \   \
                      /   /  \   \   \
                     /   /   /\   \   \
    ________________/   /   /__\___\___\________________
   /\              /   /   /                            \
  /  \    ________/   /   /______________________________\
  \   \   \      /   /   /                               /
   \   \   \____/   /   /___________________________    /
    \   \   \  /   /   /            \   \   \  /   /   /
     \   \   \/   /   /              \   \   \/   /   /
      \   \  /   /   /                \   \  /   /   /
       \   \/   /   /                  \   \/   /   /
        \      /   /                    \      /   /
         \    /   /                      \    /   /
          \  /   /                        \  /   /
           \/___/                          \/___/
Ascii by Edwin Havik

*/

  abstract defineTableStructure(structure: AbstractTableField[]): AbstractTableField[];
  abstract defineFiltersCriteria(filters: FilterBase[]): FilterBase[];
  abstract getDefaultSortField(): string;
  abstract search(criteriaDto: any): Observable<SearchResult<MODEL>>;
}
