import { Part } from './part.model';

export class JobShort {

    constructor(public jobName: string,
                public parts: Part[]) {
    }
}
