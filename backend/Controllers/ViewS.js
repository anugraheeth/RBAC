import Schedule from "../Models/schedule.js";

const getClassSchedule = async (req, res) => {
    try {
        const classId  = req.params.classId;

        const schedules = await Schedule.find({ classId })
            .populate("teacherId", "name email")
            
        if (schedules.length == 0) {
            return res.status(200).json({ success: true, message: "No schedules found!" });
        }

        res.status(200).json({ success: true, message: "Class schedule retrieved successfully!", schedules });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." });
        console.error(error);
    }
};

export {getClassSchedule}
