import { Category } from "./Category";
import { User } from './User';
import { Song } from'./Song';

export class Playlist{
    public id=0;
    public name='';
    public bucketKey='';
<<<<<<< HEAD
    public category={};
    public owner={};
    public songs: Song[]=[];

    public constructor(id: number, name: string, bucketKey: string, category: Category, 
    owner: User, songs: Song[]){
=======
    public category:Category=new Category();
    public owner:User=new User();
    public songs: Song[]=[];

    public constructor(id?: number, name?: string, bucketKey?: string, category?: Category, 
    owner?: User, songs?: Song[]){
>>>>>>> aa52a565b75ccbf083d7e01fbda172237b4c281f
        id && (this.id=id);
        name&& (this.name=name);
        bucketKey && (this.bucketKey=bucketKey);
        category && (this.category=category);
        owner && (this.owner=owner);
        songs && (this.songs=songs);
    }
}