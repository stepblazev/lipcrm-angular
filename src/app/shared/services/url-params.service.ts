import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class URLParamsService {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public getParam(param: string): string | null {
    return this.route.snapshot.queryParamMap.get(param);
  }

  public setParam(param: string, value: string): void {
    const queryParams: Params = { ...this.route.snapshot.queryParams };
    queryParams[param] = value;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  public removeParam(param: string): void {
    const queryParams: Params = { ...this.route.snapshot.queryParams };
    delete queryParams[param];

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  public getAllParams(): Params {
    return { ...this.route.snapshot.queryParams };
  }

  public setParams(params: Params): void {
    const queryParams: Params = { ...this.route.snapshot.queryParams, ...params };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  public removeParams(params: string[]): void {
    const queryParams: Params = { ...this.route.snapshot.queryParams };
    for (const param of params) {
      delete queryParams[param];
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: [queryParams],
      queryParamsHandling: 'merge',
    });
  }
}
