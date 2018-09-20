export class Category{
    public id=0;
    public categoryName='';

<<<<<<< HEAD
    public constructor(id: number, categoryName: string){
=======
    public constructor(id?: number, categoryName?: string){
>>>>>>> aa52a565b75ccbf083d7e01fbda172237b4c281f
        id && (this.id=id);
        categoryName && (this.categoryName=categoryName);
    }
}