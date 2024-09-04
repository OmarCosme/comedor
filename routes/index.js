import { Router } from "express";
import controller from "../controller/employee.js";
// import requireLogin from "../controller/middleware.js"
const router = Router()

router.get('/login', (req, res) => res.render('login', {title: 'Copamex'}))
router.get('/forgetPass', (req, res) => res.render('forgetPass', {title: 'Copamex'}))
router.get('/resertPassword', (req, res) => res.render('resertPassword', {title: 'Copamex'}))
router.get('/checkTickets', (req, res) => res.render('checkTickets', {title: 'Copamex'}))
router.get('/', (req, res) => res.render('index', {title: 'Copamex'}))


router.get('/support', (controller.support))
router.get('/register', (controller.register))
router.get('/editUser', (controller.editUser))
router.get('/report', (controller.report))
router.get('/registeredUsers', (controller.registeredUsers))
router.post('/matchPass', (controller.matchPass))
router.post('/logout', (controller.logout))
router.post('/signup', (controller.signup))
router.post('/loginUser', (controller.loginUser))
router.post('/registerEmployee', (controller.create))
router.post('/seachEmployee', (controller.search))
router.post('/regDiningroom', (controller.checkin))
router.post('/reportPayroll', (controller.payroll))
router.post('/seachTicket', (controller.seachTicket))
router.post('/ticketPayroll', (controller.ticket))

router.post('/print', (controller.print))


router.post('/searchPayroll', (controller.searchPayroll))
router.post('/createToken', (controller.createToken))
router.put('/updatePassword', (controller.updatePassword))
router.put('/updateTicket', (controller.update))
router.put('/updateUser', (controller.updateUser))
router.put('/activeUser', (controller.activeUser))

export default router