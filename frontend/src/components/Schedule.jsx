import React, { useState } from "react";

// Function to generate 24-hour time slots
const generateTimeSlots = (numberOfCourts) => {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
        var time = hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
        if (hour == 12) time = "12 PM"
        timeSlots.push({ time, courts: Array(numberOfCourts).fill(null) });
    }
    return timeSlots;
};

const Schedule = ({ scheduleData, numberOfCourts, onBookSlot }) => {
    const [allTimeSlots, setAllTimeSlots] = useState(generateTimeSlots(numberOfCourts));
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [contactInfo, setContactInfo] = useState("");

    // Populate time slots based on the provided schedule data
    React.useEffect(() => {
        if (scheduleData && scheduleData.length > 0) {
            const updatedSlots = generateTimeSlots(numberOfCourts);
            scheduleData.forEach((courtData) => {
                const courtNumber = courtData.courtNumber;
                courtData.slots.forEach((slot) => {
                    const index = slot.start_time; // Assuming start_time is the hour (0-23)
                    if (index >= 0 && index < 24 && courtNumber <= numberOfCourts) {
                        updatedSlots[index].courts[courtNumber - 1] = { name: slot.customer_name };
                    }
                });
            });
            setAllTimeSlots(updatedSlots);
        }
    }, [scheduleData, numberOfCourts]);

    if (!scheduleData) {
        return (
            <div className="text-center text-gray-600 py-4">
                Select The required Centre, Date and Sports
            </div>
        );
    }

    const handleCellClick = (index, courtIndex) => {
        // Open dialog if the slot is empty
        if (!allTimeSlots[index].courts[courtIndex]) {
            setSelectedSlot({ index, courtIndex });
            setDialogOpen(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!customerName) return; // Ensure customer name is provided
        var amount = 500;
        // Call the booking API
        const success = await onBookSlot(selectedSlot.index, selectedSlot.courtIndex, customerName, contactInfo, amount);
        if (success) {
            // Update the time slots after successful booking
            const updatedSlots = [...allTimeSlots];
            updatedSlots[selectedSlot.index].courts[selectedSlot.courtIndex] = { name: customerName };
            setAllTimeSlots(updatedSlots);
            setCustomerName(""); // Reset the customer name
            setContactInfo(""); // Reset the contact info
            setDialogOpen(false); // Close the dialog
        }
    };

    return (
        <>
            <div className="p-6 pb-0.5 border border-gray-300 rounded-lg overflow-x-auto shadow-md">
                {/* Header */}
                <div className="grid grid-cols-7 gap-2 bg-gray-100 rounded-lg mb-2">
                    <div className="text-center font-medium py-2">Time</div>
                    {Array.from({ length: numberOfCourts }, (_, i) => (
                        <div key={i} className="text-center font-medium py-2">
                            Court {i + 1}
                        </div>
                    ))}
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                    <table className="min-w-full border-collapse mb-3">
                        <tbody>
                            {/* Schedule Rows */}
                            {allTimeSlots.map((slot, index) => (
                                <tr key={index} className="even:bg-gray-50 hover:bg-gray-200">
                                    {/* Time Slot */}
                                    <td className="border w-[150px] border-gray-300 px-2 py-2 text-center font-semibold bg-gray-100">
                                        {slot.time}
                                    </td>

                                    {/* Courts */}
                                    {slot.courts.map((court, idx) => (
                                        <td
                                            key={idx}
                                            className="border border-gray-300 px-2 py-2 w-[150px] cursor-pointer hover:bg-blue-100"
                                            onClick={() => handleCellClick(index, idx)} // Handle cell click
                                        >
                                            {court ? (
                                                <div className="flex justify-center items-center h-full w-full">
                                                    <span className="font-medium">{court.name}</span>
                                                </div>
                                            ) : (
                                                <div className="h-full w-full"></div> // Empty cell for available slot
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Booking Dialog */}
            {dialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg w-1/3">
                        <h3 className="text-lg font-semibold mb-2">Book a Slot</h3>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">
                                Customer Name:
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="border border-gray-300 rounded w-full p-1"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Contact Info:
                                <input
                                    type="text"
                                    value={contactInfo}
                                    onChange={(e) => setContactInfo(e.target.value)}
                                    className="border border-gray-300 rounded w-full p-1"
                                    required
                                />
                            </label>
                            <div className="flex justify-between mt-4">
                                <button type="button" onClick={() => setDialogOpen(false)} className="border px-4 py-2 rounded hover:bg-gray-200">Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Schedule;
