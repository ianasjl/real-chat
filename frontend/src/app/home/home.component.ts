
declare var require: any;
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
<any>require('aws-sdk/dist/aws-sdk');
import * as _ from "lodash";


declare var $:any;




import { SocketService } from './../socket.service';
import { HttpService } from './../http.service';
import { ChatService } from './../chat.service';




@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css'],
providers : [ChatService,HttpService,SocketService]
})
export class HomeComponent implements OnInit{




public overlayDisplay = false;
public selectedUserId = null;
public selectedSocketId = null;
public selectedUserName = null;
public selectedGroupName = null;
public selectedEmail = '';




public username = null;
public userId = null;
public socketId = null;
public chatListUsers = [];
public chatOfflineUsers = [];
public message = '';
public messages = [];
public groupName = '';
public groupsList= [];

public selectedUserstoAdd=[];
public selectedUserstoDelete=[];

public newUserstoGroup = [];
public removedUsersfromGroup = [];
public exsistingUsers=[];

public allUsers = [];
public status = null;
public profile_img = '';

public selectedUsersList = true;


constructor(
private chatService : ChatService,
	private socketService : SocketService,
	private route :ActivatedRoute,
	private router :Router
) { }


ngOnInit() {

	$(document).ready(function(){

		$('.modal').modal();
		$(".button-collapse").sideNav();


		$(".main-content").height(window.innerHeight - parseInt($(".main-nav").css('height'),10));
		$(".main-content").css({marginBottom: "0px"});
		$(".message-thread").height(parseInt($(".main-content").css('height'),10) - parseInt($(".chat-title").css('height'),10) - parseInt($(".chat-footer").css('height'),10));
		$(".message-thread").css({overflow: "hidden",margin: "0", overflowY: "scroll"});
		$('.message-thread').css('background-image', 'url("")');
		$(".message-thread").addClass("scroll1");
		});

	this.userId = this.route.snapshot.params['userid'];




	if(this.userId === '' || typeof this.userId == 'undefined') {
		this.router.navigate(['/']);
	}

	else{

				this.chatService.getprofile(this.userId,( error, response )=>{

					if(error) {
						console.log(error);
						this.router.navigate(['/']); /* Home page redirection */
					}
					else
					{
						console.log("*************");
						console.log(JSON.stringify(response));
						console.log("**************");
						this.profile_img = response.imgurl;
					}
				});

				this.chatService.userSessionCheck(this.userId,( error, response )=>{

					if(error) {
						this.router.navigate(['/']);
					}else{


								this.username = response.username;
								this.selectedEmail = response.email;
								console.log(this.selectedEmail);
								this.status = response.status;
								console.log(this.status);
							this.overlayDisplay = true;



									this.socketService.connectSocket(this.userId);



							this.socketService.getChatList(this.userId).subscribe(response => {

								if(!response.error) {

									if(response.singleUser) {

										/*
										* Removing duplicate user from chat list array.
										*/
										if(this.chatListUsers.length > 0) {
											this.chatListUsers = this.chatListUsers.filter(function( obj ) {
												return obj._id !== response.chatList._id;
											});
										}


										this.chatListUsers.push(response.chatList);

									}else if(response.userDisconnected){
										this.chatListUsers = this.chatListUsers.filter(function( obj ) {
											return obj.socketId !== response.socketId;
										});
									}else{

										this.chatListUsers = response.chatList;
										console.log("IIIIIIIIIIIIIIIIIIIIIIIII");
										console.log("chatlist: "+JSON.stringify(this.chatListUsers));
									}

									//track list of all users


										console.log("ALL users...: "+JSON.stringify(this.allUsers));

								}else{
									alert('Chat list failure.');
								}
						});




						this.socketService.getGroupsList(this.userId).subscribe(response=>{



						if(!response.error){

							if(response.groupList!=null){
							for (var i = 0; i < response.groupList.length ; i++) {



								this.groupsList.push({
									'groupName': response.groupList[i]
								});
							}
						}


						}
						else{
							alert('Group list update failure.');
						}

						});




						this.socketService.getOfflineChatList(this.userId).subscribe(response => {

						if(!response.error) {

							if(response.singleUser) {

								if(this.chatOfflineUsers.length > 0) {
									this.chatOfflineUsers = this.chatOfflineUsers.filter(function( obj ) {
										return obj._id !== response.chatList._id;
									});
								}


								this.chatOfflineUsers.push(response.chatList);

							}else if(response.userDisconnected){
								this.chatOfflineUsers = this.chatOfflineUsers.filter(function( obj ) {
									return obj.socketId !== response.socketId;
								});
							}else{

								this.chatOfflineUsers = response.chatList;
							}

							this.chatListUsers.forEach(element => {
								this.allUsers.push(element);
								});
							this.chatOfflineUsers.forEach(element => {
									this.allUsers.push(element);
							});

						}else{
							alert('Chat list failure.');
						}
				});



							this.socketService.receiveMessages().subscribe(response => {
							if(this.selectedUserId && this.selectedUserId == response.fromUserId) {
								this.messages.push(response);
								setTimeout( () =>{
										document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
								},100);
							}
						});

						this.socketService.receiveGroupMessages().subscribe(response => {

							if(this.selectedGroupName && this.selectedGroupName == response.groupName) {
								this.messages.push(response);
								setTimeout( () =>{
										document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
								},100);
							}
						});
					}
				});
		}


}

