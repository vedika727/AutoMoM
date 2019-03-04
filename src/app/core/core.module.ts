import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpService } from './services/http/http-service';
import { AuthService } from './services/authentication/auth';
import { AuthGuard } from './guards/authGuard.guard';


@NgModule({
    declarations: [],
    exports: [
    ],
    providers: [
        HttpService,
        AuthService,
        AuthGuard
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        console.log('Core module constructor');
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
