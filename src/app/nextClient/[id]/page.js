'use client';
import { DeleteConfirmation } from "@/components/card/DeleteConfirmation";
import { FormCard } from "@/components/card/FormCard";
import { InformationNotification } from "@/components/card/InformationNotification";
import { SuccessNotification } from "@/components/card/SuccessNotification";
import { GetCardItem, DeleteCardItem, UpdateCardItem } from "@/services/nextcard";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
   
export default function Home() {
    const {id} = useParams();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    
    const [open, setOpen] = useState(false);
    const [openInformation, setOpenInformation] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);


    const [informationMessage, setInformationMessage] = useState('')

    const handleDeleteClick = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const handleUpdateClick = (e) => {
        e.preventDefault();

        if (title === "" || description === "") {
            setOpenInformation(true);
            setInformationMessage('Please fill the description and title');
            return;
        }

        setLoading(true);
        setOpenInformation(false);
        updateAction();

    }

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

    const closeOpenSuccess = () => {
        setOpenSuccess(false);
    }


    const deleteAction = () => {
        DeleteCardItem(id).then((response) => {
            if (response.status != 200) {
                setOpenInformation(true);
                setInformationMessage('Error with API server communication');
                setOpen(false);
                return;
            }else{
                router.push('/nextClient');
            }
        });
    }

    const updateAction = () => {  
        UpdateCardItem(id, title, description).then((response) => {
            if (response.status != 200) {
                setOpenInformation(true);
                setInformationMessage('Error with API server communication');
                return;
            }else{
                setOpenSuccess(true);
                setLoading(false);
            }
        });  
    }


    useEffect(() => {

        GetCardItem(id).then((response) => {
            if (response.status == 404 || response.status == 422) {
                router.push('/404');
            }
            setTitle(response.title);
            setDescription(response.description);
            setLoading(false);
        });


    }, [id, router])
    
  return (
    <div className="bg-white text-black flex flex-col min-h-screen w-full p-10 justify-center items-center">

        <DeleteConfirmation 
            title={title} 
            description={description} 
            open={open}
            closeConfirmation={closeConfirmation}
            deleteAction={deleteAction}
        />

        <InformationNotification 
            message={informationMessage}
            open={openInformation} 
            closeConfirmation={closeInformation}   
        />

        <SuccessNotification
            message='Card updated'
            open={openSuccess}
            closeConfirmation={closeOpenSuccess}
        /> 

        <h2 className="mb-3 text-2xl font-semibold">
            Edit yout Card ({title}) Information  
        </h2>

        <FormCard
            title={title}
            description={description}

            updateTitle={updateTitle}
            updateDescription={updateDescription}

            loading={loading}
            isCreating={false}

            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
        />
   
    </div>
  );
}
