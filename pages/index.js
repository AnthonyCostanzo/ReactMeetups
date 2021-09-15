import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';
const Dummy_Meetups = [
    {
        id:'m1',
        title:'First Meetup',
        image:'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1600&h=800&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F02%2Feiffel-tower-paris-france-EIFFEL0217.jpg',
        address:'123 eiffel ave,Paris',
        description:'This is the first meetup'
    },
    {
        id:'m2',
        title:'Second Meetup',
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg',
        address:'123 wanders ave,NY',
        description:'This is the second meetup'
    }
    
    
]


const HomePage = ({meetups}) => {
    return (
        <Fragment>
        <MeetupList meetups={meetups}/>
        </Fragment>
    )
}

export async function getStaticProps(){
    const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vncnm.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    let meetups = await meetupsCollection.find({}).toArray();
    client.close();
    return {    
        props: {
            meetups:meetups.map(meetup => ({
                id:meetup._id.toString(),
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                description:meetup.description
            }
                ))
        },
        // this allows us to regenerate page so that we dont have outdated data
        revalidate: 10
    } 
}



export default HomePage;