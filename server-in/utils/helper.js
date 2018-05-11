
'use strict';

/*
*connect to the DB
*/

class Helper{

   constructor(){
       this.Mongodb = require("./db");
       var ObjectId = require('mongodb').ObjectID;
   }

   //проверка доступности имени пользователя
   userNameCheck(data,callback){
       this.Mongodb.onConnect( (db,ObjectID) => {
           console.log("usernamecheck: "+JSON.stringify(data));
           db.collection('users').find(data).count( (err, result) => {
               db.close();
               callback(result);
           });
       });
   }

   //смена пароля
   changePassword(userId, password, callback){
      this.Mongodb.onConnect( (db,ObjectID) => {
      db.collection('users').update( { _id : ObjectID(userId)} ,{$set: {'password':password} } ,(err, result) => {
            db.close();
            callback(err,result);
            });
      });
   }

   //изменение фото профиля
   updateprofilepic(userId, url, callback){
      this.Mongodb.onConnect( (db,ObjectID) => {
      db.collection('users').update( { _id : ObjectID(userId)} ,{$set: {'img':url} } ,(err, result) => {
            db.close();
            callback(err,result);
        });
      });
   }

   //логин: проверка на наличие прав в БД, обновление "online":"Y"
   login(data,callback){
       this.Mongodb.onConnect( (db,ObjectID) => {
           db.collection('users').findAndModify( data ,[], {$set: {'online': 'Y'}},{},(err, result) => {
               db.close();
               callback(err,result.value);
           });
       });
   }

   //регистрация нового пользователя
   registerUser(data, callback){

       this.Mongodb.onConnect( (db,ObjectID) => {

           db.collection('users').insertOne(data, (err, result) =>{
               db.close();
               console.log("regnuser");
               console.log(JSON.stringify(result));
               callback(err,result);
           });
       });
   }

