import React, { useEffect, Fragment, useState } from "react";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import OnlineUser from "./OnlineUser";

const OnlineUsersWrapper = () => {
  const [onlineIndicator, setOnlineIndicator] = useState(120000);
  let onlineUsersList;
  useEffect(() => {
    // Every 30s, run a mutation to tell the backend that you're online
    console.log('=====================================================');
    console.log('useEffect: Update Last Seen')
    try {
      updateLastSeen();
    }
    catch(error){
      console.log('=====================================================');
      console.log('useEffect excute mutation')
      console.error(error)
    }

    //setOnlineIndicator(setInterval(() => updateLastSeen(), 60000));

    return () => {
      // Clean up
      console.log('CLEANUP useEffect');
      clearInterval(onlineIndicator);
    };
  }, []);

  const UPDATE_LASTSEEN_MUTATION = gql`
   mutation updateLastSeen($now: timestamptz!) {
     update_users(where: {}, _set: { last_seen: $now }) {
        affected_rows
      }
    }
  `;

  const [updateLastSeenMutation] = useMutation(UPDATE_LASTSEEN_MUTATION);
  const updateLastSeen = () => {
    // Use the apollo client to run a mutation to update the last_seen value
    updateLastSeenMutation({
      variables: { now: new Date().toISOString() }
    });
  };

  const { loading, error, data } = useSubscription(
    gql`
      subscription getOnlineUsers {
        online_users(order_by: { user: { name: asc } }) {
          id
          user {
            name
          }
        }
      }
    `
  );

  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    console.error(error);
    return <span>Error!</span>;
  }
  if (data) {
    onlineUsersList = data.online_users.map(u => (
      <OnlineUser key={u.id} user={u.user} />
    ));
  }

  return (
    <div className="onlineUsersWrapper">
      <Fragment>
        <div className="sliderHeader">
          Online users - {onlineUsersList.length}
        </div>
        {onlineUsersList}
      </Fragment>
    </div>
  );
};

export default OnlineUsersWrapper;
