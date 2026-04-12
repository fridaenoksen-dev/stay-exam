// Dastan Salah Hawrami//


import { hentAllRoom, oppdaterRoom, opprettRoom, slettRoom} from "./request";

// GET//


hentAllRoom().then(data=> {
    console.log("READ - Alle room:" , data);
    
});


//POST//


opprettRoom({
    name: "suiterom",
    description: "Perfekt til et bryllup",
    pricePrNight: 6000,
    maxGuests: 2 ,
    innsjekk: "28-09-1984",
    utsjekk: "01-10-1984"
}).then(data => {
    console.log("Lage - opprett nytt rom", data);
    
});


//PUT//

oppdaterRoom(1, {
    name: "Dobbeltrom med sjøutsikt",
    description: "Nylig oppusset rom med utsikt",
    pricePrNight: 2400,
    maxGuests: 3,
    innsjekk: "28-09-1984",
    utsjekk: "01-10-1984"
}).then(data => {
    console.log("oppdatering - oppdatert rom:" , data);
    
});

//DELETE//

slettRoom(2).then(() => {
    console.log("slettet- Rommet er med ID:2 er slettet");
    
});