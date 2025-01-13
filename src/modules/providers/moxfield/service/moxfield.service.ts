import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MoxfieldService {
    constructor(
        private readonly httpService: HttpService,
    ) { }
}