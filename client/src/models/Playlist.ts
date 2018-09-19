import { Category } from "./Category";
import { User } from './User';
import { Song } from'./Song';

export class Playlist{
    public id=0;
    public name='';
    public bucketKey='';
    public category={};
    public owner={};
    public songs: Song[]=[];

    public constructor(id: number, name: string, bucketKey: string, category: Category, 
    owner: User, songs: Song[]){
        id && (this.id=id);
        name&& (this.name=name);
        bucketKey && (this.bucketKey=bucketKey);
        category && (this.category=category);
        owner && (this.owner=owner);
        songs && (this.songs=songs);
    }
}