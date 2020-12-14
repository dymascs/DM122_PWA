import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

let db;

export default class CarService {
    constructor() {
        this.initializeDB();
    }

    initializeDB() {
        db = new Dexie("carDB");

        db.version(1).stores({
        tasks: "++id,car,price,year,done",
        });

        db.on("populate", async () => {
        await db.tasks.bulkPut([
            { car: "GOLZÃO AP 3,5kg",price:"100000",year:"1990",done:false },
            { car: "Rilux de engenheiro",price:"100000",year:"2020",done:false },
            { car: "chevetão",price:"7000",year:"1988" ,done:false}

        ]);
        });

        db.open();
    }

    getAll() {
        return db.tasks.toArray();
    }

    get(id) {
        return db.tasks.get(id);
    }

    save(task) {
        return db.tasks.put(task);
    }

    delete(id) {
        return db.tasks.delete(id);
    }
}