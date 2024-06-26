import { BaseModel } from "src/app/core/base-model";

export interface INewsProps {
    id: number;
    title: string;
    content: string;
    created_by: number;
    created_at: string;
}

export class NewsModel extends BaseModel {
    public title: string;
    public content: string;
    public created_by: number;
    public created_at: Date;
        
    constructor(props: INewsProps) {
        super(props.id);
        
        this.title = props.title;
        this.content = props.title;
        this.created_by = props.created_by;
        this.created_at = new Date(props.created_at);
    }
}