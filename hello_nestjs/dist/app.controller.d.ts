import { AppService } from "./app.service";
import { CreateCatDto } from "./cats/dto/dto";
import { AuthService } from "./auth/auth.service";
declare enum UserRole {
    Admin = "Admin",
    Moderator = "Moderator",
    User = "User"
}
export declare class AppController {
    private readonly appService;
    private readonly authService;
    constructor(appService: AppService, authService: AuthService);
    swiggerApiQuery(role?: UserRole): Promise<void>;
    swiggerApiBody(coords: number[][]): Promise<void>;
    getProfile(req: any): any;
    loginJwt(req: any): Promise<{
        access_token: string;
    }>;
    login(req: any): Promise<any>;
    getHello(request: Request): string;
    create(): Object;
    findAll(): string;
    getDocs(version: any, sd: any): {
        url: string;
    };
    findOne(params: any): string;
    testPromise(): Promise<number[]>;
    CreateCatDto(createCatDto: CreateCatDto): string;
}
export {};
