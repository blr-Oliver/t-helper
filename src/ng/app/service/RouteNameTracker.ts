import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class RouteNameTracker implements Resolve<string> {
  name: string = null;

  resolve(route: ActivatedRouteSnapshot): string {
    return this.name = route.data['name'];
  }
}
