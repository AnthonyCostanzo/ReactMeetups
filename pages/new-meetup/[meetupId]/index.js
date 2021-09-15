import MeetupDetail from "../../../components/meetups/MeetupDetail";
import {useRouter} from 'next/router';
import { Fragment, useEffect } from "react";
import { route } from "next/dist/next-server/server/router";
import { useState } from "react";
import {MongoClient,ObjectId} from 'mongodb'
import Head from 'next/head';

const MeetupDetails = ({meetupData}) => {
    return (

        <Fragment>
          <Head>
            <title>{meetupData.title}</title>
            <meta name='description' content={meetupData.description}/>
          </Head>
          <MeetupDetail 
          image = {meetupData.image} 
          title = {meetupData.title} 
          address = {meetupData.address}
          description = {meetupData.description}/>
        </Fragment>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vncnm.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find({},{_id:1}).toArray();
    return {
        fallback: true,
        paths: meetups.map(meetup => ({params: {
            meetupId:meetup._id.toString()
        }
    })
    )
    }
}
export async function getStaticProps(context) {
    // fetch data for a single meetup
  
    const meetupId = context.params.meetupId;
  
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vncnm.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();
  
    const meetupsCollection = db.collection('meetups');
  
    const selectedMeetup = await meetupsCollection.findOne({
      _id: ObjectId(meetupId),
    });
  
    client.close();
  
    return {
      props: {
        meetupData: {
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          address: selectedMeetup.address,
          image: selectedMeetup.image,
          description: selectedMeetup.description,
        },
      },
    };
  }

export default MeetupDetails;