		logout(){
			this.socketService.logout({userId : this.userId}).subscribe(response => {
				this.router.navigate(['/']);
			});
		}

		selectedUser(user):void{

			this.selectedGroupName= null;

			this.selectedUserId = user._id;
			this.selectedSocketId = user.socketId;
			this.selectedUserName = user.username;

this.chatService.getMessages({ userId : this.userId,toUserId :user._id} , ( error , response)=>{


				if(!response.error) {

					this.messages = response.message;
				}
				else{
					alert("Error getting messages");
				}
			});
		}

		isUserSelected(userId:string):boolean{

			if(!this.selectedUserId){
				return false;
			}
			return this.selectedUserId === userId ? true : false;
		}

		selectedGroup(group):void{

			this.selectedUserName=null;
			this.selectedUserId=null;

			console.log("Selected group: "+JSON.stringify(group));
			this.selectedGroupName = group.groupName;


			this.chatService.getGroupMessages({groupName:group.groupName} , ( error , response)=>{
				console.log("Selected group response: "+JSON.stringify(response));

				if(!response.error) {
					this.messages = response.message;
				}
			});
		}

		isGroupSelected(groupName:string):boolean{
			if(!this.selectedGroupName) {
				return false;
			}

			return this.selectedGroupName === groupName ? true : false;
		}

		alignMessage(userId){
			return this.userId === userId ? false : true;
		}

		userToggle(){
			this.selectedUsersList = !this.selectedUsersList;
		}
		sendMessage(event){
			if(event.keyCode === 13) {
				console.log("Selected userid: "+this.selectedUserId);
				console.log("Selected groupname: "+this.selectedGroupName);

				if(this.message === '' || this.message === null) {
					alert(`Message can't be empty.`);
				}else{

					if (this.message === '') {
						alert(`Message can't be empty.`);
					}else if(this.userId === ''){
						this.router.navigate(['/']);
					}else if((this.selectedUserId === ''||this.selectedUserId==null)&&(this.selectedGroupName === ''||this.selectedGroupName==null)){
						alert(`Select a user or group to chat.`);
					}else{

						//  Chatting with user
						if(this.selectedUserId!=null)
						{
						const data = {
							fromUserId : this.userId,
							message : (this.message).trim(),
							toUserId : this.selectedUserId,
							toSocketId : this.selectedSocketId,
							fromSocketId : this.socketId
						}

						console.log("Message: selected userId "+this.selectedUserId);
						console.log("Message when user s selected "+data.message);

						this.messages.push(data);
						setTimeout( () =>{
								document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
						},100);


						this.message = null;
						this.socketService.sendMessage(data);
						}
						else if(this.selectedGroupName!=null){

							console.log("Chatting in group: selectedgroupname");

							const data = {
								groupName : this.selectedGroupName,
								message : (this.message).trim(),
								fromUserId : this.userId,
								fromUser:this.username
							}



							this.messages.push(data);
							setTimeout( () =>{
								document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
						},100);

						this.message = null;
						this.socketService.sendGroupMessage(data);




						}else{
							alert("ERROR!!");
						}

					}
				}
			}
		}

	changePassword(status:string){
		this.status=status;

		 this.chatService.changePassword(
			 {   "password":this.status,
				  "userId":this.userId
			 },
			 (error,response)=>
			 {
				if(!response.error){
					alert("Password updated Successfully");
				}else{
					alert("ERROR updating password");
				}
			 });
}

