// import React, { useState, useEffect } from "react";
// import Schedule from "./Schedule";
// import { DatePicker, Dropdown, Menu, Button } from "antd";
// import dayjs from "dayjs";
// import axios from "axios";

// const Schedule1 = () => {
//   const [tab, setTab] = useState(0);
//   const [centres, setCentres] = useState([]); // State to hold the centres
//   const [selectedCentre, setSelectedCentre] = useState(null); // State for selected centre
//   const [sports, setSports] = useState([]); // State to hold sports for the selected centre

//   // Fetch centres from the API
//   const fetchCentres = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/centre/all`); // Replace with your API endpoint
//       setCentres(response.data); // Assuming the response contains the centres
//     } catch (error) {
//       console.error("Error fetching centres:", error);
//     }
//   };

//   // Handle centre selection
//   const handleCentreSelect = (centreId) => {
//     const selected = centres.find(centre => centre._id === centreId);
//     setSelectedCentre(selected); // Set the selected centre
//     setSports(selected.sports); // Set the sports from the selected centre
//     setTab(0); // Reset tab to the first sport by default
//   };

//   useEffect(() => {
//     fetchCentres();
//   }, []); // Fetch centres on component mount

//   // Create menu for centres dropdown
//   const centreMenu = (
//     <Menu>
//       {centres.map(centre => (
//         <Menu.Item key={centre._id} onClick={() => handleCentreSelect(centre._id)}>
//           {centre.name}
//         </Menu.Item>
//       ))}
//     </Menu>
//   );

//   // Handle tab changes for sports
//   const tabHandler = (sportIndex) => {
//     setTab(sportIndex);
//   };

//   return (
//     <div>
//       <div className="text-2xl font-bold mb-4 mt-2">Schedule</div>
//       <div className="flex mb-4">
//         <Dropdown overlay={centreMenu} trigger={['click']}>
//           <Button className="mr-2">
//             {selectedCentre ? selectedCentre.name : 'Select Centre'}
//           </Button>
//         </Dropdown>
        
//         <DatePicker
//           className="bg-zinc-200"
//           defaultValue={dayjs()}
//           format="DD MMM YYYY"
//           variant="filled"
//           allowClear={false}
//         />
        
//         <div className="ml-2 text-sm font-semibold bg-zinc-200 dark:bg-zinc-900 p-1 rounded-md text-center dark:text-white text-black">
//           {sports.map((sport, index) => (
//             <button
//               key={sport._id}
//               className={`p-1.5 rounded-md px-8 mr-1.5 ${tab === index ? "bg-white" : ""}`}
//               onClick={() => tabHandler(index)}
//             >
//               {sport.name}
//             </button>
//           ))}
//         </div>
//       </div>
//       <Schedule />
//     </div>
//   );
// };

// export default Schedule1;

import React, { useState, useEffect } from "react";
import Schedule from "./Schedule";
import { DatePicker, Dropdown, Menu, Button } from "antd";
import dayjs from "dayjs";
import axios from "axios";

