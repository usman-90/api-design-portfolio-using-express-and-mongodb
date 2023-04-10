import { Router } from "express";
import { deleteUser, getUserInfo, postOrUpdateUserInfo} from "./handlers/userInfo";
import { deleteCertificate, getAllCertificates, getOneCertificate, postCertificates, updateCertificates } from "./handlers/certificates";
import { deleteSkill, getAllskills, postskills, updateSkills } from "./handlers/skills";
import { deleteArticle, getAllArticles, getOneArticle, postArticles, updateArticles } from "./handlers/articles";
import { deleteMessage, getAllMessages, postMessages } from "./handlers/messages";
import { deleteService, getAllServices, postServices, updateServices } from "./handlers/services";
import { body } from "express-validator";
import { handleInputErrors } from "./middlewares/handleInpErr";
import {    validatePostCertificates,
            validateUpdateSkills ,
            validatePostSkills, 
            validateUpdateCertificates, 
            validateUpdateUserInfo, 
            validatePostArticles, 
            validateUpdateArticles, 
            validatePostMessages, 
            validatePostServices, 
            validateUpdateServices, 
            validatePostUserInfo } from "./middlewares/validateBody";


const router = Router()

router.get('/getUserInfo',getUserInfo)
router.post('/postUserInfo',validatePostUserInfo,handleInputErrors, postOrUpdateUserInfo)
router.put('/updateUserInfo',validateUpdateUserInfo,handleInputErrors,postOrUpdateUserInfo)
router.delete('/deleteUser',deleteUser)

router.get('/getAllCertificates',getAllCertificates)
router.get('/getOneCertificate/:id',getOneCertificate)
router.post('/postCertificate',validatePostCertificates,handleInputErrors,postCertificates)
router.put('/updateCertificate/:id',validateUpdateCertificates,handleInputErrors,updateCertificates)
router.delete('/deleteCertificate/:id',deleteCertificate)

router.get('/getSkills',getAllskills)
router.post('/postSkill',validatePostSkills,handleInputErrors,postskills)
router.put('/updateSkill/:id',validateUpdateSkills,handleInputErrors,updateSkills)
router.delete('/deleteSkill/:id',deleteSkill)

router.get('/getAllArticles',getAllArticles)
router.get('/getOneArticle/:id',getOneArticle)
router.post('/postArticle',validatePostArticles,handleInputErrors,postArticles)
router.put('/updateArticle/:id',validateUpdateArticles,handleInputErrors,updateArticles)
router.delete('/deleteArticle/:id',deleteArticle)

router.get('/getMessages',getAllMessages)
router.post('/postMessages',validatePostMessages,handleInputErrors,postMessages)
router.delete('/deleteMessages/:id',deleteMessage)

router.get('/getServices',getAllServices)
router.post('/postServices',validatePostServices,handleInputErrors,postServices)
router.put('/updateServices/:id',validateUpdateServices,handleInputErrors,updateServices)
router.delete('/deleteServices/:id',deleteService)


export default router;