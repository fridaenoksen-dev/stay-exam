import { hentAllRoom, oppdaterRoom, opprettRoom} from "./request";

// GET//
hentAllRoom().then(data=> {
    console.log("READ - Alle room:" , data);
    
});

//POST//
opprettRoom({
    name: "suiterom",
    description: "Perfekt til et bryllup",
    pricePrNight: 6000,
    maxGuests: 5
}).then(data => {
    console.log("Lage - nytt rom", data);
    
});


//PUT//

oppdaterRoom(1, {
    name: "Dobbeltrom med sjøutsikt",
    description: "Nylig oppusset rom med utsikt",
    pricePrNight: 2400,
    maxGuests: 3
}).then(data => {
    console.log("oppdatering - oppdatert rom:" , data);
    
});