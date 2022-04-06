"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const cats_module_1 = require("./cats/cats.module");
const logger_middleware_1 = require("./cats/logger.middleware");
const cats_controller_1 = require("./cats/cats.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const typeorm_2 = require("typeorm");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
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
            typeorm_1.TypeOrmModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map