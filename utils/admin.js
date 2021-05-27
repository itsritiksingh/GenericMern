const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require('@admin-bro/mongoose');
const uploadFeature = require('@admin-bro/upload');
const { BaseProvider } = require('@admin-bro/upload');

AdminBro.registerAdapter(AdminBroMongoose)
//custom BaseProvider
class MyProvider extends BaseProvider {
    constructor(bucketname) {
      super(bucketname)
    }
  
    async upload(file, key) {
      fs.mkdirSync("./views/" + key.split("/")[0], { recursive: true });
      fs.copyFileSync(file.path, "./views/" + key);
      return true
    }
    async delete(key) {
      fs.unlinkSync(__dirname + "/views/" + key);
      return true;
    }
    async path(key) {
      return "/" + key;
    }
  }
  
  const adminBro = new AdminBro({
  //   resources: [
  //     {
  //       resource: userModel
  //     },
  //     {
  //       resource: topicModal,
  //     },
  //     {
  //       resource: questionModel,
  //       options: { properties: { questionImageLink: { isVisible: false }, answerImageLink: { isVisible: false } } },
  //       features: [
  //         uploadFeature({
  //           provider: new MyProvider(),
  //           properties: {
  //             key: 'questionImageLink',// attribute of model where key has to stored
  //             file: 'question image link',
  //             filePath: 'randon string 1',
  //             filesToDelete: 'random string 2',
  //           },
  //         }),
  //         uploadFeature({
  //           provider: new MyProvider(),
  //           properties: {
  //             key: 'answerImageLink',
  //             file: 'answer image link',
  //             filePath: 'answer image',
  //             filesToDelete: 'answerImage lInk toDelete',
  //           },
  //         }),
  //       ],
  //     },
  //     {
  //       resource: reportModel
  //     },
  //   ],
    // rootPath: "/admin"
  });
  
  exports.adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      // const user = await User.findOne({ email })
      // if (user) {
      //   const matched = await bcrypt.compare(password, user.encryptedPassword)
      //   if (matched) {
      //     return user
      //   }
      // }

      return {email: "ritik"}
    },
    cookiePassword: 'a1d03a14203ebf4c967c6f3173f4a21b46fb678a948abaf2d945efb51e09',
  })