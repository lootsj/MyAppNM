import { NgModule, Inject } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
// i18n support
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './containers/home/home.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { MyAppComponent } from './containers/myapp/myapp.component';
import { LinkService } from './shared/link.service';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine/tokens';
//PrimeNg
import {
  DropdownModule, DialogModule, DataGridModule, PanelModule
} from 'primeng/primeng';
import { DataViewModule } from 'primeng/dataview';
import { StockService } from './shared/stock.service';
export function createTranslateLoader(http: HttpClient, baseHref) {
    // Temporary Azure hack
    if (baseHref === null && typeof window !== 'undefined') {
        baseHref = window.location.origin;
    }
    // i18n files are in `wwwroot/assets/`
    return new TranslateHttpLoader(http, `${baseHref}/assets/i18n/`, '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        NotFoundComponent,
      MyAppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({
          appId: 'my-app-id' // make sure this matches with your Server NgModule
        }),
        HttpClientModule,
        TransferHttpCacheModule,
        BrowserTransferStateModule,
      DropdownModule,
      DataViewModule,
      DataGridModule,
      PanelModule,
      DialogModule,
      FormsModule,
      HttpModule,
        // App Routing
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient, [ORIGIN_URL]]
        }
      }),
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home', component: HomeComponent,

                // *** SEO Magic ***
                // We're using "data" in our Routes to pass in our <title> <meta> <link> tag information
                // Note: This is only happening for ROOT level Routes, you'd have to add some additional logic if you wanted this for Child level routing
                // When you change Routes it will automatically append these to your document for you on the Server-side
                //  - check out app.component.ts to see how it's doing this
                data: {
                    title: 'Homepage',
                    meta: [{ name: 'description', content: 'This is an example Description Meta tag!' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/blah/nice' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/' }
                    ]
                }
            },
          {
            path: 'myapp', component: MyAppComponent,
            data: {
              title: 'MyApp demo!!',
              meta: [{ name: 'description', content: 'This is a Description Page!' }],
              links: [
                { rel: 'canonical', href: 'http://blogs.example.com/bootstrap/something' },
                { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/bootstrap-demo' }
              ]
            }
          },


            {
                path: '**', component: NotFoundComponent,
                data: {
                    title: '404 - Not found',
                    meta: [{ name: 'description', content: '404 - Error' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/bootstrap/something' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/bootstrap-demo' }
                    ]
                }
            }
        ], {
          // Router options
          useHash: false,
            //preloadingStrategy: PreloadAllModules,
          initialNavigation: 'enabled'
        })
    ],
    providers: [
        LinkService,
      StockService
    ],
    bootstrap: [AppComponent]
})
export class AppModuleShared {
}
