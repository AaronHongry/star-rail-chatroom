const pool = require("../../lib/db"); 

export default async function handler(req, res) {
    if (req.method === "POST") {
        const {roomNumber} = req.body;

        try {
            const checkRoom = await pool.query("SELECT * from chatrooms WHERE room_id = $1", [roomNumber]);
            if (checkRoom.rows.length > 0) {
                
                res.status(200).json({message: "Room exists", room: checkRoom.rows[0]});
            } else {
                res.status(404).json({message: "Room not found"});
            }
        } catch (error) {
            console.log("Error querying the database. ", error);
            res.status(500).json({message: "Server error"});
        }
    } else {
        res.status(405).json({message: "Method not allowed."});
    }
}