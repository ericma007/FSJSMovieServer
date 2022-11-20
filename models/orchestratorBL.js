const userModel = require("./userModel");
const userBL = require("./userBL");
const permissionBL = require("./permissionBL");
const detailBL = require("./detailBL");
const validationUtil = require("../utils/validationUtil");
const restDAL = require("../DALs/restDAL");

const createUser = async function (userName, subDetails, permissionsArr) {
  try {
    console.log("permissionsArr:", permissionsArr);
    let res = await userBL.isUserExist(userName);
    if (res) throw "user name already created";

    let user = await userModel({
      username: userName,
      password: undefined,
      isAdmin: false,
    }).save();
    console.log("create user:", user);
    let id = user._id.toString();
    subDetails.id = id;
    subDetails.createdDate = new Date().toLocaleDateString();
    let subPermissions = { id: id, permissions: permissionsArr };
    return Promise.all([
      id,
      detailBL.addUserDetails(subDetails),
      permissionBL.addUserPermissions(subPermissions),
    ]);
  } catch (err) {
    console.log("user creation failed");
    throw err;
  }
};

const test2 = function () {
  return Promise.all([
    res,
    new Promise((resolve) => {
      setTimeout(resolve, 1000, "foo");
    }),
  ]);
};

const updateUser = async function (
  userId,
  userName,
  userDetails,
  permissionsArr
) {
  try {
    validationUtil.validateUserInfo(
      userId,
      userName,
      userDetails,
      permissionsArr
    );

    let currentUserDB = await userModel.findById(userId).exec();
    if (!currentUserDB)
      throw `user with ID ${userID} does not exist in Mongo DB`;

    let isUserNameModified = false;
    if (userName != currentUserDB.username) {
      let res = await userBL.isUserExist(userName);
      if (res)
        throw `user name ${userName} is already assgined to another user`;
      isUserNameModified = true;
    }

    return Promise.all([currentUserDB, detailBL.getUserDetails(userId)])
      .then((arr) => {
        let origUserDB = arr[0]; //user as stored in MongoDB before update
        let origUserDetails = arr[1]; //user as stored in file users
        if (!origUserDetails)
          throw `user with ID ${userID} does not exist in User file`;
        let newUserDetails = {
          ...userDetails,
          createdDate: origUserDetails.createdDate,
          id: userId,
        };

        let newUserPermissions;
        if (origUserDB.isAdmin) {
          newUserPermissions = {
            id: userId,
            permissions: validationUtil.validPermissions,
          };
          return Promise.all([
            "new admin user name is ignored",
            detailBL.addUserDetails(newUserDetails),
            "Permissions update are ignored for Admin",
          ]);
        } else {
          newUserPermissions = { id: userId, permissions: permissionsArr };

          if (isUserNameModified) {
            updatedUserDB = Object.assign(origUserDB, { username: userName });
          }

          return Promise.all([
            isUserNameModified
              ? userBL.updateUserName(updatedUserDB)
              : "user DB unchanged",
            detailBL.addUserDetails(newUserDetails),
            permissionBL.addUserPermissions(newUserPermissions),
          ]);
        }
      })
      .catch((error) => Promise.reject(error));
  } catch (err) {
    console.log("user update failed");
    throw err;
  }
};

const deleteUser = async function (userId) {
  try {
    let user = await userBL.getUserById(userId);
    if (!user) throw `user Id ${userId} cannot be found`;
    else if (user.isAdmin)
      throw "admin user cannot be deleted through application";
    else
      return Promise.all([
        userBL.deleteUser(userId),
        permissionBL.deletePermissions(userId),
        detailBL.deleteDetails(userId),
      ]);
  } catch (err) {
    throw "delete user failed: " + err;
  }
};

