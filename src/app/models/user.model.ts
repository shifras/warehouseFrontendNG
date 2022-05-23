export class User{

    constructor (
        public username:string,
        public password:string,
        public expiresIn?:number,
    ){
         this.resetTimer();

    }

    //tikrina are jau yra pasibaiges sesijos laikas
    public isExpired():boolean{
        return this.expiresIn < new Date().getTime();
    }

    public resetTimer(){
         //duoda milisekundemis. galioja viena valanda
        this.expiresIn=new Date().getTime()+60*60*1000;
    }
}