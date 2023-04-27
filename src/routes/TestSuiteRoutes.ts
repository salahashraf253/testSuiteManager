import express from 'express';
import { addTestSuite, getTestSuiteById,deleteTestSuiteById, getAllTestSuites,updateTestSuiteById } from '../controllers/TestSuiteController';
const router = express.Router();


router.get("/TestSuites/:id",getTestSuiteById);
router.get("/TestSuites",getAllTestSuites);
router.post("/TestSuites",addTestSuite);
router.patch("/TestSuites/:id",updateTestSuiteById);
router.delete("/TestSuites/:id",deleteTestSuiteById)


export default router;
