import { Directive, effect, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from 'app/auth/auth.model';
import { AuthService } from 'app/auth/auth.service';

// #THIS IS AN STRUCTURAL DIRECTIVE:
// allows conditional content rendering based on commonly reused conditions, such as auth
@Directive({
  selector: '[appAuth]',
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' }); // simply component use with alias

  constructor(
    private             auth: AuthService, // inject() Services into Directives as well
    private      templateRef: TemplateRef<HTMLElement>, // references the rendered element
    private viewContainerRef: ViewContainerRef // references the location of where the content is
  ) {
    effect(() => {
      // console.log(this.auth.permission());
      if (this.userType() === this.auth.permission()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
