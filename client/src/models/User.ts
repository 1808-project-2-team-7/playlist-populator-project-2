export class User {
    public id=0;
    public username='';
    public password='';
    public firstName='';
    public lastName='';
    public email='';
    public bucketKey='';

    public constructor(id?: number, username?: string, password?: string, firstName?: string, 
    lastName?: string, email?: string, bucketKey?: string){
        id && (this.id=id);
        username && (this.username=username);
        password && (this.password=password);
        firstName && (this.firstName=firstName);
        lastName && (this.lastName=lastName);
        email && (this.email=email);
        bucketKey && (this.bucketKey=bucketKey);
    }
}