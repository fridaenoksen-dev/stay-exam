//Dastan Salah Hawrami//

// Jeg lar denne stå for å frostår hva henter og oppdaterer 
/*
export type room = {
    id: number;
    name: string;
    description: string;
    pricePrNight: number;
    maxGuests: number;
    innsjekk?: string;
    utsjekk?: string;
}
    */

import type { room } from "./type";


const api = "http://localhost:3000/api/rooms"

// GET//

 export async function hentAllRoom(): Promise<room[]> {
    try {  
    const respons = await fetch(api,{
      method: "GET",
    });
   
    if( respons.ok){
        const data: room[] = await respons.json();
     return data;
     } else {
        throw new Error (`Noe gikk galt: ${respons.status}`);

     }     
        
    }catch(feil){
        console.log("kunne ikke hente room:", feil);
        throw feil;
        
}
}

// GET. hente et bestemt rom//

 export async function hentEtRoom(id: number): Promise<room> {
    try {  
    const respons = await fetch(`${api}/${id}`, {
      method: "GET",
    });
   
    if( respons.ok){
        const data: room = await respons.json();
     return data;
     } else {
        throw new Error (`Noe gikk galt: ${respons.status}`);

     }     
        
    }catch(feil){
        console.log("kunne ikke hente ett room:", feil);
        throw feil;
        
}
}

// Dette er POST //


 export async function opprettRoom(nyttRom: Partial<room>): Promise<room[]> {
    try {  
    const respons = await fetch(api,{
      method: "POST",
      headers: {
         "authorization": "Bearer mittPassord123",
         "Content-Type":"application/json",
      },
      body: JSON.stringify(nyttRom)
    });
   
    if( respons.ok){
        const data: room[] = await respons.json();
        return data;
     } else {
        throw new Error (`Noe gikk galt: ${respons.status}`);

     }     
        
    }catch(feil){
        console.log("kunne ikke lage rom:", feil);
        throw feil;
        
}
}

// PUT - oppdatere et rom //


 export async function oppdaterRoom(id: number, oppdaterRoom: Partial<room>): Promise<room[]> {
    try {  
    const respons = await fetch(`${api}/${id}`,{
      method: "PUT",
      headers: {
         "authorization": "Bearer mittPassord123",
         "Content-Type":"application/json",
      },
      body: JSON.stringify(oppdaterRoom)
    });
   
    if( respons.ok){
        const data: room[] = await respons.json();
        return data;
     } else {
        throw new Error (`Noe gikk galt: ${respons.status}`);

     }     
        
    }catch(feil){
        console.log("kunne ikke oppdatere rom:", feil);
        throw feil;
        
}
}

// Delete - slette et rom //


 export async function slettRoom(id: number): Promise<void> {
    try {  
    const respons = await fetch(`${api}/${id}`,{
      method: "DELETE",
      headers: {
         "authorization": "Bearer mittPassord123",
         "Content-Type":"application/json",
      }
    });
   
    if( respons.ok){
      console.log (`rom med ID ${id} er slettet`);
      
        return;
     } else {
        throw new Error (`Noe gikk galt: ${respons.status}`);

     }     
        
    }catch(feil){
        console.log("kunne ikke slette rom:", feil);
        throw feil;
        
}
}