import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import './styles.css';

export const NewPetPage = () => {

    const { register, handleSubmit } = useForm();

    const history = useHistory();

    const submitPet = async(formVals) => {
        const formattedData = {
            fields: {
                id: {
                    stringValue: formVals.id
                },
                breed: {
                    stringValue: formVals.breed
                },
                age: {
                    stringValue: formVals.age
                },
                name: {
                    stringValue: formVals.name
                },
                petType: {
                    stringValue: formVals.petType
                },
                image: {
                    stringValue: formVals.image
                },
                isAdopted: {
                    booleanValue: false
                }
            }
        }

        try {
            const response = await fetch('https://firestore.googleapis.com/v1/projects/pets-store-2/databases/(default)/documents/pets/',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(formattedData)
            });
            
            history.push('/');

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="pets-page">
            <form className="form-layout" onSubmit={handleSubmit(submitPet)}>
                <h2>Submit a new pet: </h2>
                <br />

                {/* Pet type */}
                <label htmlFor="petType"> Pet Type </label>
                <input 
                    {...register("petType")}
                    name="petType"
                    required 
                />

                {/* Pet name */}
                <label htmlFor="name"> Name </label>
                <input 
                    {...register("name")}
                    name="name"
                    required 
                    type="text"
                />

                {/* Pet breed */}
                <label htmlFor="breed"> Breed </label>
                <input 
                    {...register("breed")}
                    name="breed"
                    required 
                    type="text"
                />

                {/* Image */}
                <label htmlFor="image"> Image URL </label>
                <input 
                    {...register("image")}
                    name="image"
                    required 
                />

                {/* Age */}
                <label htmlFor="age"> Age </label>
                <input 
                    {...register("age")}
                    name="age"
                    required 
                />

                {/* ID */}
                <label htmlFor="id"> Unique ID </label>
                <input 
                    {...register("id")}
                    name="id"
                    required 
                />

                <input type="submit" value="Submit Pet" />
                <br />

            </form>
        </div>
    )
}