		addGroup(newGroup:string){

			console.log("New group name: "+newGroup);

				if (newGroup ===null||newGroup ===''||newGroup===undefined) {

					alert("Please enter group name");

				}
				else
				{

					this.groupName=newGroup;

					this.chatService.registerGroup(
						{ 'username':this.username,
							'userId':this.userId,
							'groupName':newGroup
						},
						(error,response)=>
						{

							console.log("Addgroup response: "+JSON.stringify(response));
							if(!response.error){

							this.messages.push({message:'Successfully created group '+newGroup});
							this.groupsList.push({
								'groupName':newGroup,
								'message':'Successfully created group '+newGroup
								});
							}else{
								alert("ERROR registering group");
							}

						});


				}

	}

	updateStatus(status:string){

				this.status=status;

				this.chatService.updateStatus(
					{   "status":this.status,
							"userId":this.userId
					},
					(error,response)=>
					{
						if(!response.error){
							alert("Status updated Successfully");
						}else{
							alert("ERROR updating status");
						}
					});
}


	populateMembers(groupNameToPopulate){
		this.chatService.fetchMembers(
			{
					"groupName":groupNameToPopulate,
			},
			(error,response)=>
			{

				console.log("Response on fecth: "+JSON.stringify(response));
				if(!response.error){

				console.log("Members: "+JSON.stringify(response.message[0]));
				let j=0;

				this.newUserstoGroup.length=0;



				if(response.message[0]!=null)
				{
					for(j=0;j<response.message[0].userIdArray.length;j++)
				{
					let value={
						"username":response.message[0].userIdArray[j].username,
						"userId":response.message[0].userIdArray[j].userId
					}

					this.newUserstoGroup.push(value);

				}



				}

				}else{
					console.log("ERROR populating members");
				}
			});
	}

	populateNonMembers(groupName){



		this.exsistingUsers.length=0;


		this.chatService.fetchMembers(
			{
					"groupName":groupName,
			},
			(error,response)=>
			{


				if(!response.error){


				let j=0;

				let exsistingmembers=[];


				if(response.message[0]!=null)
				{
					for(j=0;j<response.message[0].userIdArray.length;j++)
				{

					if(exsistingmembers.indexOf(response.message[0].userIdArray[j].username)<0)
						exsistingmembers.push(response.message[0].userIdArray[j].username);

				}

				console.log("Exsisting users: "+exsistingmembers);


				}


				if(this.allUsers!=null)
				{


					console.log("All users: "+JSON.stringify(this.allUsers));
					let j=0;
					for(j=0;j<this.allUsers.length;j++){

						let check = {
							"username":this.allUsers[j].username,
							"userId":this.allUsers[j]._id
						}

						let notMember=false;


						if(exsistingmembers.indexOf(this.allUsers[j].username)<0){
							console.log("Not a member: "+check.username);
							notMember=true;
						}

							if(this.exsistingUsers.length==0 && notMember){
							console.log("adding..: "+check.username);

								this.exsistingUsers.push(check);

							}else{

								if(notMember){
									let k=0;
									let alreaypresent=false;
									for(k=0;k<this.exsistingUsers.length;k++)
									{
										console.log("In loop with: "+this.exsistingUsers[k].username+" "+this.allUsers[j].username);
										console.log("In loop with: "+this.exsistingUsers[k].userId+" "+this.allUsers[j]._id);

											if(this.exsistingUsers[k].username==this.allUsers[j].username && this.exsistingUsers[k].userId==this.allUsers[j]._id ){
											console.log("Not a member: but already added: "+check.username);

											alreaypresent=true;
											}
									}

									if(!alreaypresent){
										console.log("Not a member: also not  added: adding "+check.username);

										this.exsistingUsers.push(check);

									}

								}

							}


					}
				}

				}else{
					console.log("ERROR populating members");
				}
			});

		}




