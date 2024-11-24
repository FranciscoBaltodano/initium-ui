
export const GetCard = async() => {
    // cada ves que llame este endpoint
    // next va a identificar que estoy llamando un nuevo endpoint
    // para que siempre me llame el endpoint y no me traiga la data del cache
    const response = await fetch(`http://127.0.0.1:8000/cards?cache-bust=${new Date().getTime()}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            }
        }
    );

    if (!response.ok) {
        throw new Error('NO SE PUDO HACER EL FETCH')
    }
    
    const data = await response.json();
    return data
}



export const GetCardItem = async(id) => {
    const response = await fetch(`http://127.0.0.1:8000/cards/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            }
        }
    );

    if (!response.ok) 
        return response;
    else 
        return response.json();

}

export const DeleteCardItem = async(id) => {
    const response = await fetch(`http://127.0.0.1:8000/cards/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            }
        }
    );

    if (!response.ok) 
        return response;
    else 
        return response.json();

}

export const UpdateCardItem = async(id, title, description) => {
    const response = await fetch(`http://127.0.0.1:8000/cards/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify({title, description}),
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            }
        }
    );

    if (!response.ok) 
        return response;
    else 
        return response.json();

}

export const CreateCardItem = async(title, description) => {
    const response = await fetch(`http://127.0.0.1:8000/cards`,
        {
            method: 'POST',
            body: JSON.stringify({title, description}),
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            }
        }
    );

    if (!response.ok) 
        return response;
    else 
        return response.json();

}

