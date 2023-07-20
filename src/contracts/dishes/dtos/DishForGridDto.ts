export class DishForGridDto {
    id: number;
    name: string;
    numberOfPersons: number;
    dishPhotoGuid?: string;

    constructor(id: number, name: string, numberOfPerson: number, dishPhotoGuid?: string) {
        this.id = id;
        this.name = name;
        this.numberOfPersons = numberOfPerson;
        this.dishPhotoGuid = dishPhotoGuid;
    }
}