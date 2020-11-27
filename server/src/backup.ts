import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"
import correctPath from "utils/correctPath"

const adapter = new FileSync(correctPath("backup/backupDB.json"))
const backupDB = low(adapter)
export default backupDB