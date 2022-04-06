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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const dto_1 = require("./cats/dto/dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello(request) {
        return this.appService.getHello();
    }
    create() {
        return { ssss: 123, sfsf: 'sfsdfdsf', fdfd: [1, 2, 3, 4] };
    }
    findAll() {
        return 'This action returns all cats';
    }
    getDocs(version, sd) {
        console.log(version);
        if (version == 5) {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }
    findOne(params) {
        return `This action returns a #${JSON.stringify(params)} cat`;
    }
    async testPromise() {
        throw new common_1.ForbiddenException();
        return [1, 2, 3, 4];
    }
    CreateCatDto(createCatDto) {
        console.log(createCatDto);
        return 'This action adds a new cat';
    }
};
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('a*bc'),
    (0, common_1.HttpCode)(205),
    (0, common_1.Header)('Cache-Control', 'none'),
    (0, common_1.Redirect)('https://nestjs.com'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('docs'),
    (0, common_1.Redirect)('https://www.baidu.com', 302),
    __param(0, (0, common_1.Query)('version')),
    __param(1, (0, common_1.Body)("sdsd")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getDocs", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('promise'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testPromise", null);
__decorate([
    (0, common_1.Post)('CreateCatDto'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCatDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "CreateCatDto", null);
AppController = __decorate([
    (0, common_1.Controller)('/customers'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map