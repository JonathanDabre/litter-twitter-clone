import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {toast} from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";



const EditModal = () => {

    const { data: currentUser} = useCurrentUser();

    const {mutate: mutateFetchedUser} = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    useEffect(()=>{
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    }, [currentUser])

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async ()=>{
        console.log("0")
        try {
            console.log("00")
            setIsLoading(true);
            console.log("000")

            await axios.patch('/api/edit', {
                name, 
                username,
                bio,
                profileImage,
                coverImage
            });

            console.log("1")

            mutateFetchedUser();
            console.log("2")

            toast.success("Updated Successfully")

            console.log("3")
            editModal.onClose();

        } catch (error) {
            toast.error('Something went wrong');
            console.log(error)
        }
        finally{
            setIsLoading(false);
        }
    }, [name, username, profileImage, coverImage, bio, editModal, mutateFetchedUser])


    const bodyContent =(
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Name" 
                onChange={(e)=> setName(e.target.value)}
                value={name}
                disabled ={isLoading}
            />
            <Input 
                placeholder="Username" 
                onChange={(e)=> setUsername(e.target.value)}
                value={username}
                disabled ={isLoading}
            />
            <Input 
                placeholder="Bio" 
                onChange={(e)=> setBio(e.target.value)}
                value={bio}
                disabled ={isLoading}
            />
           
        </div>
    )
    
    return ( 
        <Modal 
        disabled={isLoading}
        isOpen = {editModal.isOpen}
        title="Edit your profile"
        actionLabel="Save"
        onClose={editModal.onClose}
        onSubmit={onSubmit}
        body = {bodyContent}
        />
     );
}
 
export default EditModal;