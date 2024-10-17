import React, { useState } from "react";

// Function to generate 24-hour time slots
const generateTimeSlots = (numberOfCourts) => {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
        const time = hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
        timeSlots.push({ time, courts: Array(numberOfCourts).fill(null) });
    }
    return timeSlots;
};

const Schedule = ({ scheduleData, numberOfCourts, onBookSlot }) => {
    const [allTimeSlots, setAllTimeSlots] = useState(generateTimeSlots(numberOfCourts));
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [contactInfo,setContactInfo] = useState("");

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
            setDialogOpen(false); // Close the dialog
        }
    };

    return (
        <>
            <div className="p-6 pb-0.5 border border-zinc-200 rounded-lg overflow-x-auto">
                {/* Header */}
                <div className="grid grid-cols-7 gap-2 bg-gray-200 rounded-lg mb-2">
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
                                <tr key={index} className="even:bg-gray-50">
                                    {/* Time Slot */}
                                    <td className="border w-[150px] border-zinc-300 px-2 py-2 text-center font-semibold bg-gray-100">
                                        {slot.time}
                                    </td>

                                    {/* Courts */}
                                    {slot.courts.map((court, idx) => (
                                        <td
                                            key={idx}
                                            className="border border-zinc-300 px-2 py-2 w-[150px] cursor-pointer"
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
                    <div className="bg-white p-4 rounded shadow-lg">
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
                                <button type="button" onClick={() => setDialogOpen(false)} className="border px-4 py-2 rounded">Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Info Legend */}
            <div className="flex flex-wrap gap-4 text-xs mt-3">
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded border bg-yellow-200 mr-2"></div>
                    <div>Bookings</div>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded border bg-green-200 mr-2"></div>
                    <div>Checked-in</div>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded border bg-blue-200 mr-2"></div>
                    <div>Coaching</div>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded border bg-zinc-200 mr-2"></div>
                    <div>Blocked/Tournament</div>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded border bg-purple-200 mr-2"></div>
                    <div>Completed</div>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded border bg-pink-200 mr-2"></div>
                    <div>Pending Payment/Collect Items</div>
                </div>
            </div>
        </>
    );
};

export default Schedule;
