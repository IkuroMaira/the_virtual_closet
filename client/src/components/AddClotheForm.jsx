import React, {createContext, useEffect} from "react";

function AddClotheForm() {
    /**
     * @typedef {Object} Clothe
     * @property {string} name
     * @property {string} category
     */

    const ClothesContext = createContext({
        clothes: [],
        fetchClothes: () => {}
    })

    useEffect(() => {
        fetchClothes()
    }, []);

    function AddClothe() {
        const [clotheName, setClotheName] = React.useState("") // Cette constante va servir à contenir la valeur du formulaire: état côté Client/front
        const [clotheCategory, setClotheCategory] = React.useState("")
        const [clothes, fetchClothes] = React.useContext(ClothesContext)
    }

    return (
        <>
            <h3>En dessous il y aura des champs</h3>
            <div>
                <label>Nom du vêtement</label>
                <input type="text" id="clothe-form" name="Name" />
                <label>Catégorie</label>
                <input type="text" id="clothe-form" name="Name" />
            </div>
        </>
    )
}

export default AddClotheForm