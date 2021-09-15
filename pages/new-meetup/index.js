import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';
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
    return  (
    <Fragment>
    <Head>
    <title>Add A Meetup</title>
    <meta name='description' content='Add a new meetup and create amazing networking opportunities'/>
    </Head>
    <NewMeetupForm onAddMeetup = {addMeetUpHandler}/>
    </Fragment>
    )
}




export default NewMeetupPage