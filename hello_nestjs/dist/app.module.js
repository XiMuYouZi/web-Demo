"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const cats_module_1 = require("./cats/cats.module");
const logger_middleware_1 = require("./cats/logger.middleware");
const cats_controller_1 = require("./cats/cats.controller");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const casl_module_1 = require("./casl/casl.module");
const article_module_1 = require("./article/article.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.logger)
            .forRoutes(cats_controller_1.CatsController);
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .exclude({ path: 'cats', method: common_1.RequestMethod.GET }, { path: 'cats', method: common_1.RequestMethod.POST }, 'cats/(.*)')
            .forRoutes(cats_controller_1.CatsController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cats_module_1.CatsModule,
            user_module_1.UsersModule,
            auth_module_1.AuthModule,
            casl_module_1.CaslModule,
            article_module_1.ArticleModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map