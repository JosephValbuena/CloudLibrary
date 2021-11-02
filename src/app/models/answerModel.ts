export interface OracleI {
    items:   ItemI[];
    hasMore: boolean;
    limit:   number;
    offset:  number;
    count:   number;
    links:   LinkI[];
}

export interface ItemI {
    id:          number;
    name:        string;
    description: string;
    author:      string;
    year:        number;
    cost:        number;
    image:       string;
}

export interface LinkI {
    rel:  string;
    href: string;
}

export class Oracle implements OracleI{
    items: any[];
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
    links: any[];

    constructor(){
        this.items = [];
        this.hasMore = true;
        this.limit = 0;
        this.offset = 0;
        this.count = 0;
        this.links = [];
    }

}

export class Item implements ItemI{
    id: number;
    name: string;
    description: string;
    author: string;
    year: number;
    cost: number;
    image: string;

    constructor(){
        this.id = 0;
        this.name = "";
        this.description = "";
        this.author = "";
        this.year = 0;
        this.cost = 0;
        this.image = "";
    }
    
}

