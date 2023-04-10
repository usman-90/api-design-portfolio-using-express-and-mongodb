import {body} from 'express-validator'

export const validatePostUserInfo = [
                                        body('name').exists().notEmpty().isString(),
                                        body('contactNum').isString().optional()
                                    ]

export const validateUpdateUserInfo =   [ 
                                            body('name').optional().isString(),
                                            body('contactNum').optional().isString()
                                        ]

export const validatePostCertificates = [
                                            body('certificateTitle').exists().notEmpty().isString(),
                                            body('certificateDescription').optional().isString(),
                                            body('certificateOrganization').optional().isString(),
                                            body('certificateImageSrc').optional().isString()
                                        ]

export const validateUpdateCertificates = [
                                            body('certificateTitle').optional().isString(),
                                            body('certificateDescription').optional().isString(),
                                            body('certificateOrganization').optional().isString(),
                                            body('certificateImageSrc').optional().isString()
                                          ]

export const validatePostSkills =   [    
                                        body('skillTitle').exists().notEmpty().isString(),
                                        body('skillDescription').optional().isString(),
                                        body('skillExperience').optional().isString()
                                    ]


export const validateUpdateSkills = [
                                        body('skillTitle').optional().isString(),
                                        body('skillDescription').optional().isString(),
                                        body('skillExperience').optional().isString()
                                    ]

export const validatePostArticles = [
                                        body('articleTitle').exists().notEmpty().isString(),
                                        body('articleDescription').optional().isString(),
                                        body('articleBody').exists().notEmpty().isString(),
                                        body('articleImageSrc').optional().isString(),
                                        body('articleCoverImgSrc').optional().isString(),
                                        body('articleAuthor').exists().notEmpty().optional().isString()
                                    ]

export const validateUpdateArticles = [
                                        body('articleTitle').optional().isString(),
                                        body('articleDescription').optional().isString(),
                                        body('articleBody').optional().isString(),
                                        body('articleImageSrc').optional().isString(),
                                        body('articleCoverImgSrc').optional().isString(),
                                        body('articleAuthor').optional().isString()
                                      ]

export const validatePostMessages = [
                                        body('messageBody').exists().notEmpty().isString(),
                                        body('messageSender').exists().notEmpty().isString(),
                                    ]

export const validatePostServices = [   
                                        body('serviceTitle').exists().notEmpty().isString(),
                                        body('serviceDescription').optional().isString(),
                                        body('serviceImageSrc').optional().isString()
                                    ]

export const validateUpdateServices = [
                                        body('serviceTitle').optional().isString(),
                                        body('serviceDescription').optional().isString(),
                                        body('serviceImageSrc').optional().isString()
                                      ]                                  

