import { ref, set, push, update, remove, get, query, orderByChild } from 'firebase/database';
import { dataBaseRealTime } from '../firebaseConfig';

// CREATE
export const createItem = async(obj) => {
    const itemsRef = ref(dataBaseRealTime, 'categorias');
    const newItemRef = push(itemsRef);
    await set(newItemRef, obj);
    return newItemRef.key;
}

// UPDATE
export const updateItem = async (id, obj) => {
    const itemRef = ref(dataBaseRealTime, `categorias/${id}`);
    await update(itemRef, obj);
}

// READ
export const getItems= async ()  => {
    const itemsRef = ref(dataBaseRealTime, 'categorias');
    const snapshot = await get(query(itemsRef));
    const items = [];
    snapshot.forEach(childSnapshot => {
        items.push({ ...childSnapshot.val(), id: childSnapshot.key });
    });
    return items;
}

// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
export const getItemsByCondition = async (value) => {
    const itemsRef = ref(dataBaseRealTime, 'categorias');
    const snapshot = await get(query(itemsRef, orderByChild('age').equalTo(value)));
    const items = [];
    snapshot.forEach(childSnapshot => {
        items.push({ ...childSnapshot.val(), id: childSnapshot.key });
    });
    return items;
}

export const getItemById = async (id) => {
    const itemRef = ref(dataBaseRealTime, `categorias/${id}`);
    const snapshot = await get(itemRef);
    return { ...snapshot.val(), id: snapshot.key };
}

// DELETE
export const deleteItem = async (id) => {
    const itemRef = ref(dataBaseRealTime, `categorias/${id}`);
    await remove(itemRef);
}
