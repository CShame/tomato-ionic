import { NgModule } from '@angular/core';
import { PipesModule } from '@pipes/pipes.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { DebounceClickDirective } from '@directives/debounce-click.directive';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    PipesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [DebounceClickDirective],
  providers: [], // better be empty!
  exports: [PipesModule, TranslateModule, DebounceClickDirective],
})
export class SharedModule {}
