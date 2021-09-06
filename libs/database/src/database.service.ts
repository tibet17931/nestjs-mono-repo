import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {

    getHelloDatabase() {
        return "Hello Database";
    }
}
