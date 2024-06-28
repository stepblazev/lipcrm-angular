import { BaseModel } from 'src/app/core/base-model';
import { INewsCreatorProps, NewsCreator } from './creator';

export interface INewsProps {
  id: number;
  title: string;
  content: string;
  created_at: string;
  creator: INewsCreatorProps;
}

export class NewsModel extends BaseModel {
  public title: string;
  public content: string;
  public created_at: Date;
  public creator: NewsCreator;

  constructor(props: INewsProps) {
    super(props.id);

    this.title = props.title;
    this.content = props.content;
    this.created_at = new Date(props.created_at);
    this.creator = new NewsCreator(props.creator);
  }

  public getFormattedDate(): string {
    return this.created_at.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
}