import { Fragment } from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';


const HomePage = ({meetups}) => {
    return (
        <Fragment>
        <Head>
            <meta name='viewport' charset='utf-8' content='width=device-width' initialScale='1.0'/>
            <meta name ='description' content='Browse a Huge Selection of Meetups!'/>
            <title> React Meetups </title>
        </Head>
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