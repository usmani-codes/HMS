import cors from 'cors'
import express from 'express'

//to get __dirname in esm
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const _filename = fileURLToPath(import.meta.url)
const __dirname = dirname(_filename)


//routes
import { users, roles, auth, employees, assignments, departments, holidays, hospitals, notifySchedules, shifts, swapRequests, timeOffRequests, overtimes, benfitTimes, payPeriods, payRates, trainings, disciplinearyActions } from './routes/index.js'

// middlewares
import { AUTH, logger, notFound, errorHandler, RolesOnly } from './middlewares/index.js'
import config from './config/config.js'
import { connectDB } from './db/connectDB.js'

const app = express()
const PORT = config.PORT || 5000
const api = config.API

// middlewares
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger)

// routes 
app.use(`${api}/auth`, auth)
app.use(`${api}/users`, AUTH, users)

app.use(`${api}/roles`, AUTH, roles)
app.use(`${api}/shifts`, AUTH, shifts)
app.use(`${api}/holidays`, AUTH, holidays)
app.use(`${api}/hospitals`, AUTH, hospitals)
app.use(`${api}/employees`, AUTH, employees)
app.use(`${api}/assignments`, AUTH, assignments)
app.use(`${api}/departments`, AUTH, departments)
app.use(`${api}/swap-requests`, AUTH, swapRequests)
app.use(`${api}/notify-schedules`, AUTH, notifySchedules)
app.use(`${api}/timeoff-requests`, AUTH, timeOffRequests)

app.use(`${api}/overtimes`, overtimes)
app.use(`${api}/payrates`, AUTH, payRates)
app.use(`${api}/payperiods`, AUTH, payPeriods)
app.use(`${api}/trainings`, AUTH, trainings)
app.use(`${api}/discip-actions`, AUTH, disciplinearyActions)


// middilewares
app.use(notFound)
app.use(errorHandler)

//run server
const main = async () => {
   const connectionEstablished = await connectDB(config.MONGO_URI)
   if (!connectionEstablished) {
      return console.log("Couldn't connected to db ..")
   }
   console.log('connected to database ...')
   app.listen(PORT, async () => {
      console.log(`server is listening at http://localhost:${PORT}`)
   })
}


main()