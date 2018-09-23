export class Category {
    public id = 0;
    public categoryName = '';
    public imagePath = '';

    public constructor(id?: number, categoryName?: string, imagePath?: string) {
        id && (this.id = id);
        categoryName && (this.categoryName = categoryName);
        imagePath && (this.imagePath = imagePath);
    }
}