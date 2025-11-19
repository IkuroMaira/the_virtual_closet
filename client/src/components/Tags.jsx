import {createContext, useEffect, useState} from "react";
const API_BASE_URL = '/api'

const TagsContext = createContext({
    tags: [],
    fetchTags: () => {}
});

export { TagsContext };

export default function Tags() {
    const [tags, setTags] = useState([]);

     const fetchTags = async () => {
         try {
             const response = await fetch(API_BASE_URL + '/tags/');

             if (!response.ok) {
                 throw new Error(`Error HTTP! Status: ${response.status}`);
             }

             const data = await response.json();
             console.log("Les tags sont récupérer", data);

             setTags(data.tags || [])
         } catch (error) {
             console.error("Erreur lors de la récupération des tags", error);
             setTags([])
         }
     }

    useEffect(() => {
        fetchTags();
    }, []);

     return (
         <TagsContext.Provider value={{ tags, fetchTags }}>
             <h2>Est-ce qu'il y a des tags en base de données ?</h2>
             {tags.length === 0 ? (
                 <p>Aucun tags pour le moment.</p>
             ) : (
                 <p>Il y a des tags !</p>
             )}
         </TagsContext.Provider>
     )
}