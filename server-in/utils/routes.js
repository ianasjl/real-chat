
'use strict';

/*
*APIs for frontend
*/

const helper = require('./helper');
const path = require('path');

class Routes{

   constructor(app){

       this.app = app;
   }


   /* creating app Routes starts */
   appRoutes(){
         /**
     * Post call for username check
     * @api {usernameCheck}
     * @APIGroup User Name Check
     * @apidescription It takes User name of the client registering as input and returns a boolean object to define whether the user already exists or not
     * @apiparam {String} username Takes username as String and returns a JSON Object containing status object
     * @apiSuccess {String} UserName Name of the User.
     * @apiSuccess {String} Message  Successfull Message.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       error:false
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       error : true,
     *       message : `username cant be empty.`
     *     }
     */

       this.app.post('/usernameCheck',(request,response) =>{
           if (request.body.username === "" || request.body.username==undefined ) {
               response.status(200).json({
                   error : true,
                   message : `username cant be empty.`
               });
           } else {
               helper.userNameCheck( {
                   username : request.body.username.toLowerCase()
               }, (count)=>{

                   let result = {};

                   if (count > 0) {
                       result.error = true;
                   } else {
                       result.error = false;
                   }
                   response.status(200).json(result);
               });
           }
       });
       /**
                * Post call for Changing Password
                 * @api {changePassword}
                 * @APIGroup CHANGE PASSWORD
                 * @apidescription It takes UserId and password as input. This Post call Updates the password in MongoDb for the particular userID.
                 * @apiparam {String} UserId  Takes UserID
                 * @apiparam {String} password Takes password of the user
                 * @apiSuccess {String} Message  User Password changed successfully.
                 *
                 * @apiSuccessExample Success-Response:
                 *     HTTP/1.1 200 OK
                 *     {
                 *       error:false,
                 *       Message: "User password changed successfully"
                 *     }
                 *
                 * @apiError UserNotFound The id of the User was not found.
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 404 Not Found
                 *     {
                 *       error: true,
                 *       Message: "Server error in routes."
                 *     }
                 */

    this.app.post('/changePassword',(request,response) =>{

                               let userId = request.body.userId;
                               let password = request.body.password;
                               let passwordResponse = {}
                               //console.log("In routes req: " +request);
                               helper.changePassword( userId, password, (error,result)=>{

                                          if (error || result === null||result===undefined) {
                                            console.log(" status error: ");

                                              statusResponse.error = true;
                                              statusResponse.message = `Server error in routes.`;
                                              response.status(200).json(statusResponse);
                                          }
                                          else{
                                          console.log("User status response details: "+result);
                                              statusResponse.error = false;
                                              statusResponse.message = `User password changed successfully`;
                                              response.status(200).json(statusResponse);
                                          }
                                          });

                            });

    /**
     * Post call for status update
    * @api {updateStatus}
    * @APIGroup UPDATE STATUS
    * @apidescription It takes UserId as input. This Post call Updates the Status in MongoDb for the particular userID.
    * @apiparam {String} UserId Takes UserID
    * @apiSuccess {String} UserName Name of the User.
    * @apiSuccess {String} Message  User status changed successfully.
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       error:false,
    *       UserName: "Jay",
    *       Message: "User status changed successfully"
    *     }
    *
    * @apiError UserNotFound The id of the User was not found.
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *       error: true,
    *       Message: "Server error in routes."
    *     }
    */
       this.app.post('/updateStatus',(request,response) =>{

                   let userId = request.body.userId;
                   let status = request.body.status;
                   let statusResponse = {}
                   //console.log("In routes req: " +request);
                   helper.updateStatus( userId, status, (error,result)=>{

                              if (error || result === null||result===undefined) {
                                console.log(" status error: ");

                                  statusResponse.error = true;
                                  statusResponse.message = `Server error in routes.`;
                                  response.status(200).json(statusResponse);
                              }
                              else{
                              console.log("User status response details: "+result);
                                  statusResponse.error = false;
                                  statusResponse.message = `User status changed successfully`;
                                  response.status(200).json(statusResponse);
                              }
                              });

                });

       this.app.post('/getprofile',(request,response) =>{
        console.log("Hello ");

        let userId = request.body.userId;
        let getProfileResponse = {}


        if (userId == ''||userId===undefined) {

            getProfileResponse.error = true;
            getProfileResponse.message = `User Id cant be empty.`;
            response.status(200).json(getProfileResponse);

        }else{

               helper.getprofile( {
                   userId : userId,
               }, (error,result)=>{

                   if (error || result === null) {

                    getProfileResponse.error = true;
                    getProfileResponse.message = `Server error.`;
                       response.status(200).json(getProfileResponse);
                   }else{

                    console.log(JSON.stringify(result));
                    getProfileResponse.error = false;
                    getProfileResponse.username = result.username;
                    getProfileResponse.message = `User logged in.`;
                    getProfileResponse.imgurl = result.img;
                    response.status(200).json(getProfileResponse);
                   }
            });
        }

    });

    /**
     * Post call for get profile
    * @api {getprofile}
    * @APIGroup GET PROFILE
    * @apidescription It takes UserId as input. Gets the basic profile of User. The basic profile includes Image Url, UserName
    * @apiparam {String} UserId Takes UserID as String and returns a JSON Object containing UserName
    * @apiSuccess {String} UserName Name of the User.
    * @apiSuccess {String} Message  Successfull Message.
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       error:false,
    *       UserName: "Jay",
    *       Message: "User Logged In"
    *     }
    *
    * @apiError UserNotFound The id of the User was not found.
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *       error: true,
    *       Message: "Server Error"
    *     }
    */
    this.app.post('/getprofile',(request,response) =>{

                   let userId = request.body.userId;
                   let sessionCheckResponse = {}

                   if (userId == ''||userId===undefined) {

                       sessionCheckResponse.error = true;
                       sessionCheckResponse.message = `User Id cant be empty.`;
                       response.status(200).json(sessionCheckResponse);

                   }else{

                          helper.userSessionCheck( {
                              userId : userId,
                          }, (error,result)=>{

                              if (error || result === null) {

                                  sessionCheckResponse.error = true;
                               sessionCheckResponse.message = `Server error.`;
                                  response.status(200).json(sessionCheckResponse);
                              }else{

                                    sessionCheckResponse.error = false;
                                    sessionCheckResponse.username = result.username;
                                    sessionCheckResponse.message = `User logged in.`;
                                    response.status(200).json(sessionCheckResponse);
                              }
                       });
                   }
               });

               /**
                 * Post call for Update Profile Pic
                * @api {updatepic}
                * @APIGroup UPDATE PIC
                * @apidescription It takes UserId and Image Url as input. The Image URL is obtained from S3 bucket. This Post call Updates the Image in MongoDb so that when retrived can be displayed in multiple places.
                * @apiparam {String} UserId  Takes UserID
                * @apiparam {String} ImageUrl Takes a Url of Image URLas String and returns a JSON Object containing Image and UserName
                * @apiSuccess {String} UserName Name of the User.
                * @apiSuccess {String} Message  Successfull Message.
                *
                * @apiSuccessExample Success-Response:
                *     HTTP/1.1 200 OK
                *     {
                *       error:false,
                *       UserName: "Jay",
                *       Message: "User pic changed successfully"
                *     }
                *
                * @apiError UserNotFound The id of the User was not found.
                *
                * @apiErrorExample Error-Response:
                *     HTTP/1.1 404 Not Found
                *     {
                *       error: true,
                *       Message: "Server Error"
                *     }
                */


               this.app.post('/updatePic',(request,response) =>{

                        console.log("Posted Request");
                           let userId = request.body.userId;
                           let url = request.body.url;
                           console.log("Routes.JS");
                           console.log("url is" +url);
                           let picResponse = {}
                           console.log("In routes req: " +request);
                           helper.updatePic( userId, url, (error,result)=>{

                                      if (error || result === null||result===undefined) {
                                        console.log(" status error: ");

                                          picResponse.error = true;
                                          picResponse.message = `Server error in routes.`;
                                          response.status(200).json(picResponse);
                                      }
                                      else{
                                      console.log("User status response details: "+result);
                                          picResponse.error = false;
                                          picResponse.message = `User pic changed successfully`;
                                          response.status(200).json(picResponse);
                                      }
                                      });

                        });



                        /**
                        * Post call for Registering an User
                        * @api {registerUser}
                        * @APIGroup REGISTER USER
                        * @apidescription It takes username, password and email from the user and creates an account for the user
                        * @apiparam {String} username  Takes username
                        * @apiparam {String} email takes Email
                        * @apiparam {String} password takes password from the user
                        * @apiparam {String} status takes default status
                        * @apiparam {String} img takes default profile pic
                        * @apiSuccess {String} UserName Name of the User.
                        * @apiSuccess {String} Message  Successfull Message.
                        *
                        * @apiSuccessExample Success-Response:
                        *     HTTP/1.1 200 OK
                        *     {
                        *       "error":false,
                        *        "userId":"5a08d574f9f91422b854b0d0",
                        *        "message":"User registration successful."
                        *     }
                        *
                        * @apiError USername not defined!
                        *
                        * @apiErrorExample Error-Response:
                        *     HTTP/1.1 404 Not Found
                        *     {
                        *       error: true,
                        *       Message: "username cant be empty."
                        *     }
                        * @apiError Password not defined!
                        *
                        * @apiErrorExample Error-Response:
                        *     HTTP/1.1 404 Not Found
                        *     {
                        *       error: true,
                        *       Message: "password cant be empty."
                        *     }
                        * @apiError Email not defined!
                        *
                        * @apiErrorExample Error-Response:
                        *     HTTP/1.1 404 Not Found
                        *     {
                        *       error: true,
                        *       Message: "Email cant be empty."
                        *     }
                        */
       this.app.post('/registerUser',(request,response) =>{

            let username = request.body.username;
            let email = request.body.email;
            let password = request.body.password;
            let status =  "Hey there, I'm using Whatsapp!!";


           let registrationResponse = {}


           if(typeof username=='undefined'||username==null||username=="") {

            console.log("USername not defined!");
               registrationResponse.error = true;
               registrationResponse.message = `username cant be empty.`;
               response.status(200).json(registrationResponse);

           }else if(email ==''||email==undefined||email==null){

               registrationResponse.error = true;
               registrationResponse.message = `email cant be empty.`;
               response.status(200).json(registrationResponse);

           }else if(password === ''||password===undefined||password===null){

               registrationResponse.error = true;
               registrationResponse.message = `password cant be empty.`;
               response.status(200).json(registrationResponse);

           }else{


           const data = {
            username : (request.body.username).toLowerCase(),
            email : request.body.email,
            password : request.body.password,
            status: "Hey there, I'm using Whatsapp!!",
            img: "http://support.plymouth.edu/kb_images/Yammer/default.jpeg"
        };

               data.timestamp = Math.floor(new Date() / 1000);
               data.online = 'Y' ;
               data.socketId = '' ;


                helper.registerUser( data, (error,result)=>{
                    console.log("result when reg:  "+JSON.stringify(result));

                    if (error) {


                        registrationResponse.error = true;
                        registrationResponse.message = `Server error.`;
                        response.status(404).json(registrationResponse);
                    }else{

                        console.log("User registration response detains: "+result);
                        registrationResponse.error = false;
                        registrationResponse.userId = result.insertedId;
                        let bucketName = "profilepic"+ result.insertedId;
                        var AWS = require('aws-sdk');
                        AWS.config.update({ accessKeyId: 'Your AWS Access Key', secretAccessKey: 'Your AWS Secret Key'});
                        var s3 = new AWS.S3({region: 'us-west-1'});
                        const bucketParams = {
                            Bucket : bucketName
                         };
                        s3.headBucket(bucketParams, function(err, data) {
                            console.log("getting access to bucket");
                            console.log(JSON.stringify(bucketParams))
                            if (err) {
                                    console.log("ErrorHeadBucket", err)
                                    s3.createBucket(bucketParams, function(err, data) {
                                        if (err) {
                                            console.log("Error", err);
                                        } else {
                                            console.log("Created Bucket Successfully");
                                        }
                                });
                            }
                        })
                        registrationResponse.message = `User registration successful.`;
                        response.status(200).json(registrationResponse);
                    }
                });
           }
       });

       /**
                 * Post call for Logging in
                * @api {login}
                 * @APIGroup Login
                 * @apidescription It takes username, password and email from the user and creates an account for the user
                 * @apiparam {String} username  Takes username
                 * @apiparam {String} email takes Email
                 * @apiparam {String} password takes password from the user
                 * @apiSuccess {String} UserName Name of the User.
                 * @apiSuccess {String} Message User logged in..
                 *
                 * @apiSuccessExample Success-Response:
                 *     HTTP/1.1 200 OK
                 *     {
                 *       "error":false,"userId":"5a04b06997749137b491e194","message":"User logged in."
                 *     }
                 *
                 * @apiError username cant be empty.
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 404 Not Found
                 *     {
                 *       error: true,
                 *       Message: "username cant be empty."
                 *     }
                 * @apiError Password not defined!
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 404 Not Found
                 *     {
                 *       error: true,
                 *       Message: "password cant be empty."
                 *     }
                  */
       this.app.post('/login',(request,response) =>{


        let username = request.body.username;
        let password = request.body.password;



           let loginResponse = {}

           if(username === '' || username === null||username==undefined) {

               loginResponse.error = true;
               loginResponse.message = `username cant be empty.`;
               response.status(200).json(loginResponse);

           }else if(password === '' ||password==undefined|| password === null){

               loginResponse.error = true;
               loginResponse.message = `password cant be empty.`;
               response.status(200).json(loginResponse);

           }else{

            const data = {
                username : (request.body.username).toLowerCase(),
                password : request.body.password
            };
                  helper.login( data, (error,result)=>{

                      if (error || result === null) {

                          loginResponse.error = true;
                       loginResponse.message = `Server error.`;
                          response.status(200).json(loginResponse);
                      }else{
                          loginResponse.error = false;
                          loginResponse.userId = result._id;
                       loginResponse.message = `User logged in.`;
                          response.status(200).json(loginResponse);
                      }
               });
           }
       });

             /**
                 * Post call for User Session check
                 * @api {userSessionCheck}
                 * @APIGroup userSessionCheck
                 * @apidescription It takes userId as the input and let us know whether the user is online or not
                 * @apiparam {String} userId  Takes userId
                 * @apiSuccess {String} Displays Gives Status of User.
                 * @apiSuccess {String} Email Displays Email of Usser.
                 * @apiSuccess {String} UserName Name of the User.
                 * @apiSuccess {String} Message User logged in.
                 *
                 * @apiSuccessExample Success-Response:
                 *     HTTP/1.1 200 OK
                 *     {
                 *        "error":false,"userName":"Jay",
                 *        "email":"jay@gmail.com",
                 *        "status" : "Hey There","message":"User logged in."
                 *     }
                 *
                 * @apiError User Id cant be empty.
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 404 Not Found
                 *     {
                 *       error: true,
                 *       Message: "User Id cant be empty."
                 *     }
                 */
       this.app.post('/userSessionCheck',(request,response) =>{

           let userId = request.body.userId;
           let sessionCheckResponse = {}


           if (userId == ''||userId===undefined) {

               sessionCheckResponse.error = true;
               sessionCheckResponse.message = `User Id cant be empty.`;
               response.status(200).json(sessionCheckResponse);

           }else{

                  helper.userSessionCheck( {
                      userId : userId,
                  }, (error,result)=>{
                      if (error || result === null) {

                          sessionCheckResponse.error = true;
                          sessionCheckResponse.message = `Server error.`;
                          response.status(200).json(sessionCheckResponse);
                      }else{

                          sessionCheckResponse.error = false;
                          sessionCheckResponse.username = result.username;
                          sessionCheckResponse.message = `User logged in.`;
                          sessionCheckResponse.status =  result.status;
                          sessionCheckResponse.email =  result.email;
                          response.status(200).json(sessionCheckResponse);
                      }
               });
           }
       });

       /**
                 * @api {getMessages}
                 * @APIGroup getMessages
                 * @apidescription It takes userId of the user and the other userId of the recipient as the input and retrieves their messages
                 * @apiparam {String} userId  Takes userId of the user logged in.
                 * @apiparam {String} touserId  Takes userId of the recipient.
                 * @apiSuccess {String} messages Messages between the user and the recipient
                 *
                 * @apiSuccessExample Success-Response:
                 *     HTTP/1.1 200 OK
                 *     {
                 *       "error":false,
                 *       "message":"message"
                 *     }
                 *
                 * @apiError userId cant be empty.
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 404 Not Found
                 *     {
                 *       error: true,
                 *       Message: "userId cant be empty."
                 *     }
                 */

       this.app.post('/getMessages',(request,response) =>{

           let userId = request.body.userId;
           let toUserId = request.body.toUserId;
           let messages = {}

           if (userId == '') {
               messages.error = true;
               messages.message = `userId cant be empty.`;
               response.status(200).json(messages);
           }else{

                  helper.getMessages( userId, toUserId, (error,result)=>{

                     if (error) {

                          messages.error = true;
                          messages.message = `Server error.`;
                          response.status(200).json(messages);

                      }else{

                          messages.error = false;
                          messages.message = result;
                          response.status(200).json(messages);
                      }
               });
           }
       });

        /**
                 * @api {getGroupMessages}
                 * @APIGroup getGroupMessages
                 * @apidescription It takes userId of the user and the other userId of the recipient as the input and retrieves their messages
                 * @apiparam {String} GroupName  Takes Name of the group for which you want the messages to be retreived.
                 * @apiSuccess {String[]} messages Messages in the group
                 *
                 * @apiSuccessExample Success-Response:
                 *     HTTP/1.1 200 OK
                 *     {
                 *       "error":false,
                 *       "message": List of Messages in group
                 *     }
                 *
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 500 Not Found
                 *     {
                 *       error: true,
                 *       Message: "Server Error"
                 *     }
                 */
       this.app.post('/getGroupMessages',(request,response) =>{
        let groupName = request.body.groupName;
        let messages = {}

                   if (groupName == '') {
                       messages.error = true;
                       messages.message = `groupName cant be empty.`;
                       response.status(200).json(messages);
                   }else{

                          helper.getGroupMessages(groupName, (error,result)=>{

                             if (error) {

                                  messages.error = true;
                                  messages.message = `Server error.`;
                                  response.status(200).json(messages);

                              }else{

                                  messages.error = false;
                                  messages.message = result;
                                  response.status(200).json(messages);
                              }
                       });
                   }
               });

               /**
                 * @api {Register Group}
                 * @APIGroup RegisterGroup
                 * @apidescription It takes userId of the user and the other userId of the recipient as the input and retrieves their messages
                 * @apiparam {String} UserName  Takes Name of the User to be entered in the group.
                 * @apiparam {String} GroupName  Takes Name of the group for which you want the messages to be retreived.
                 * @apiparam {String} UserId  Takes the UserId
                 * @apiSuccess {String[]} messages Messages in the group
                 *
                 * @apiSuccessExample Success-Response:
                 *     HTTP/1.1 200 OK
                 *     {
                 *       "error":false,
                 *       "message": List of Messages in group
                 *     }
                 *
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 404 Not Found
                 *     {
                 *       error: true,
                 *       Message: "Group Name can't be empty"
                 *     }
                 *     HTTP/1.1 500 Not Found
                 *     {
                 *       error: true,
                 *       Message: "Server Error"
                 *     }
                 */
       this.app.post('/registerGroup', (request,response) => {


          let username = request.body.username.toLowerCase();
          let groupName = request.body.groupName;
          let userId = request.body.userId;

          let registrationResponse = {}


          let groupsArray=[];
          groupsArray.push(groupName);

          const data = {
            username :username,
            userId:userId,
        };

        if (request.body.groupName === "") {
            response.status(200).json({
                error : true,
                message : `groupName cant be empty.`
            });
        } else {

            helper.groupUserNameCheck(data, (count) => {

                if (count > 0) {
                   //modify exsisting groups array of user

                  helper.updateUserGroups( data ,groupName, (error,result)=>{

                                         if (error) {
                                           // console.log("Not  updated");

                                                registrationResponse.error = true;
                                                registrationResponse.message = `Server error.`;
                                                response.status(200).json(registrationResponse);

                                            }else{

                                             //   console.log("Succesfully updated");
                                             registrationResponse.error = false;
                                             registrationResponse.message = result;
                                             response.status(200).json(registrationResponse);
                                            }


                  });


                } else {

                    const registerGroupData = {
                        username :data.username,
                        userId:data.userId,
                        groupsArray:groupsArray
                    };



                  helper.registerGroup( registerGroupData , (error,result)=>{

                    if (error) {

                        registrationResponse.error = true;
                        registrationResponse.message = `Server error.`;
                        response.status(200).json(registrationResponse);

                    }else{

                     registrationResponse.error = false;
                     registrationResponse.message = result;
                     response.status(200).json(registrationResponse);
                    }
              });
          }

     });
  }
});
/**
                 * @api {deregisterGroup}
                 * @APIGroup deregisterGroup
                 * @apidescription It takes username of the user and the group name and deletes the user from the group
                 * @apiparam {String} username  Takes username of the user needs to be deregistered.
                 * @apiparam {String} userId  Takes userId of the user needs to be deregistered.
                 * @apiparam {String} groupName  Takes groupName as input.
                 * @apiSuccess {String} messages Messages between the user and the recipient
                 *
                 * @apiSuccessExample Success-Response:
                 *     HTTP/1.1 200 OK
                 *     {
                 *       "error":false,
                 *       "message":"De registration successful!."
                 *     }
                 *
                 * @apiError groupName cant be empty.
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 404 Not Found
                 *     {
                 *       error: true,
                 *       Message: "groupName cant be empty."
                 *     }
                 */

this.app.post('/deregisterGroup', (request,response) => {


      let username = request.body.username.toLowerCase();
      let groupName = request.body.groupName;
      let userId = request.body.userId;

      let deregistrationResponse = {}


      const data = {
        username :username,
        userId:userId,
    };


    if (request.body.groupName === "") {
        response.status(200).json({
            error : true,
            message : `groupName cant be empty.`
        });
    } else {

        helper.fetchGroups(data,groupName, (result) => {

            //pulled from collection
           console.log("Fetched: "+JSON.stringify(result));

           response.status(200).json({
            error : false,
            message : `De registration successful!.`
        });

      });
}
});
/**
                 * @api {deregisterUsers}
                 * @APIGroup deregisterUser
                 * @apidescription It takes username of the user and the group name and deletes the user from the group
                 * @apiparam {String} username  Takes username of the user needs to be deregistered.
                 * @apiparam {String} userId  Takes userId of the user needs to be deregistered.
                 * @apiparam {String} groupName  Takes groupName as input.
                 * @apiSuccess {String} messages Messages between the user and the recipient
                 *
                 * @apiSuccessExample Success-Response:
                 *     HTTP/1.1 200 OK
                 *     {
                 *       "error":false,
                 *       "message":"pulled User from group  successfully!."
                 *     }
                 *
                 * @apiError groupName cant be empty.
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 404 Not Found
                 *     {
                 *       error: true,
                 *       Message: "groupName cant be empty."
                 *     }
                 */

this.app.post('/deregisterUsers', (request,response) => {


      let username = request.body.username.toLowerCase();
      let groupName = request.body.groupName;
      let userId = request.body.userId;

      let deregistrationResponse = {}


      const pullvalue={
          "username":username,
          "userId":userId
      }



      const data = {
        groupName :groupName,
    };

    if (request.body.groupName === "") {
        response.status(200).json({
            error : true,
            message : `groupName cant be empty.`
        });
    } else {

        helper.pullUserFromGroup(data,pullvalue, (result) => {

            //pulled from collection return original i believe
           console.log("Fetched: "+JSON.stringify(result));
           response.status(200).json({
            error : false,
            message : `pulled user from group successfully.`
        });

      });
}
});

/**
                 * @api {addGroupUsers}
                 * @APIGroup addGroupUsers
                 * @apidescription It takes username of the user and the group name and adds the user to the group
                 * @apiparam {String} userarray  Takes username of the user needs to be deregistered.
                 * @apiparam {String} groupName  Takes groupName as input.
                 * @apiSuccess {String} String added the users to the group
                 *
                 * @apiSuccessExample Success-Response:
                 *     HTTP/1.1 200 OK
                 *     {
                 *       "error":false,
                 *       "message":"added User to the group  successfully!."
                 *     }
                 *
                 * @apiError groupName cant be empty.
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 404 Not Found
                 *     {
                 *       error: true,
                 *       Message: "groupName cant be empty."
                 *     }
                 *  @apiErrorExample Error-Response:
                 *     HTTP/1.1 400 Bad Request
                 *     {
                 *       error: true,
                 *       Message: "bad request"
                 *     }
                 *  @apiErrorExample Error-Response:
                 *     HTTP/1.1 500 Server error
                 *     {
                 *       error: true,
                 *       Message: "server error"
                 *     }
                 */


  this.app.post('/addGroupUsers',(request,response) =>{

    let userarray= request.body.userarray;
    let groupName = request.body.groupName;

    let messages = {}
    let registrationResponse = {}

    console.log("Userarray: "+JSON.stringify(userarray));

    const data = {
        groupName:groupName
    };

               if (groupName == ''||groupName==undefined||groupName==null) {
                   messages.error = true;
                   messages.message = `groupName cant be empty.`;
                   response.status(200).json(messages);
               }else{
                helper.UserIdCheckInGroup(data, (count) => {

                    if (count > 0) {
                        console.log("group revelant userid array found");

                      helper.updateGroupUsersList( data ,userarray, (error,result)=>{



                             if (error) {

                                     registrationResponse.error = true;
                                     registrationResponse.message = `Server error.`;
                                     response.status(200).json(registrationResponse);

                                    }else{

                                        console.log("Succesfully updated: "+JSON.stringify(result));
                                     registrationResponse.error = false;
                                     registrationResponse.message = 'Succesfull';
                                     response.status(200).json(registrationResponse);
                                    }


                      });


                    } else {

                      console.log("No group relevant users found: ");
                     //insert new entry in database

                        const registerUserData = {
                            userIdArray:userarray,
                            groupName:groupName
                        };



                      helper.registerUserId( registerUserData , (error,result)=>{

                        if (error) {

                            registrationResponse.error = true;
                            registrationResponse.message = `Server error.`;
                            response.status(200).json(registrationResponse);

                        }else{

                         registrationResponse.error = false;
                         registrationResponse.message = result;
                         response.status(200).json(registrationResponse);
                        }
                  });
              }

         });
               }
           });


           /**
                 * @api {fetchMembers}
                 * @APIGroup fetchMembers
                 * @apidescription It takes groupname of the group and fetches the users from the group
                 * @apiparam {String} groupName  Takes groupName as input.
                 * @apiSuccess {String} usernames present in the group
                 *
                 * @apiSuccessExample Success-Response:
                 *     HTTP/1.1 200 OK
                 *     {
                 *       "error":false,
                 *       "message":"fetched Users from the  group  successfully!."
                 *     }
                 *
                 * @apiError groupName cant be empty.
                 *
                 * @apiErrorExample Error-Response:
                 *     HTTP/1.1 404 Not Found
                 *     {
                 *       error: true,
                 *       Message: "groupName cant be empty."
                 *     }
                 */






           this.app.post('/fetchMembers',(request,response) =>{

                let  groupName= request.body.groupName;

                       const data = {
                        groupName:groupName
                  };

                  let messages = {}
                  let registrationResponse = {}


                       if (groupName == ''||groupName==undefined||groupName==null) {
                           messages.error = true;
                           messages.message = `groupName cant be empty.`;
                           response.status(200).json(messages);
                       }else{

                              helper.getMembers(data, (error,result)=>{

                                if (error){

                                            registrationResponse.error = true;
                                            registrationResponse.message = `Server error.`;
                                            response.status(200).json(registrationResponse);

                                        }else{

                                             console.log("Fetched members result: "+JSON.stringify(result));
                                             registrationResponse.error = false;
                                             registrationResponse.message = result;
                                             response.status(200).json(registrationResponse);
                                         }
                           });
                       }
                   });



       this.app.get('/*',(request,response) =>{

        let userId = request.body.userId;
        let socketId=request.body.socketId;
        response.sendFile(path.join(__dirname,'./dist/index.html'));
       });

   }

   routesConfig(){
       this.appRoutes();
   }
}
module.exports = Routes;
