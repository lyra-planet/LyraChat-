const { addMsg, getAllMsgs } = require("../controllers/messagesController");
const router = require("express").Router();



router.post("/addmsg", addMsg);
router.post("/getmsg",getAllMsgs);
module.exports = router;
