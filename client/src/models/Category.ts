export class Category{
    public id=0;
    public categoryName='';

    public constructor(id: number, categoryName: string){
        id && (this.id=id);
        categoryName && (this.categoryName=categoryName);
    }
}