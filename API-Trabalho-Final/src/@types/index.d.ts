declare namespace Express{
    export interface Request{
        client: {
            id: string;
        }
        user: {
            id: string;
        }
    }
}