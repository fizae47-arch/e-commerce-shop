// import styles from '../../styles/style';
// import EventCard from "./EventCard.jsx"
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// // import { getAllEvents } from '../../redux/actions/event';

// const Events = () => {
//   const {allEvents,isLoading} = useSelector((state) => state.events);  

//   useEffect(() => {
//     const data = allEvents && allEvents.find((a,b) => a.sold_out - b.sold_out);
//     console.log(data)
//    }, [allEvents])
   
//   return (
//     <div>
//      {
//       !isLoading && (
//         <div className={`${styles.section}`}>
//       <div className={`${styles.heading}`}>
//         <h1>Popular Events</h1>
//       </div>

//       <div className="w-full grid">
//          {
//           allEvents.length !== 0 && (
//             <EventCard data={allEvents && allEvents[0]} />
//           )
//          }
//          <h4>{
//            allEvents?.length === 0 && (
//             'No Events have!'
//            )
//           }

//          </h4>
//       </div>
     
//     </div>
//       )
//      }
//   </div>
//   )
// }

// export default Events


import styles from '../../styles/style';
import EventCard from "./EventCard.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllEvents } from '../../redux/actions/event';

const Events = () => {
  const dispatch = useDispatch();
  const { allEvents, isLoading } = useSelector((state) => state.events);

  useEffect(() => {
  dispatch(getAllEvents());
}, [dispatch]);

console.log("allEvents:", allEvents); // ye add kar ke dekho

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allEvents && allEvents.length !== 0 ? (
              allEvents.map((event, index) => (
                <EventCard data={event} key={index} />
              ))
            ) : (
              <h4>No Events have!</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;