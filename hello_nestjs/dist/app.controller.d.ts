import { AppService } from './app.service';
import { Request } from 'express';
import { CreateCatDto } from "./cats/dto/dto";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(request: Request): string;
    create(): Object;
    findAll(): string;
    getDocs(version: any, sd: any): {
        url: string;
    };
    testPromise(): Promise<number[]>;
    CreateCatDto(createCatDto: CreateCatDto): string;
}