const Schedule1 = () => {
  const [tab, setTab] = useState(0);
  const [centres, setCentres] = useState([]); // State to hold the centres
  const [selectedCentre, setSelectedCentre] = useState(null); // State for selected centre
  const [sports, setSports] = useState([]); // State to hold sports for the selected centre
  const [selectedDate, setSelectedDate] = useState(dayjs()); // State for selected date
  const [schedule, setSchedule] = useState(null); // State to hold the schedule

  // Fetch centres from the API
  const fetchCentres = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/centre/all`); // Replace with your API endpoint
      setCentres(response.data); // Assuming the response contains the centres
    } catch (error) {
      console.error("Error fetching centres:", error);
    }
  };

  const handleBookSlot = async (index, courtIndex, customerName, contactInfo, amountPaid) => {
    // Call your API to book the slot
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            centreId: selectedCentre._id, // The selected centre ID
            courtId : sports[tab].courts[courtIndex]._id,                       // The selected court ID
            sport: sports[tab].name,                   // The sport name
            scheduleId: sports[tab].courts[courtIndex].schedule, // Assuming each time slot has an ID
            date: selectedDate,                          // The booking date
            time: index,                  // The start time of the booking slot
            customerName,                 // Customer's name
            contactInfo,                  // Customer's contact information
            amountPaid                     // Amount paid for the booking
        }),
    });
        return response.ok; // Assuming the API returns a successful response
    } catch (error) {
        console.error('Error booking slot:', error);
        return false;
    }
};

  // Fetch schedule for the selected date and selected sport
  const fetchSchedule = async () => {
    if (!selectedCentre || !sports[tab]) return; // Ensure a centre and sport are selected
  
    const centreId = selectedCentre._id; // Get the selected centre ID
    const sportName = sports[tab].name; // Get the selected sport name
  
    try {
      const response = await axios.post(`http://localhost:5000/api/bookings/view`, {
        centreId: centreId,   // Pass the selected centre ID
        sport: sportName, // Pass the selected sport name
        date: selectedDate.toISOString(), // Use ISO string format for the date
      });
      const filteredData = response.data.bookings.filter(item => {
        const responseDate = new Date(item.date); // Convert the response date to Date object
        return (
          responseDate.getFullYear() === selectedDate.year() &&
          responseDate.getMonth() === selectedDate.month() &&
          responseDate.getDate() === selectedDate.date()
        );
      });

      setSchedule(filteredData);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  // Handle centre selection
  const handleCentreSelect = (centreId) => {
    const selected = centres.find(centre => centre._id === centreId);
    setSelectedCentre(selected); // Set the selected centre
    setSports(selected.sports); // Set the sports from the selected centre
    setTab(0); // Reset tab to the first sport by default
    setSchedule(null); // Reset schedule when a new centre is selected
  };

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date
    fetchSchedule(); // Fetch schedule for the new date
  };

  useEffect(() => {
    fetchCentres();
  }, []); // Fetch centres on component mount

  // Create menu for centres dropdown
  const centreMenu = (
    <Menu>
      {centres.map(centre => (
        <Menu.Item key={centre._id} onClick={() => handleCentreSelect(centre._id)}>
          {centre.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  // Handle tab changes for sports
  const tabHandler = (sportIndex) => {
    setTab(sportIndex);
    fetchSchedule(); // Fetch schedule when switching sports
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-4 mt-2">Schedule</div>
      <div className="flex mb-4">
        <Dropdown overlay={centreMenu} trigger={['click']}>
          <Button className="mr-2">
            {selectedCentre ? selectedCentre.name : 'Select Centre'}
          </Button>
        </Dropdown>

        <DatePicker
          className="bg-zinc-200"
          defaultValue={dayjs()}
          format="DD MMM YYYY"
          variant="filled"
          allowClear={false}
          onChange={handleDateChange} // Call handleDateChange on date change
        />

        <div className="ml-2 text-sm font-semibold bg-zinc-200 dark:bg-zinc-900 p-1 rounded-md text-center dark:text-white text-black">
          {sports.map((sport, index) => (
            <button
              key={sport._id}
              className={`p-1.5 rounded-md px-8 mr-1.5 ${tab === index ? "bg-white" : ""}`}
              onClick={() => tabHandler(index)}
            >
              {sport.name}
            </button>
          ))}
        </div>
      </div>

      {/* Render the schedule if available */}
      {schedule && (
        <div>
          <h3 className="text-xl font-bold mb-2">Schedule for {selectedDate.format("DD MMM YYYY")}</h3>
          <ul>
            {schedule.map((slot, index) => (
              <li key={index}>{slot.start_time}</li> // Adjust as needed based on slot structure
            ))}
          </ul>
        </div>
      )}

      {/* <Schedule /> */}
      <Schedule scheduleData={schedule} numberOfCourts={selectedCentre ? selectedCentre.sports[tab].courts.length : 0} onBookSlot={handleBookSlot}/>
    </div>
  );
};

export default Schedule1;
