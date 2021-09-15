import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetUpHandler = async(enteredMeetupData) => {
        try {
            let response = await fetch('/api/new-meetup', {
                method:'POST',
                body:  JSON.stringify(enteredMeetupData),
                headers: {'Content-Type':'application/json'}
            });
            if(!response.ok) {
                throw Error('Something went wrong')
            }
            let data = await response.json();
            console.log(data);
            router.push('/');
        } catch(e) {
            alert(e)
        }
    

    }
    return <NewMeetupForm onAddMeetup = {addMeetUpHandler}/>
}




export default NewMeetupPage