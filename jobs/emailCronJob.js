const cron = require ('node-cron');
const userModel = require ('../models/userModel');
const { sendEmail } = require ('../services/emailServices');
 
async function notificationUsers() {
  try {
    const users = await userModel.find({ isActive: false });
    console.log(users)
    for (const user of users) {
      const to = user.email;
      const subject = "Notificación de inactividad";
      const html = `<h3> Hola ${user.name}</h3>
                  <p>Hemos notado que no has iniciado sesión en estos últimos días, no dudes en contactar si quieres disfrutar de nuestros servicios.</p>
                  `;
      console.log("Email enviado a ", user.name);
      await sendEmail(to, subject, html);
    }
  } catch (error) {
    console.log("Error", error.message);
  }
}
 
cron.schedule("40 19 * * *", async () => {
  await notificationUsers();
});
 
 

