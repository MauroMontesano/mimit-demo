import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { PermissionService } from '../services/permission.service';

@Directive({
  selector: '[data-permission]',
})
export class PermissionDirective implements OnDestroy {
  private _hasOptions: boolean = false;

  private _hasAuthorization: boolean = false;

  private sub: Subscription | undefined;

  private tempNode: any;

  /*
   *
   */
  constructor(private renderer: Renderer2, private elmRef: ElementRef, private permissionService: PermissionService) {}

  /**
   *
   * @param options
   */
  @Input('data-permission')
  set dataPermission(options: string | string[]) {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (options) {
      // controllo che la funzionalità sia presente
      const hasPermObs = this.permissionService.hasPermissionsAsObservable(options);

      this.sub = hasPermObs.subscribe((hasPerm) => {
        this.checkPermissionsAndDoStuff(hasPerm, options);
      });
    }
  }

  private checkPermissionsAndDoStuff(hasAuthorization: any, options: string | string[]) {
    if (!options) {
      return;
    }
    if (!Array.isArray(options)) {
      options = ['' + options];
    }

    if (!hasAuthorization) {
      let padre = this.renderer.parentNode(this.elmRef.nativeElement);
      this.tempNode = padre;
      this.renderer.removeChild(padre, this.elmRef.nativeElement);
    } else if (this.tempNode) {
      this.renderer.appendChild(this.tempNode, this.elmRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