	AddUser(username, userId){
		console.log("Trying to add: "+username);
		let i;
		let obj = {
			"username" : username,
			"userId" : userId,
		};
		let bool=false;

		if(this.selectedUserstoAdd!=null &&this.selectedUserstoAdd.length!=0 )
		{
			for (i = 0; i < this.selectedUserstoAdd.length; i++) {

				console.log("this.selectedUserstoAdd[i]: "+JSON.stringify(this.selectedUserstoAdd[i]));
			if(_.isEqual(obj,this.selectedUserstoAdd[i]))
				{
				console.log("Already exsists!!");
				this.selectedUserstoAdd.splice(i, 1);
				bool=true;
				}
		}
	}

		if(!bool)
		{
		console.log("does not  exsist!");
		this.selectedUserstoAdd.push(obj);
		}
	}

	AddUsers(){



		if(_.isEmpty(this.selectedUserstoAdd)||this.selectedUserstoAdd==null||this.selectedUserstoAdd==undefined){

			alert("Please select users to Add.");

		}else{

			console.log("IS not empty!");
		this.selectedUserstoAdd.forEach(element => {
			console.log(element.username+ " was added to "+this.selectedGroupName);

			//registering user to grouparray
				this.chatService.registerGroup(
				{
					"username":element.username,
					"userId":element.userId,
					"groupName" :this.selectedGroupName
				},
				(error,response)=>
				{
					if(!response.error){
					console.log("Added users successfully");
					}else{
						alert("ERROR adding user to group");
					}
				});

			});

				this.chatService.addGroupUsers(
					{
						"userarray":this.selectedUserstoAdd,
						"groupName" :this.selectedGroupName
					},
					(error,response)=>
					{
						if(!response.error){
						console.log("group users updated");
						}else{
							alert("ERROR updating userlist for group");
						}
					});

				}

	}


	DeleteUser(username, userId){
		console.log("userid in del user: "+userId);

		let i;
		let obj={
			"username" : username,
			"userId" : userId,
		};
		let bool=false;

		if(this.selectedUserstoDelete!=null &&this.selectedUserstoDelete.length!=0 ){

		for (i = 0; i < this.selectedUserstoDelete.length; i++) {

			if(_.isEqual(obj,this.selectedUserstoDelete[i]))
			{
				this.selectedUserstoDelete.splice(i, 1);
				bool=true;
			}
		}
	}
		if(!bool)
		this.selectedUserstoDelete.push(obj);
	}



	DeleteUsers(){
		this.selectedUserstoDelete.forEach(element => {

			console.log(element.username+ " was removed with id "+element.userId);

			this.chatService.deregisterGroup(
				{
					"username":element.username,
					"userId":element.userId,
					"groupName" :this.selectedGroupName
				},
				(error,response)=>
				{
					if(!response.error){
					console.log("Deleted users successfully");
					}else{
						alert("ERROR deleting user to group");
					}
				});

				this.chatService.deregisterUsers(
					{
						"username":element.username,
						"userId":element.userId,
						"groupName" :this.selectedGroupName
					},
					(error,response)=>
					{
						if(!response.error){
						console.log("removed user from group listsuccessfully");
						}else{
							alert("ERROR removeing user from group lists");
						}
					});



		});
	}

	Settings(){

	}
	fileEvent(fileInput:any){

					let file = fileInput.target.files[0];
					console.log(file);
					var AWSService = (<any>window).AWS;
					AWSService.config.accessKeyId ='Your AWS Access Key';
					AWSService.config.secretAccessKey ='Your AWS Secret Key';
					var bucketName= "profilepic"+ this.userId;
					var bucket = new AWSService.S3({params: {Bucket: bucketName}});
					var fileName = "profilepic"+this.userId;
					var baseUrl="";
					var usrImgId = this.userId;
					let that = this;
					console.log("ooooooooooooooooooo");
					console.log(usrImgId);
					var params = {Key: fileName,  ACL: 'public-read', Body: file};
					bucket.upload(params, function (err, data) {
						if(err){
							baseUrl = "error";
							alert('Failed to upload picture');
							console.log(err);
						}
						else
						{
							console.log(data);
							baseUrl = data.Location;
							baseUrl = 'https://' + bucketName + '.s3.amazonaws.com/'+fileName;
							console.log("New URL");
							console.log(baseUrl);
							that.profile_img = baseUrl;
							console.log(this.profile_img +"--->"+usrImgId);
							that.chatService.updatePic(
								{
									"url": baseUrl,
									"userId": that.userId
								},
								(error,response)=>
								{
									console.log(error);
									if(!response.error){
										alert("Picture updated Successfully");
									}else{
										alert("ERROR updating picture");
										console.log(error);
									}
								});
						}
					});

				}

}
