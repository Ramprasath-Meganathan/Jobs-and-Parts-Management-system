import { Type } from 'class-transformer';

export class Job {

    // @Type(() => RecipeSection)
    // public relatedRecipes: RecipeSection;
    constructor(public jobName: string,
                public partId: number,
                public qty: number) {
    }
}