   //проверка, есть ли юзер в группе чата или нет
   groupUserNameCheck(data,callback){
      this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection('groups').find(data).count( (err, result) => {
            db.close();
            callback(result);
          });
      });
   }

  //проверка имени группы на совпадение
  UserIdCheckInGroup(data,callback){
    this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection('groupusers').find(data).count( (err, result) => {
            db.close();
            callback(result);
        });
    });
  }

  //получение созданных групп
  fetchGroups(data,groupName,callback){
     this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection("groups").findOneAndUpdate(data,{$pull: {groupsArray:groupName}},(err, result)=> {
            console.log(result);
            console.log("Result of fetch groups: "+JSON.stringify(result));
            db.close();
            callback(result);

          });
    });
  }

  //получение участника группы
  pullUserFromGroup(data,val,callback){
    this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection("groupusers").findOneAndUpdate(data,{$pull: {userIdArray:val}},(err, result)=> {
            db.close();
            callback(result);

          });
    });
  }

 //обновление списка групп пользователя
 updateUserGroups(findby,groupName,callback){
    this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection('groups').findAndModify(findby ,[], {$addToSet: {'groupsArray': groupName}},{upsert:true,new:true},(err, result) => {
            db.close();
            callback(err,result.value);
        });
    });
 }

 //обновление конкретной группы пользователя
 updateGroupUsersList(findby,val,callback){
    this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection('groupusers').findAndModify(findby ,[], {$push:  {'userIdArray':{$each:val} }},{upsert:true,new:true},(err, result) => {
            db.close();
            callback(err,result.value);
        });
    });
 }

  //создание группы для чата
  registerGroup(data,callback){
    console.log("username: "+data.username);
    console.log("userId: "+data.userId);
    this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection('groups').insertOne(data, (err, result) =>{
            db.close();
            callback(err,result);
        });
    });
  }

  //добавление пользователя в группу
  registerUserId(data,callback){
        console.log("groupName: "+data.groupName);
        this.Mongodb.onConnect( (db,ObjectID) => {
            db.collection('groupusers').insertOne(data, (err, result) =>{
                db.close();
                callback(err,result);
            });
        });
  }

   //проверяет состояние пользовательской сессии (онлайн/оффлайн)
   userSessionCheck(data,callback){
       this.Mongodb.onConnect( (db,ObjectID) => {
           db.collection('users').findOne( { _id : ObjectID(data.userId) , online : 'Y'}, (err, result) => {
               db.close();
               callback(err,result);
           });
       });
   }


   //получает профайлер пользователя
   getUserInfo(userId,callback){
       this.Mongodb.onConnect( (db,ObjectID) => {
           db.collection('users').findOne( { _id : ObjectID(userId)}, (err, result) => {
               db.close();
               callback(err,result);
           });
       });
   }

   //обновляет сокетАйди пользователя
   addSocketId(data,callback){
       this.Mongodb.onConnect( (db,ObjectID) => {
           db.collection('users').update( { _id : ObjectID(data.id)}, data.value ,(err, result) => {
               db.close();
               callback(err,result.result);
           });
       });
   }

   //получение листа онлайн-пользователей
   getChatList(userId, callback){
       this.Mongodb.onConnect( (db,ObjectID) => {
           db.collection('users').find({'online':'Y' , socketId : { $ne : userId }}).toArray( (err, result) => {
           db.close();
               callback(err,result);
           });
       });
   }

   //получение листа всех пользователей
   getUsers(name, callback){
    this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection('users').find({ 'username': { '$regex' : name} }).toArray( (err, result) => {
        db.close();
            callback(err,result);
        });
    });
   }

   //получение листа всех оффлайн-пользователей
   getOfflineChatList(userId, callback){
    this.Mongodb.onConnect( (db,ObjectID) => {

        db.collection('users').find({'online':'N' , socketId : { $ne : userId }}).toArray( (err, result) => {
        db.close();
            callback(err,result);
        });
    });
   }

  //получить список всех групп, в которых состоит пользователь
  getGroupsList(userId, callback){
    this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection('groups').find(userId).toArray( (err, result) => {
        db.close();
            callback(err,result);
        });
    });
  }

  //получить список участников группы
  getMembers(groupName, callback){
    this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection('groupusers').find(groupName).toArray( (err, result) => {
        db.close();
            callback(err,result);
        });
    });
  }

   //вставить сообщение к коллекцию
   insertMessages(data,callback){
       this.Mongodb.onConnect( (db,ObjectID) => {
           db.collection('messages').insertOne(data, (err, result) =>{
               db.close();
               callback(err,result);
           });
       });
   }
   getprofile(data,callback){
        this.Mongodb.onConnect( (db,ObjectID) => {
            db.collection('users').findOne( { _id : ObjectID(data.userId)}, (err, result) => {
                db.close();
                callback(err,result);
            });
        });
    }

  //добавляет сообщение в группу
  insertGroupMessages(data,callback){
      console.log("Trying to insert into groupmessages collection");
    this.Mongodb.onConnect( (db,ObjectID) => {
        db.collection('groupmessages').insertOne(data, (err, result) =>{
            db.close();
            callback(err,result);
        });
    });
  }

   //получение сообщения между двумя пользователями
   getMessages(userId, toUserId, callback){

       const data = {
           '$or' : [
               { '$and': [
                       {
                           'toUserId': userId
                       },{
                           'fromUserId': toUserId
                       }
                   ]
               },{
                   '$and': [
                       {
                           'toUserId': toUserId
                       }, {
                           'fromUserId': userId
                       }
                   ]
               },
           ]
       };
       this.Mongodb.onConnect( (db,ObjectID) => {
           db.collection('messages').find(data).sort({'timestamp':1}).toArray( (err, result) => {
           db.close();
               callback(err,result);
           });
       });
   }

   //получение сообщений между группой пользователей
   getGroupMessages(groupName, callback){
           const data = {
              'groupName':groupName
           };
           this.Mongodb.onConnect( (db,ObjectID) => {
               db.collection('groupmessages').find(data).sort({'timestamp':1}).toArray( (err, result) => {
               db.close();
                   callback(err,result);
               });
           });
    }



   //закрытие сессии
   logout(userID,isSocketId,callback){
       const data = {
             $set :{
                 online : 'N'
             }
         };
       this.Mongodb.onConnect( (db,ObjectID) => {
           let condition = {};
           if (isSocketId) {
               condition.socketId = userID;
           }else{
               condition._id = ObjectID(userID);
           }
           db.collection('users').update( condition, data ,(err, result) => {
               db.close();
               callback(err,result.result);
           });
       });
    }

  //обновить статус пользователя (текст-настроение)
  updateStatus(userId, status, callback){
    this.Mongodb.onConnect( (db,ObjectID) => {
    db.collection('users').update( { _id : ObjectID(userId)} ,{$set: {'status':status} } ,(err, result) => {
            db.close();
            callback(err,result);
        });
    });
  }

}

module.exports = new Helper();