const getUser = function (userName) {
  return new Promise(async (resolve, reject) => {
    try {
      let userDB = await userBL.getUser(userName);
      if (userDB) {
        userDB.password = undefined;
        let permissions, details;
        [permissions, details] = await Promise.all([
          permissionBL.getUserPermissions(userDB._id),
          detailBL.getUserDetails(userDB._id),
        ]);
        resolve({ userDB, permissions, details });
      } else reject(`no such user ${userName}`);
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
};

const getUsers = function () {
  return new Promise((resolve, reject) => {
    Promise.all([
      userBL.getUsers(),
      permissionBL.getPermissions(),
      detailBL.getDetails(),
    ])
      .then(async (res) => {
        let usersDB = res[0];
        let permissions = res[1];
        let details = res[2];

        let userArr = await Promise.all(
          usersDB.map(async (userDBItem) => {
            let user = { userDB: {}, permissions: {}, details: {} };
            user.userDB = userDBItem;
            user.userDB.password = undefined;
            try {
              [user.permissions, user.details] = await Promise.all([
                permissionBL.getUserPermissions(userDBItem._id, permissions),
                detailBL.getUserDetails(userDBItem._id, details),
              ]);
              return user;
            } catch (err) {
              throw err;
            }
          })
        );
        resolve(userArr);
      })
      .catch((err) => reject(err));
  });
};

const getSubscriberList = function () {
  return new Promise((resolve, reject) => {
   
    try {
      Promise.all([restDAL.getSubscribers(),restDAL.getSubscriptions()])
      .then((res) => {
        subscribers=res[0].data
        subscriptions=res[1].data
        subscriberSubscriptionsList=subscribers.map((sub)=>{
          sub.subscriptions=subscriptions.filter(subscription=>subscription.subscriberId===sub._id)[0]
          return sub
        })
        resolve(subscriberSubscriptionsList)
      })
      .catch(e=> {
        //console.log("Get Subscription list failed",e)
        reject("Get Subscription list failed")
      })
    }
    catch(e) {
      reject("Get Subscription list failed 2")
    }
  })
}
  
const addSubscriber = (sub) => {
  return new Promise((resolve, reject) => {
    restDAL
      .addSubscriber(sub)
      .then((res) => {
        resolve(res.status);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const deleteSubscriber = async function (subId) {
  return new Promise((resolve, reject) => {
    restDAL.deleteSubscriber(subId)
    .then((res) => {
        console.log("delete subscriber status", res.status);
        resolve(res.status);
    })
    .catch((err) => {
        console.log(err);
        reject(err);
    });
  });
  
};

const updateSubscriber = async function (sub) {

return new Promise((resolve, reject) => 
        restDAL.updateSubscriber(sub)
        .then((res) => {
        console.log("update subscriber status", res.status);
        resolve(res.status);
        })
        .catch((err) => {
            console.log(err);
          reject(err);
        }));
};





const getMovieList = function () {
  return new Promise((resolve, reject) => {
    restDAL.getMovies()
    .then((res) => {
        let movies = res.data;
        resolve(movies);
    })
    .catch((err) => {
        console.log(err);
        reject(err);
    });
  });
};



const addMovie = (movie) => {
  return new Promise((resolve, reject) => {
    restDAL
      .addMovie(movie)
      .then((res) => {
        resolve(res.status);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const addSubscription = (id,subscription) => {
  return new Promise((resolve, reject) => {
    restDAL
      .addSubscription(id,subscription)
      .then((res) => {
        resolve(res.status);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const deleteMovie = async function (movieId) {
    return new Promise((resolve, reject) => {
      restDAL.deleteMovie(movieId)
      .then((res) => {
          console.log("delete movie status", res.status);
          resolve(res.status);
      })
      .catch((err) => {
          console.log(err);
          reject(err);
      });
    });
    
};

const updateMovie = async function (movie) {
  
  return new Promise((resolve, reject) => 
          restDAL.updateMovie(movie)
          .then((res) => {
          console.log("delete movie status", res.status);
          resolve(res.status);
          })
          .catch((err) => {
              console.log(err);
            reject(err);
          }));
};


module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUser,
  getSubscriberList,
  addSubscriber,
  deleteSubscriber,
  updateSubscriber,
  getMovieList,
  addMovie,
  deleteMovie,
  updateMovie,
  addSubscription
};
