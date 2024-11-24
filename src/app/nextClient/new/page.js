'use client';
import { FormCard } from "@/components/card/FormCard";
import { InformationNotification } from "@/components/card/InformationNotification";
import { GetCardItem, DeleteCardItem, CreateCardItem } from "@/services/nextcard";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
   
export default function CardCreateItem() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const [openInformation, setOpenInformation] = useState(false);
    const [informationMessage, setInformationMessage] = useState('')
    const [loading, setLoading] = useState(false);
    

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateDescription = (e) => {
        setDescription(e.target.value);
    }


    const closeConfirmation = () => {
        setOpen(false);
    }

    const closeInformation = () => {
        setOpenInformation(false);
    }

    const createAction = () => {  
        CreateCardItem(title, description).then((response) => {
            if (response.status != 200) {
                setOpenInformation(true);
                setInformationMessage('Error with API server communication');
                return;
            }else{
                router.push('/nextClient');
                setLoading(false);
            }
        });  
    }

    const handleCreateClick = (e) => {
        e.preventDefault();

        if (title === "" || description === "") {
            setOpenInformation(true);
            setInformationMessage('Please fill the description and title');
            return;
        }

        setLoading(true);
        setOpenInformation(false);
        createAction();

    }

  return (
    <div className="bg-white text-black flex flex-col min-h-screen w-full p-10 justify-center items-center">

         <InformationNotification 
            message={informationMessage} 
            open={openInformation} 
            closeConfirmation={closeInformation}   
        />

        <h2 className="mb-3 text-2xl font-semibold">
            Create a new card
        </h2>

        <FormCard
            title={title}
            description={description}
            updateTitle={updateTitle}
            updateDescription={updateDescription}

            handleCreateClick={handleCreateClick}
            loading={loading}
            isCreating={true}
        />
   
    </div>
  );
} 