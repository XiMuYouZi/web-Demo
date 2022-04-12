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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const dto_1 = require("./cats/dto/dto");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth/auth.service");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user/orm/user.entity");
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "Admin";
    UserRole["Moderator"] = "Moderator";
    UserRole["User"] = "User";
})(UserRole || (UserRole = {}));
let AppController = class AppController {
    constructor(appService, authService) {
        this.appService = appService;
        this.authService = authService;
    }
    async swiggerApiQuery(role = UserRole.User) { }
    async swiggerApiBody(coords) { }
    getProfile(req) {
        return req.user;
    }
    async loginJwt(req) {
        return this.authService.login(req.user);
    }
    async login(req) {
        console.dir(req.body);
        return req.user;
    }
    getHello(request) {
        return this.appService.getHello();
    }
    create() {
        return { ssss: 123, sfsf: "sfsdfdsf", fdfd: [1, 2, 3, 4] };
    }
    findAll() {
        return "This action returns all cats";
    }
    getDocs(version, sd) {
        console.log(version);
        if (version == 5) {
            return { url: "https://docs.nestjs.com/v5/" };
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
        return "This action adds a new cat";
    }
};
__decorate([
    (0, common_1.Get)("swiggerApiQuery"),
    (0, swagger_1.ApiQuery)({ name: "role", enum: UserRole, isArray: true }),
    (0, swagger_1.ApiResponse)({
        status: 202,
        description: "The record has been successfully created222.",
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "The record has been successfully created.",
        type: user_entity_1.UserEntity,
    }),
    (0, swagger_1.ApiForbiddenResponse)({ description: "Forbidden." }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)("role")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "swiggerApiQuery", null);
__decorate([
    (0, swagger_1.ApiBody)({
        schema: {
            type: "array",
            items: {
                type: "array",
                items: {
                    type: "number",
                },
            },
        },
    }),
    (0, common_1.Get)("swiggerApiBody"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "swiggerApiBody", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Post)("profile"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("local")),
    (0, common_1.Post)("auth/loginJwt"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "loginJwt", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("local")),
    (0, common_1.Post)("auth/login"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("profile"),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("a*bc"),
    (0, common_1.HttpCode)(205),
    (0, common_1.Header)("Cache-Control", "none"),
    (0, common_1.Redirect)("https://nestjs.com"),
    openapi.ApiResponse({ status: 205, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("docs"),
    (0, common_1.Redirect)("https://www.baidu.com", 302),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)("version")),
    __param(1, (0, common_1.Body)("sdsd")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getDocs", null);
__decorate([
    (0, common_1.Get)("/:id"),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("promise"),
    openapi.ApiResponse({ status: 200, type: [Number] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testPromise", null);
__decorate([
    (0, common_1.Post)("CreateCatDto"),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCatDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "CreateCatDto", null);
AppController = __decorate([
    (0, swagger_1.ApiTags)("customers"),
    (0, common_1.Controller)("/customers"),
    (0, swagger_1.ApiHeader)({
        name: "X-MyHeader",
        description: "Custom header",
    }),
    __metadata("design:paramtypes", [app_service_1.AppService,
        auth_service_1.AuthService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map