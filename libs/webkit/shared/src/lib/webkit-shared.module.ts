import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EngularCoreServicesModule, MessageService } from '@engular/core-services';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { ClickFromKeyboardWebkitDirective } from './directives/click-from-keyboard-webkit.directive';
import { EafMessageService } from './services/eaf-message.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    EngularCoreServicesModule,
    ToastrModule.forRoot({
      preventDuplicates: false,
      resetTimeoutOnDuplicate: false,
      timeOut: 3000,
      onActivateTick: true,
      enableHtml: true,
    }),
  ],
  exports: [TranslateModule, EngularCoreServicesModule, ClickFromKeyboardWebkitDirective],
  providers: [{ provide: MessageService, useExisting: EafMessageService }],
  declarations: [ClickFromKeyboardWebkitDirective],
})
export class WebkitSharedModule {}
