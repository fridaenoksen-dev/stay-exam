//Dastan Salah Hawrami//


export type room = {
    id: number;
    name: string;
    description: string;
    price: number;
    capacity: number;
}

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

// Dette er PUT //


 export async function opprettRoom(nyttRom: room): Promise<room[]> {
    try {  
    const respons = await fetch(api,{
      method: "POST",
      headers: {
         "authorization": "Bearer mittPassord123",
         "content-Type":"application/json",
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


 export async function oppdaterRoom(id: number, oppdaterRoom: room): Promise<room[]> {
    try {  
    const respons = await fetch(`${api}/${id}`,{
      method: "PUT",
      headers: {
         "authorization": "Bearer mittPassord123",
         "content-Type":"application/json",
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